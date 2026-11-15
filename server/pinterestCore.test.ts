import test from 'node:test';
import assert from 'node:assert/strict';
import {
  cleanPinterestUrl,
  convertHlsToMp4Url,
  extractPinId,
  getHlsToMp4Candidates,
  isAllowedPinimgUrl,
  normalizeInputPinUrl,
  parsePinterestHtml,
  PinExtractionError,
  unescapePinterestHtml,
} from './pinterestCore.js';

test('normalizeInputPinUrl handles bare domains, share text, and blocks non-Pinterest hosts', () => {
  assert.equal(normalizeInputPinUrl('pin.it/1a2b3c'), 'https://pin.it/1a2b3c');
  assert.equal(
    normalizeInputPinUrl('Check this out: https://www.pinterest.com/pin/123456/sent/?invite_code=xyz'),
    'https://www.pinterest.com/pin/123456/sent/?invite_code=xyz',
  );
  assert.equal(normalizeInputPinUrl('https://uk.pinterest.com/pin/987654/'), 'https://uk.pinterest.com/pin/987654/');

  assert.throws(() => normalizeInputPinUrl(''), /Please enter/);
  assert.throws(() => normalizeInputPinUrl('https://evil.com/pinterest.com/pin/123'), /URL must be from Pinterest/);
  assert.throws(() => normalizeInputPinUrl('http://169.254.169.254/latest/meta-data/'), /URL must be from Pinterest/);
});

test('cleanPinterestUrl strips invite_code query params and validates redirected domain', () => {
  assert.equal(
    cleanPinterestUrl('https://www.pinterest.com/pin/123456/sent/?invite_code=xyz&sender=abc#top'),
    'https://www.pinterest.com/pin/123456/sent/',
  );
  assert.throws(() => cleanPinterestUrl('https://malicious.example.org/pin/123'), /blocked/i);
});

test('isAllowedPinimgUrl enforces *.pinimg.com suffix against SSRF', () => {
  assert.equal(isAllowedPinimgUrl('https://v1.pinimg.com/videos/mc/720p/a1/b2/c3.mp4'), true);
  assert.equal(isAllowedPinimgUrl('https://i.pinimg.com/originals/aa/bb/cc.jpg'), true);
  assert.equal(isAllowedPinimgUrl('https://evilpinimg.com/video.mp4'), false);
  assert.equal(isAllowedPinimgUrl('https://pinimg.com.attacker.io/video.mp4'), false);
  assert.equal(isAllowedPinimgUrl('http://localhost:3000/secret'), false);
  assert.equal(isAllowedPinimgUrl('file:///etc/passwd'), false);
});

test('unescapePinterestHtml unescapes \\u002F and \\/ cleanly', () => {
  const raw = 'https:\\u002F\\u002Fv1.pinimg.com\\/videos\\/mc\\/720p\\/sample.mp4';
  assert.equal(unescapePinterestHtml(raw), 'https://v1.pinimg.com/videos/mc/720p/sample.mp4');
});

test('Layer 1: extracts VideoObject from JSON-LD video-snippet', async () => {
  const html = `
    <html>
      <head>
        <script data-test-id="video-snippet" type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": "Minimalist Ceramic Pour Over",
            "contentUrl": "https:\\u002F\\u002Fv1.pinimg.com\\/videos\\/mc\\/720p\\/aa\\/bb\\/cc.mp4",
            "thumbnailUrl": "https://i.pinimg.com/originals/aa/bb/thumb.jpg",
            "width": 720,
            "height": 1280
          }
        </script>
      </head>
      <body></body>
    </html>
  `;

  const result = await parsePinterestHtml(html, 'https://www.pinterest.com/pin/111222/');
  assert.equal(result.type, 'video');
  assert.equal(result.layer, 'json-ld');
  assert.equal(result.title, 'Minimalist Ceramic Pour Over');
  assert.equal(result.mediaUrl, 'https://v1.pinimg.com/videos/mc/720p/aa/bb/cc.mp4');
  assert.equal(result.thumbnailUrl, 'https://i.pinimg.com/originals/aa/bb/thumb.jpg');
  assert.equal(result.resolution, '720p HD (720x1280)');
});

test('Layer 2: extracts highest-res MP4 from __PWS_DATA__ video_list targeting requested pinId', async () => {
  const pwsData = {
    props: {
      initialReduxState: {
        pins: {
          '999888': {
            id: '999888',
            title: 'Architectural Concrete Loft',
            pinner: { full_name: 'Studio Nord' },
            videos: {
              video_list: {
                V_360P: { url: 'https://v1.pinimg.com/videos/mc/360p/target.mp4', width: 360, height: 640 },
                V_720P: { url: 'https://v1.pinimg.com/videos/mc/720p/target.mp4', width: 720, height: 1280 },
                V_HLSV4: { url: 'https://v1.pinimg.com/videos/mc/hls/target.m3u8', width: 720, height: 1280 },
              },
            },
            images: {
              orig: { url: 'https://i.pinimg.com/originals/target-cover.jpg', width: 720, height: 1280 },
            },
          },
          '111000': {
            id: '111000',
            title: 'Unrelated Recommended Pin',
            videos: {
              video_list: {
                V_1080P: { url: 'https://v1.pinimg.com/videos/mc/1080p/other.mp4', width: 1080, height: 1920 },
              },
            },
          },
        },
      },
    },
  };

  const html = `<html><head><script id="__PWS_DATA__" type="application/json">${JSON.stringify(pwsData)}</script></head></html>`;
  const result = await parsePinterestHtml(html, 'https://www.pinterest.com/pin/999888/');
  assert.equal(result.type, 'video');
  assert.equal(result.layer, 'pws-data');
  assert.equal(result.title, 'Architectural Concrete Loft');
  assert.equal(result.author, 'Studio Nord');
  assert.equal(result.mediaUrl, 'https://v1.pinimg.com/videos/mc/720p/target.mp4');
});

test('Layer 2: extracts multi-slide Idea Pin from story_pin_data', async () => {
  const pwsData = {
    props: {
      initialReduxState: {
        pins: {
          '555444': {
            id: '555444',
            story_pin_data: {
              metadata: { pin_title: '3-Step Matcha Ritual' },
              pages: [
                {
                  blocks: [
                    {
                      video: {
                        video_list: {
                          V_EXP7: { url: 'https://v1.pinimg.com/videos/mc/exp7/slide1.mp4', width: 720, height: 1280 },
                        },
                      },
                    },
                  ],
                  image: {
                    images: { orig: { url: 'https://i.pinimg.com/originals/slide1-poster.jpg' } },
                  },
                },
                {
                  blocks: [
                    {
                      image: {
                        images: { orig: { url: 'https://i.pinimg.com/originals/slide2.jpg', width: 1080, height: 1920 } },
                      },
                    },
                  ],
                },
              ],
            },
          },
        },
      },
    },
  };

  const html = `<html><head><script id="__PWS_DATA__" type="application/json">${JSON.stringify(pwsData)}</script></head></html>`;
  const result = await parsePinterestHtml(html, 'https://www.pinterest.com/pin/555444/');
  assert.equal(result.pinType, 'Idea Pin');
  assert.equal(result.layer, 'pws-story-pin');
  assert.equal(result.title, '3-Step Matcha Ritual');
  assert.equal(result.slides.length, 2);
  assert.equal(result.slides[0].type, 'video');
  assert.equal(result.slides[0].mediaUrl, 'https://v1.pinimg.com/videos/mc/exp7/slide1.mp4');
  assert.equal(result.slides[1].type, 'image');
  assert.equal(result.slides[1].mediaUrl, 'https://i.pinimg.com/originals/slide2.jpg');
});

test('Layer 3: extracts and ranks direct MP4 URLs from unescaped HTML', async () => {
  const html = `
    <html>
      <head><title>Brutalist Chair Design | Pinterest</title></head>
      <body>
        <script>
          window.__BLOB__ = {
            low: "https:\\u002F\\u002Fv1.pinimg.com\\/videos\\/mc\\/360p\\/aa\\/clip.mp4",
            hd: "https:\\u002F\\u002Fv1.pinimg.com\\/videos\\/mc\\/720p\\/aa\\/clip.mp4"
          };
        </script>
      </body>
    </html>
  `;
  const result = await parsePinterestHtml(html, 'https://www.pinterest.com/pin/777111/');
  assert.equal(result.type, 'video');
  assert.equal(result.layer, 'regex-mp4');
  assert.equal(result.title, 'Brutalist Chair Design');
  assert.equal(result.mediaUrl, 'https://v1.pinimg.com/videos/mc/720p/aa/clip.mp4');
});

test('Layer 4A: converts HLS .m3u8 to 720p .mp4 and verifies via HEAD callback', async () => {
  assert.equal(
    convertHlsToMp4Url('https://v1.pinimg.com/videos/mc/hls/12/34/56/sample.m3u8'),
    'https://v1.pinimg.com/videos/mc/720p/12/34/56/sample.mp4',
  );

  const html = `
    <html>
      <head><meta property="og:title" content="HLS Sunset Timelapse" /></head>
      <body>
        <script>
          const hls = "https:\\u002F\\u002Fv1.pinimg.com\\/videos\\/mc\\/hls\\/12\\/34\\/56\\/sample.m3u8";
        </script>
      </body>
    </html>
  `;

  const checkedUrls: string[] = [];
  const result = await parsePinterestHtml(
    html,
    'https://www.pinterest.com/pin/222333/',
    async (url) => {
      checkedUrls.push(url);
      return url === 'https://v1.pinimg.com/videos/mc/720p/12/34/56/sample.mp4';
    },
  );

  assert.deepEqual(checkedUrls, ['https://v1.pinimg.com/videos/mc/720p/12/34/56/sample.mp4']);
  assert.equal(result.type, 'video');
  assert.equal(result.layer, 'hls-to-mp4');
  assert.equal(result.mediaUrl, 'https://v1.pinimg.com/videos/mc/720p/12/34/56/sample.mp4');
});

test('Layer 4B: falls back to originals or 736x image when no video is present', async () => {
  const html = `
    <html>
      <head>
        <meta property="og:title" content="Bauhaus Typography Poster" />
        <meta property="og:image" content="https://i.pinimg.com/736x/aa/bb/poster.jpg" />
      </head>
      <body>
        <img src="https://i.pinimg.com/originals/aa/bb/poster.jpg" alt="poster" />
      </body>
    </html>
  `;

  const result = await parsePinterestHtml(html, 'https://www.pinterest.com/pin/444555/');
  assert.equal(result.type, 'image');
  assert.equal(result.pinType, 'Image Pin');
  assert.equal(result.layer, 'image-fallback');
  assert.equal(result.mediaUrl, 'https://i.pinimg.com/originals/aa/bb/poster.jpg');
  assert.equal(result.resolution, 'Original HD');
});

test('extractPinId extracts numeric IDs from slugged, regional, and sent URLs', () => {
  assert.equal(extractPinId('https://www.pinterest.com/pin/368450813289448972/'), '368450813289448972');
  assert.equal(extractPinId('https://in.pinterest.com/pin/cool-diy-video--9876543210/sent/'), '9876543210');
  assert.equal(extractPinId('https://www.pinterest.com/ideas/'), null);
});

test('unescapePinterestHtml normalizes \\\\u002F, \\u002F, \\\\/, and &amp;', () => {
  const raw = 'https:\\\\u002F\\\\u002Fv.pinimg.com\\\\/videos\\/mc\\/720p\\/a.mp4?x=1&amp;y=2';
  assert.equal(unescapePinterestHtml(raw), 'https://v.pinimg.com/videos/mc/720p/a.mp4?x=1&y=2');
});

test('Step 3: parses data-relay-response JSON and v.pinimg.com/videos regex across embed/canonical sources', async () => {
  const canonicalHtml = `
    <html>
      <head><meta property="og:image" content="https://i.pinimg.com/originals/11/22/thumb.jpg" /></head>
      <body>No inline video here</body>
    </html>
  `;
  const embedHtml = `
    <html>
      <body>
        <script data-relay-response="true" type="application/json">
          {
            "pin": {
              "id": "888777666",
              "title": "Relay Response Video Pin",
              "videos": {
                "video_list": {
                  "V_480P": { "url": "https://v.pinimg.com/videos/mc/480p/aa/clip.mp4", "width": 480, "height": 854 },
                  "V_EXP7": { "url": "https://v.pinimg.com/videos/mc/expMp4/aa/clip.mp4", "width": 720, "height": 1280 }
                }
              }
            }
          }
        </script>
      </body>
    </html>
  `;

  const result = await parsePinterestHtml([canonicalHtml, embedHtml], 'https://www.pinterest.com/pin/888777666/');
  assert.equal(result.type, 'video');
  assert.equal(result.layer, 'pws-data');
  assert.equal(result.mediaUrl, 'https://v.pinimg.com/videos/mc/expMp4/aa/clip.mp4');
});

test('Step 4: falls back from /720p/ to /expMp4/ when converting HLS .m3u8', async () => {
  const candidates = getHlsToMp4Candidates('https://v1.pinimg.com/videos/iht/hls/99/88/77/clip.m3u8');
  assert.deepEqual(candidates, [
    'https://v1.pinimg.com/videos/iht/720p/99/88/77/clip.mp4',
    'https://v1.pinimg.com/videos/iht/expMp4/99/88/77/clip.mp4',
    'https://v1.pinimg.com/videos/iht/expMp4/99/88/77/clip_720w.mp4',
  ]);

  const html = `
    <html><body>
      <script type="application/json">
        {"video_list":{"V_HLSV3_MOBILE":{"url":"https://v1.pinimg.com/videos/iht/hls/99/88/77/clip.m3u8"}}}
      </script>
    </body></html>
  `;

  const checked: string[] = [];
  const result = await parsePinterestHtml(
    html,
    'https://www.pinterest.com/pin/123987/',
    async (url) => {
      checked.push(url);
      return url.includes('/expMp4/') && url.endsWith('clip.mp4');
    },
  );

  assert.equal(checked[0], 'https://v1.pinimg.com/videos/iht/720p/99/88/77/clip.mp4');
  assert.equal(result.type, 'video');
  assert.equal(result.mediaUrl, 'https://v1.pinimg.com/videos/iht/expMp4/99/88/77/clip.mp4');
});

test('Step 5: blocks false image fallback when video indicators exist and exposes debugFoundUrls', async () => {
  const html = `
    <html>
      <head>
        <meta property="og:image" content="https://i.pinimg.com/originals/aa/bb/thumb.jpg" />
      </head>
      <body>
        <img src="https://i.pinimg.com/originals/aa/bb/thumb.jpg" />
        <script>
          const stream = "https:\\u002F\\u002Fv1.pinimg.com\\/videos\\/iht\\/hls\\/ab\\/cd\\/ef\\/mystery.m3u8";
        </script>
      </body>
    </html>
  `;

  await assert.rejects(
    () => parsePinterestHtml(html, 'https://www.pinterest.com/pin/333222/', async () => false),
    (err: unknown) => {
      assert.ok(err instanceof PinExtractionError);
      assert.equal(err.code, 'VIDEO_MP4_NOT_RESOLVED');
      assert.deepEqual((err as PinExtractionError & { debugFoundUrls?: string[] }).debugFoundUrls, [
        'https://v1.pinimg.com/videos/iht/hls/ab/cd/ef/mystery.m3u8',
      ]);
      return true;
    },
  );
});


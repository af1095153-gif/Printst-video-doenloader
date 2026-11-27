import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const outputDirectory = join(process.cwd(), 'public', 'images', 'blog');
const siteName = 'KikPin';
const articles = [
  {
    slug: 'how-to-download-pinterest-videos-idea-pins-with-audio',
    coverTitle: 'Idea Pins, with their sound',
    coverSubtitle: 'A practical guide to slides, source clips, and audio.',
    motif: ['MULTI-SLIDE PIN', 'SOURCE VIDEO', 'AUDIO TRACK'],
    diagrams: [
      { title: 'An Idea Pin is a sequence, not one frame', subtitle: 'Available slides and source clips are resolved from the public Pin.', cards: ['SLIDE 01|Opening scene', 'SLIDE 02|Next clip', 'AUDIO|Source track'] },
      { title: 'Keep the available source audio', subtitle: 'Save the video file Pinterest actually makes available.', cards: ['PUBLIC PIN|Share URL', 'KIKPIN|Resolve media', 'MP4 + AUDIO|When available'] },
    ],
  },
  {
    slug: 'save-pinterest-content-offline-without-account',
    coverTitle: 'Save public Pins offline',
    coverSubtitle: 'A direct link-to-file flow—no KikPin account required.',
    motif: ['PUBLIC PIN URL', 'NO LOGIN', 'NO WATERMARK'],
    diagrams: [
      { title: 'A simple public-link workflow', subtitle: 'Use a direct Pin URL to preview source media.', cards: ['PUBLIC PIN|Copy link', 'KIKPIN|Paste & preview', 'DEVICE|Save the file'] },
      { title: 'Clear boundaries, no account', subtitle: 'Private or restricted Pins stay unavailable.', cards: ['NO LOGIN|KikPin account', 'NO MARK|Added watermark', 'PUBLIC ONLY|Creator rights apply'] },
    ],
  },
  {
    slug: 'troubleshooting-pinterest-downloads',
    coverTitle: 'Fix common download issues',
    coverSubtitle: 'Check visibility, link shape, and the browser save flow.',
    motif: ['PUBLIC PIN?', 'VALID LINK?', 'BROWSER READY?'],
    diagrams: [
      { title: 'Three checks before retrying', subtitle: 'The source Pin and the browser are the most common causes.', cards: ['01|Confirm Pin is public', '02|Check pinterest.com or pin.it', '03|Allow browser downloads'] },
      { title: 'Start from the Pin itself', subtitle: 'A direct public Pin link is more reliable than a board URL.', cards: ['PIN URL|One Pin', 'NOT BOARD|Avoid collection link', 'REFRESH|Retry browser preview'] },
    ],
  },
  {
    slug: 'pinterest-video-quality-720p-1080p-4k',
    coverTitle: 'Source quality, explained',
    coverSubtitle: '720p, 1080p, 2K, and 4K depend on the Pin.',
    motif: ['720P', '1080P HD', '2K · 4K'],
    diagrams: [
      { title: 'Resolution is a source property', subtitle: 'A downloader can preserve detail—it cannot invent missing pixels.', cards: ['720P|HD ready', '1080P|Full HD', '2K|Higher detail', '4K|When available'] },
      { title: 'Choose the highest genuine source', subtitle: 'The available options vary from Pin to Pin.', cards: ['CHECK|Detected source', 'SELECT|Highest available', 'SAVE|No artificial upscale'] },
    ],
  },
  {
    slug: 'understanding-pinterest-file-formats',
    coverTitle: 'Know the file you save',
    coverSubtitle: 'MP4, GIF, JPG, and WebP each fit different media.',
    motif: ['MP4 VIDEO', 'GIF ANIMATION', 'JPG · WEBP'],
    diagrams: [
      { title: 'Match the format to the media', subtitle: 'A Pin may be delivered in a format different from how it looks in a feed.', cards: ['MP4|Video + sound', 'GIF|Looping animation', 'JPG|Still photo', 'WEBP|Modern image'] },
      { title: 'Animated Pins can arrive as video', subtitle: 'Check the extension before choosing a player or editor.', cards: ['ANIMATED PIN|Visual preview', 'SOURCE|May be MP4', 'FILE|Use a video player'] },
    ],
  },
  {
    slug: 'save-pinterest-carousels-stories-gifs-hd',
    coverTitle: 'Carousels, stories, and GIFs',
    coverSubtitle: 'See which original files are available for each Pin.',
    motif: ['SLIDE 01', 'SLIDE 02', 'ANIMATION'],
    diagrams: [
      { title: 'A carousel contains separate slides', subtitle: 'Copy the Pin link, then review the individual source images.', cards: ['SLIDE 01|Original image', 'SLIDE 02|Next image', 'SLIDE 03|Next image'] },
      { title: 'Animation may be delivered as MP4', subtitle: 'The source format controls the downloaded file extension.', cards: ['GIF-LIKE PIN|Animated preview', 'SOURCE|GIF or MP4', 'SAVE|Original available file'] },
    ],
  },
  {
    slug: 'privacy-first-pinterest-downloader-extension',
    coverTitle: 'Review extension permissions',
    coverSubtitle: 'A privacy-first checklist for browser add-ons.',
    motif: ['ACTIVE TAB', 'SELECTED PIN', 'CLEAR PERMISSIONS'],
    diagrams: [
      { title: 'Prefer narrow browser access', subtitle: 'Review the permission list before installing any extension.', cards: ['ACTIVE TAB|Selected page only', 'PIN URL|Explicit action', 'NO BROAD ACCESS|Review scope'] },
      { title: 'A quick extension safety review', subtitle: 'Check the publisher, permissions, and privacy details.', cards: ['PUBLISHER|Verify source', 'PERMISSIONS|Understand each one', 'PRIVACY|Read the policy'] },
    ],
  },
  {
    slug: 'save-pinterest-videos-to-iphone-camera-roll-android-gallery',
    coverTitle: 'Save Pinterest videos on mobile',
    coverSubtitle: 'Move from a public Pin link to Photos or Gallery.',
    motif: ['COPY PIN LINK', 'KIKPIN.ME', 'PHOTOS · GALLERY'],
    diagrams: [
      { title: 'Three steps from Pin to your phone', subtitle: 'Copy the public link, extract available media, and save it locally.', cards: ['PINTEREST|Copy link', 'KIKPIN.ME|Paste & extract', 'PHONE|Photos or Gallery'] },
      { title: 'On iPhone: Files to Photos', subtitle: 'Safari downloads the video first; Share moves it into Photos.', cards: ['FILES|Downloads', 'SHARE|Open the action sheet', 'PHOTOS|Save Video'] },
    ],
  },
];

function escapeXml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
}

function wrapWords(text, maxLength, maxLines = 3) {
  const lines = [];
  let current = '';
  for (const word of text.split(/\s+/)) {
    if (current && `${current} ${word}`.length > maxLength) {
      lines.push(current);
      current = word;
    } else {
      current = current ? `${current} ${word}` : word;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, maxLines);
}

function renderCover(article) {
  const titleLines = wrapWords(article.coverTitle, 25, 3);
  const titleText = titleLines.map((line, index) => `<text x="66" y="${222 + index * 62}" fill="#f8f8fa" font-family="Arial, sans-serif" font-size="48" font-weight="700">${escapeXml(line)}</text>`).join('');
  const motifRows = article.motif.map((label, index) => {
    const y = 195 + index * 100;
    return `<rect x="686" y="${y}" width="430" height="72" rx="18" fill="#1b1b20" stroke="#38383f"/><circle cx="721" cy="${y + 36}" r="10" fill="#e60023"/><text x="748" y="${y + 42}" fill="#e7e7eb" font-family="Arial, sans-serif" font-size="22" font-weight="600">${escapeXml(label)}</text><path d="M1062 ${y + 36}h24m-8-8 8 8-8 8" fill="none" stroke="#ff7182" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#1b1014"/><stop offset=".55" stop-color="#0b0b0e"/><stop offset="1" stop-color="#16171c"/></linearGradient><radialGradient id="glow"><stop stop-color="#e60023" stop-opacity=".22"/><stop offset="1" stop-color="#e60023" stop-opacity="0"/></radialGradient></defs><rect width="1200" height="675" rx="36" fill="url(#bg)"/><circle cx="1030" cy="72" r="390" fill="url(#glow)"/><path d="M0 584h1200" stroke="#34343b"/><rect x="64" y="54" width="52" height="52" rx="15" fill="#e60023"/><text x="90" y="88" fill="#fff" text-anchor="middle" font-family="Arial, sans-serif" font-size="21" font-weight="800">KP</text><text x="132" y="87" fill="#f3f3f5" font-family="Arial, sans-serif" font-size="18" font-weight="700">KIKPIN · FIELD GUIDE</text><text x="64" y="158" fill="#ff7182" font-family="Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="2">SAVE PUBLIC PINTEREST MEDIA</text>${titleText}<text x="66" y="${405 + titleLines.length * 10}" fill="#a5a5af" font-family="Arial, sans-serif" font-size="19">${escapeXml(article.coverSubtitle)}</text><rect x="652" y="130" width="500" height="386" rx="28" fill="#101014" fill-opacity=".78" stroke="#3a3035"/>${motifRows}<rect x="64" y="607" width="1072" height="1" fill="#33333a"/><text x="66" y="640" fill="#898993" font-family="Arial, sans-serif" font-size="14">KIKPIN.ME</text><rect x="1037" y="602" width="98" height="34" rx="17" fill="#e60023" fill-opacity=".14" stroke="#e60023" stroke-opacity=".45"/><text x="1086" y="624" text-anchor="middle" fill="#ff7182" font-family="Arial, sans-serif" font-size="12" font-weight="700">NO WATERMARK</text></svg>`;
}

function renderDiagram(diagram, index) {
  const count = diagram.cards.length;
  const cardWidth = count === 4 ? 252 : 326;
  const gap = count === 4 ? 18 : 24;
  const startX = (1200 - (count * cardWidth + (count - 1) * gap)) / 2;
  const cards = diagram.cards.map((item, cardIndex) => {
    const [label, detail] = item.split('|');
    const x = startX + cardIndex * (cardWidth + gap);
    return `<rect x="${x}" y="318" width="${cardWidth}" height="194" rx="22" fill="#17171c" stroke="#36363d"/><rect x="${x + 22}" y="342" width="42" height="42" rx="13" fill="#e60023" fill-opacity=".18" stroke="#e60023" stroke-opacity=".45"/><text x="${x + 43}" y="369" text-anchor="middle" fill="#ff7182" font-family="Arial, sans-serif" font-size="13" font-weight="700">${String(cardIndex + 1).padStart(2, '0')}</text><text x="${x + 22}" y="425" fill="#f7f7f9" font-family="Arial, sans-serif" font-size="${count === 4 ? 17 : 20}" font-weight="700">${escapeXml(label)}</text><text x="${x + 22}" y="459" fill="#a4a4ae" font-family="Arial, sans-serif" font-size="${count === 4 ? 14 : 16}">${escapeXml(detail)}</text><path d="M${x + 22} 484h${cardWidth - 44}" stroke="#34343b"/>`;
  }).join('');
  const accent = index % 2 === 0 ? '#e60023' : '#ff7182';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#181014"/><stop offset=".5" stop-color="#0c0c10"/><stop offset="1" stop-color="#14151a"/></linearGradient></defs><rect width="1200" height="675" rx="32" fill="url(#bg)"/><rect x="46" y="42" width="46" height="46" rx="14" fill="#e60023"/><text x="69" y="72" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif" font-size="18" font-weight="800">KP</text><text x="110" y="70" fill="#dddde2" font-family="Arial, sans-serif" font-size="15" font-weight="700" letter-spacing="1.5">KIKPIN · VISUAL GUIDE</text><text x="62" y="158" fill="#f5f5f7" font-family="Arial, sans-serif" font-size="34" font-weight="700">${escapeXml(diagram.title)}</text><text x="64" y="202" fill="#a6a6b0" font-family="Arial, sans-serif" font-size="19">${escapeXml(diagram.subtitle)}</text><path d="M64 236h1072" stroke="#36363e"/><circle cx="1080" cy="68" r="30" fill="${accent}" fill-opacity=".12"/><circle cx="1080" cy="68" r="7" fill="${accent}"/>${cards}<text x="64" y="602" fill="#777781" font-family="Arial, sans-serif" font-size="14">PUBLIC PIN · ORIGINAL AVAILABLE SOURCE</text><text x="1136" y="602" text-anchor="end" fill="#ff7182" font-family="Arial, sans-serif" font-size="13" font-weight="700">KIKPIN.ME</text></svg>`;
}

mkdirSync(outputDirectory, { recursive: true });
for (const article of articles) {
  writeFileSync(join(outputDirectory, `${article.slug}.svg`), renderCover(article));
  article.diagrams.forEach((diagram, index) => {
    writeFileSync(join(outputDirectory, `inline-${article.slug}-${index + 1}.svg`), renderDiagram(diagram, index));
  });
}
console.log(`Generated ${articles.length * 3} blog SVG illustrations in ${outputDirectory}`);

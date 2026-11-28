import { ImageResizer } from '../../../src/components/creator-tools/ImageResizer';
import { ToolPageFrame } from '../../../src/components/creator-tools/ToolPageFrame';

export const metadata = {
  title: 'Pinterest Image Resizer — Free Pin Size Presets | KikPin',
  description: 'Resize and center-crop an image to Pinterest Standard, Square, Long Pin, or Story/Idea Pin dimensions. Export JPG, WebP, or PNG locally for free.',
  alternates: { canonical: 'https://kikpin.me/tools/pinterest-image-resizer' },
};

const faqs = [
  ['Which Pinterest image sizes are available?', 'Choose Standard Pin (1000 × 1500), Square Pin (1000 × 1000), Long Pin (1000 × 2100), or Story / Idea Pin (1080 × 1920).'],
  ['How does the image fit a different aspect ratio?', 'The resizer scales the image to cover the selected dimensions and crops evenly from the center so the downloaded image exactly matches the preset.'],
  ['Are images uploaded to KikPin?', 'No. The image is decoded, resized, and exported using your browser’s Canvas API. The file remains on your device.'],
];

export default function PinterestImageResizerPage() {
  return <ToolPageFrame eyebrow="Free Pinterest creator tool" title="Pinterest Image Resizer" description="Make a Pin-ready image in a few clicks. Choose an official-style Pinterest preset, select JPG, WebP, or PNG, and download the result." howTo="Drop an image into the upload area or choose a file. Pick a Pin size and output format, adjust quality for JPG or WebP if needed, then select Resize & Download." faqs={faqs}><ImageResizer /></ToolPageFrame>;
}

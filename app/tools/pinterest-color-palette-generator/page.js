import { ColorPaletteGenerator } from '../../../src/components/creator-tools/ColorPaletteGenerator';
import { ToolPageFrame } from '../../../src/components/creator-tools/ToolPageFrame';

export const metadata = {
  title: 'Pinterest Color Palette Generator — Extract Colors Free | KikPin',
  description: 'Extract five prominent colors from any Pin or photo in your browser. Copy HEX and RGB codes instantly—no upload, login, or API required.',
  alternates: { canonical: 'https://kikpin.me/tools/pinterest-color-palette-generator' },
};

const faqs = [
  ['How are the dominant colors chosen?', 'The tool samples a small browser-rendered copy of your image, groups similar pixels into color buckets, and displays the five most common groups.'],
  ['Can I copy colors in HEX and RGB?', 'Yes. Every color swatch has separate controls to copy its HEX value or RGB code.'],
  ['Does KikPin receive my image?', 'No. Color sampling is performed locally using HTML Canvas. The image is not uploaded or saved by KikPin.'],
];

export default function PinterestColorPaletteGeneratorPage() {
  return <ToolPageFrame eyebrow="Free Pinterest creator tool" title="Pinterest Color Palette Generator" description="Discover a Pin’s color story in seconds. Extract five prominent colors from a photo and copy each swatch as HEX or RGB." howTo="Drop a Pin image or photo into the upload area, or choose it from your device. The palette appears automatically; use Copy HEX or the RGB button on any swatch." faqs={faqs}><ColorPaletteGenerator /></ToolPageFrame>;
}

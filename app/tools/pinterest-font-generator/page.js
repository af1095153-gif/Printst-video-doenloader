import { FontGenerator } from '../../../src/components/creator-tools/FontGenerator';
import { ToolPageFrame } from '../../../src/components/creator-tools/ToolPageFrame';

export const metadata = {
  title: 'Pinterest Font Generator — Free Unicode Text Styles | KikPin',
  description: 'Create 18 copy-ready Unicode font styles for your Pinterest bio, username, or board name. Free, instant, and processed in your browser.',
  alternates: { canonical: 'https://kikpin.me/tools/pinterest-font-generator' },
};

const faqs = [
  ['How many styles can I generate?', 'The generator offers 18 Unicode text transformations, including bold, italic, cursive, Fraktur, double-struck, sans serif, monospace, small caps, circled, fullwidth, underlined, and struck-through styles.'],
  ['Will these fonts work everywhere on Pinterest?', 'These are Unicode characters rather than installed fonts. Most modern apps display them, but a device or font may render some characters differently.'],
  ['Is my text sent to a server?', 'No. Styling happens in your browser, and text is only copied when you choose a Copy button.'],
];

export default function PinterestFontGeneratorPage() {
  return <ToolPageFrame eyebrow="Free Pinterest creator tool" title="Pinterest Font Generator" description="Give a Pinterest bio, username, or board name a different look. Type once to preview 18 copy-and-paste Unicode styles." howTo="Type or paste your text into the box. Browse the live styles, then select Copy beside the version you want to paste into Pinterest." faqs={faqs}><FontGenerator /></ToolPageFrame>;
}

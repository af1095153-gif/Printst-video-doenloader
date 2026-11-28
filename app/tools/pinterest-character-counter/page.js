import { CharacterCounter } from '../../../src/components/creator-tools/CharacterCounter';
import { ToolPageFrame } from '../../../src/components/creator-tools/ToolPageFrame';

export const metadata = {
  title: 'Pinterest Character Counter — Pin, Bio & Board Limits | KikPin',
  description: 'Count characters and words as you draft a Pinterest Pin title, description, profile bio, or board name. See limit progress and copy text free.',
  alternates: { canonical: 'https://kikpin.me/tools/pinterest-character-counter' },
};

const faqs = [
  ['What character limits does the counter use?', 'It displays Pin Title at 100 characters, Pin Description at 500, Profile Bio at 160, and Board Name at 50.'],
  ['Does the title tool show the first 40 characters?', 'Yes. The Pin Title card includes a live preview of the first 40 characters, which are often the most visible in feeds and search.'],
  ['How are characters counted?', 'The counter counts Unicode code points so most emoji and accented characters count as one character. Spaces count as characters; words are split on whitespace.'],
];

export default function PinterestCharacterCounterPage() {
  return <ToolPageFrame eyebrow="Free Pinterest creator tool" title="Pinterest Character Counter" description="Write Pinterest-ready titles, descriptions, bios, and board names with live character counts, word counts, and visual progress against each limit." howTo="Type into any of the four fields. The character and word counts update immediately; watch the progress bar and copy your finished text with its Copy button." faqs={faqs}><CharacterCounter /></ToolPageFrame>;
}

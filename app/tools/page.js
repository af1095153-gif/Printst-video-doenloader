import { ToolsHub } from '../../src/components/creator-tools/ToolsHub';

export const metadata = {
  title: 'Free Pinterest Creator Tools | KikPin',
  description: 'Free, browser-based Pinterest creator tools from KikPin: a Unicode font generator, Pin image resizer, color palette generator, and character counter. No login or uploads.',
  alternates: { canonical: 'https://kikpin.me/tools' },
};

export default function ToolsPage() {
  return <ToolsHub />;
}

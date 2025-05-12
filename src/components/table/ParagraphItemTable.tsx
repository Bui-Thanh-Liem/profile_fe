export function ParagraphItemTable({ str }: { str: string }) {
  if (!str) return <span>-</span>;
  return <p className="line-clamp-3">{str}</p>;
}

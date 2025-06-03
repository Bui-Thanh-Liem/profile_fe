export default function HighlighText({ text }: { text: string }) {
  return (
    <span className="text-primary font-bold bg-primary text-white pulse">
      {text}
    </span>
  );
}

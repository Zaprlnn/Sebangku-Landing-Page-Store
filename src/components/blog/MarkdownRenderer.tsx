function parseInline(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
}

function toHtml(markdown: string) {
  return markdown
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      if (line.startsWith("## ")) {
        return `<h2>${parseInline(line.replace(/^##\s/, ""))}</h2>`;
      }
      if (line.startsWith("> ")) {
        return `<blockquote>${parseInline(line.replace(/^>\s/, ""))}</blockquote>`;
      }
      if (line.startsWith("- ")) {
        return `<li>${parseInline(line.replace(/^-\s/, ""))}</li>`;
      }
      return `<p>${parseInline(line)}</p>`;
    })
    .join("")
    .replace(/(<li>.*?<\/li>)+/g, (match) => `<ul>${match}</ul>`);
}

export function MarkdownRenderer({ content }: { content: string }) {
  return <article className="prose-article" dangerouslySetInnerHTML={{ __html: toHtml(content) }} />;
}

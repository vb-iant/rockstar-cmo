// app/about/page.js
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

export const metadata = {
  title: "About | Rockstar CMO",
  description: "About Rockstar CMO and host Ian Truscott.",
};

export default function AboutPage() {
  const filePath = path.join(process.cwd(), "content", "about.md");
  const markdown = fs.readFileSync(filePath, "utf-8");
  const html = marked.parse(markdown);

  return (
    <main style={{ maxWidth: "var(--page-width)", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <div
        style={{ maxWidth: "var(--prose-width)", margin: "0 auto", color: "#333" }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}

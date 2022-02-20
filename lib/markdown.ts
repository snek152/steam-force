import remarkGfm from "remark-gfm"
import { unified } from "unified"
import parse from "remark-parse"
import rehype from "remark-rehype"
import highlight from "rehype-highlight"
import stringify from "rehype-stringify"

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(parse)
    .use(rehype, { allowDangerousHtml: true })
    .use(remarkGfm)
    .use(highlight)
    .use(stringify, { allowDangerousHtml: true })
    .process(markdown)
  return result.toString()
}

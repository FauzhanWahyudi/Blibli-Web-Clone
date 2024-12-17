export default function generateExcerpt(
  content: string,
  startWord: number,
  maxWord: number,
  symbol: string,
) {
  if (!content) return "";
  content = content.split(" ").slice(startWord, maxWord).join(" ");
  return startWord === 0 ? content + symbol : symbol + content + symbol;
}

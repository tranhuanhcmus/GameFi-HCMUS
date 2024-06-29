export function shortenString(input: string) {
  if (input.length < 12) return input;
  return input.substring(0, 12) + "...";
}

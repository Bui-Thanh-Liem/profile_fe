export function setPrefixFile(
  filename: string,
  destination: string = "/uploads/"
): string {
  return `${process.env.NEXT_PUBLIC_SERVER_HOST}${destination}${filename}`;
}

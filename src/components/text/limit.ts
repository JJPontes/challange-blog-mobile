export const truncateText = (text: string, maxChars: number = 100): string => {
  if (!text || text.length <= maxChars) {
    return text;
  }
  return text.substring(0, maxChars) + '...';
};
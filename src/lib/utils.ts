/**
 * Converts a string to a URL-friendly slug
 * - Converts to lowercase
 * - Replaces spaces with dashes
 * - Removes special characters (keeps only alphanumeric and dashes)
 * - Removes multiple consecutive dashes
 * - Trims dashes from start and end
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // Replace spaces and underscores with dashes
    .replace(/[\s_]+/g, '-')
    // Remove all non-alphanumeric characters except dashes
    .replace(/[^a-z0-9-]/g, '')
    // Replace multiple consecutive dashes with a single dash
    .replace(/-+/g, '-')
    // Remove dashes from start and end
    .replace(/^-+|-+$/g, '');
}

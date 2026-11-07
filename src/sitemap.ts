import { PUBLIC_PATHS, SITE_URL } from "./content/seo";
export function generateSitemap() {
  return PUBLIC_PATHS.map((path) => SITE_URL + path);
}

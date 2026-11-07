import { renderToString } from "react-dom/server";
import Index from "../pages/Index";
import SeoPage from "../components/seo/SeoPage";
import { PUBLIC_PATHS, pageMetadata, pageSchema } from "../content/seo";
export { PUBLIC_PATHS, pageMetadata, pageSchema };
export function renderPath(path: string) {
  return renderToString(path === "/" ? <Index /> : <SeoPage path={path} />);
}

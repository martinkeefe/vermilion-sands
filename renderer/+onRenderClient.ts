import van from "vanjs-core";
import PageLayout from "./PageLayout";

export async function onRenderClient(pageContext) {
  if (!pageContext.isHydration) {
    const { Page, data } = pageContext;
    const pageHtml = (
      PageLayout(van, Page({ van, data })) as unknown as HTMLElement
    ).outerHTML;
    const root = document.getElementById("page-view");
    if (root) root.innerHTML = pageHtml;
  }
  // hydrateCounters();
}

// function hydrateCounters() {
//   document.querySelectorAll(".counter").forEach((counter) => {
//     van.hydrate(counter, (dom) =>
//       Counter({
//         van,
//         init: Number(dom.getAttribute("data-count")),
//       })
//     );
//   });
// }

import { escapeInject, dangerouslySkipEscape } from "vike/server";
import van from "mini-van-plate/van-plate";
import PageLayout from "./PageLayout";

export async function onRenderHtml(pageContext) {
  const { Page, data } = pageContext;
  const pageHtml = van.html(PageLayout(van, Page({ van, data })));
  return escapeInject`<!DOCTYPE html>
    <html>
      <body>
        <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;
}

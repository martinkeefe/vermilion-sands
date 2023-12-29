import { escapeInject, dangerouslySkipEscape } from "vike/server";
import van from "mini-van-plate/van-plate";
import PageLayout from "./PageLayout";

export async function onRenderHtml(pageContext) {
  const { Page, data } = pageContext;
  const pageHtml = van.html(PageLayout(van, Page({ van, data })));
  return escapeInject`<!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
        <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;
}

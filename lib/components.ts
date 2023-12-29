import { VanObj } from "mini-van-plate/shared";
import "./components.css";

// -----------------------------------------------------------------------------

export const MainHead = (van: VanObj, kind: string) =>
  van.tags.header(
    { class: "main-head" },
    van.tags.div({ class: "kind" }, kind),
    van.tags.div(),
    van.tags.div({ class: "brand" }, "Vermilion Sands")
  );

export const MainH1 = (van: VanObj, ...children) =>
  van.tags.h1({ class: "main-h1" }, ...children);

// export const MainImage = (van: VanObj, src: string) =>
//   van.tags.img({ class: "main-image", src });

// export const MainInfo = (van: VanObj, ...children) =>
//   van.tags.div({ class: "main-info" }, ...children);

export const MainText = (van: VanObj, ...children) =>
  van.tags.div({ class: "main-text" }, ...children);

export const MainSide = (van: VanObj, ...children) =>
  van.tags.div({ class: "main-side" }, ...children);

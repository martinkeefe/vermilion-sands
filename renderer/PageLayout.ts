import { VanObj } from "mini-van-plate/shared";
import "./PageLayout.css";

export default (van: VanObj, children: any[]) => {
  const { div } = van.tags;

  return div({ class: "wrapper" }, ...children);
};

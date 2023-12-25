import { VanObj } from "mini-van-plate/shared";
import "./PageLayout.css";

export default (van: VanObj, ...children) => {
  const { div, a } = van.tags;

  const Layout = (...children) => div({ class: "layout" }, ...children);

  const Sidebar = (...children) => div({ class: "sidebar" }, ...children);

  const Content = (...children) => div({ class: "content" }, ...children);

  const NavItem = (href: string, text: string) =>
    a({ class: "navitem", href }, text);

  return Layout(
    // Sidebar(NavItem("/", "Home"), NavItem("/about", "About")),
    Content(...children)
  );
};

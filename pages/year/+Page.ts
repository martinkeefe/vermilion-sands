import { VanObj } from "mini-van-plate/shared";
import { MainHead, MainText } from "#lib/components";
import { Year } from "#lib/types";

interface Props {
  van: VanObj;
  data: { years: Year[] };
}

// -----------------------------------------------------------------------------

export default ({ van, data: { years } }: Props) => {
  const { div, h1, p, img, span, br, ul, li, a, dl, dd, dt } = van.tags;

  return [
    MainHead(van, "Years"),

    MainText(
      van,
      ...years.map((year) =>
        div(
          a({ href: `/year/${year.id}` }, year.id),
          div({
            style: `margin: 0 4px 0 8px; display: inline-block; width: ${
              year.count * 3
            }px; height: 10px; background: #c00`,
          }),
          year.count
        )
      )
    ),
  ];
};

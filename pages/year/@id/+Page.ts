import { VanObj } from "mini-van-plate/shared";
import { Release } from "#lib/types";
import { MainH1, MainHead, MainText } from "#lib/components";
import { release_is_approved } from "#lib/functions";

interface Props {
  van: VanObj;
  data: { year: string; releases: Release[] };
}

// -----------------------------------------------------------------------------

export default ({ van, data: { year, releases } }: Props) => {
  const { div, h1, p, img, span, br, ul, li, a, dl, dd, dt } = van.tags;

  return [
    MainHead(van, "Year"),

    MainH1(van, year),

    MainText(
      van,
      div(
        ...releases
          .filter(release_is_approved)
          .map((r) => div(a({ href: `/release/${r.id}` }, r.title)))
      )
    ),
  ];
};

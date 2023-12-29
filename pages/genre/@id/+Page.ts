import { VanObj } from "mini-van-plate/shared";
import { Genre } from "#lib/types";
import { MainH1, MainHead, MainText } from "#lib/components";

interface Props {
  van: VanObj;
  data: { genre: Genre };
}

// -----------------------------------------------------------------------------

export default ({ van, data: { genre } }: Props) => {
  const { div, h1, p, img, span, br, ul, li, a, dl, dd, dt } = van.tags;

  return [
    MainHead(van, "Genre"),
    MainH1(van, genre.name),
    MainText(van, genre.desc),
  ];
};

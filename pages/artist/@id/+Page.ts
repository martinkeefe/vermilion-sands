import { VanObj } from "mini-van-plate/shared";
import { Artist } from "#lib/types";
import { MainH1, MainHead } from "#lib/components";
import { artist_name } from "#lib/functions";

interface Props {
  van: VanObj;
  data: { artist: Artist };
}

// -----------------------------------------------------------------------------

export default ({ van, data: { artist } }: Props) => {
  const { div, h1, p, img, span, br, ul, li, a, dl, dd, dt } = van.tags;

  return [MainHead(van, "Artist"), MainH1(van, artist.name)];
};

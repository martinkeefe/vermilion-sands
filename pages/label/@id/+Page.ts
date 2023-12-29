import { VanObj } from "mini-van-plate/shared";
import { Label } from "#lib/types";
import { MainH1, MainHead } from "#lib/components";

interface Props {
  van: VanObj;
  data: { label: Label };
}

// -----------------------------------------------------------------------------

export default ({ van, data: { label } }: Props) => {
  const { div, h1, p, img, span, br, ul, li, a, dl, dd, dt } = van.tags;

  return [MainHead(van, "Label"), MainH1(van, label.name)];
};

import { VanObj } from "mini-van-plate/shared";

interface Props {
  van: VanObj;
  data: {
    release: { id: string; date: string; title: string; image_ext: string };
  };
}

export default ({
  van,
  data: {
    release: { id, date, title, image_ext },
  },
}: Props) => {
  const { div, h1, p, img } = van.tags;

  return div(
    h1(title),
    p(date),
    img({
      src: `https://mjk-decades.s3.eu-west-2.amazonaws.com/image/${id}.${image_ext}`,
    })
  );
};

import { VanObj } from "mini-van-plate/shared";
import { Artist, Link, Release, ReleaseGenre } from "./types";

// -----------------------------------------------------------------------------

export const release_image_src = (release: Release): string =>
  `https://mjk-decades.s3.eu-west-2.amazonaws.com/image/${release.id}.${release.image_ext}`;

// -----------------------------------------------------------------------------

export const release_artist_names = (d: Release): string =>
  d.as_by ||
  (d.artists || [])
    .map(
      (artist, i) =>
        (d.artists.length < 2 || i == 0
          ? ""
          : i == d.artists.length - 1
          ? " & "
          : ", ") + artist_name(artist)
    )
    .join("");

export const artist_name = ({ name, family_name }: Artist): string =>
  family_name ? `${name} ${family_name}` : name;

// -----------------------------------------------------------------------------

export const release_score = (release: Release, code: string, raw = false) => {
  let score = code in release.scores ? release.scores[code] : "";
  if (!raw && code === "aoty" && score !== "-") score += "%";
  return score;
};

export const release_has_score = (release: Release, code: string): boolean =>
  code in release.scores;

// -----------------------------------------------------------------------------

export const release_is_approved = (release: { status?: string }): boolean =>
  release.status ? release.status.startsWith("A") : false;

// -----------------------------------------------------------------------------

export const TAGS: Record<string, string> = {
  Ar: "Archival",
  L: "Live",
  St: "Sountrack",
  Cp: "Compilation",
  Rm: "Remix",
  Dj: "DJmix",
  Co: "Collaboration",
  Sp: "Split",
};

export const CATS: Record<string, string> = {
  A: "Album",
  E: "EP",
  S: "Single",
};

export const release_kind = (release: Release) =>
  `${(release.tags || "")
    .trim()
    .split(" ")
    .concat([release.cat])
    .map((t) => ({ ...TAGS, ...CATS }[t]))
    .filter((t) => t)
    .join(" ")}`;

// -----------------------------------------------------------------------------

export const sep_list = <T>(sep: T, list: T[]): T[] => {
  switch (list.length) {
    case 0:
    case 1:
      return list;
    default:
      return [list[0], sep, ...sep_list(sep, list.slice(1))];
  }
};

// -----------------------------------------------------------------------------

export const genres_string = (genres: ReleaseGenre[]): string =>
  genres.length > 0
    ? genres
        .toSorted((a, b) => a.ord - b.ord)
        .map((g) => g.name)
        .join(" • ")
    : "";

export const genres_links = (van: VanObj, genres: ReleaseGenre[]) =>
  genres.length > 0
    ? sep_list(
        " • ",
        genres
          .toSorted((a, b) => a.ord - b.ord)
          .map((g) => van.tags.a({ href: `/genre/${g.id}` }, g.name))
      )
    : [];
// -----------------------------------------------------------------------------

export const link_site = (link: Link): string => {
  try {
    const host = new URL(link.url).host.split(".");
    let site = host.slice(host.length - 2).join(".");
    if (site === "co.uk") {
      site = host.slice(host.length - 3).join(".");
    }
    if (site === "youtube.com" && host[host.length - 3] === "music") {
      site = "music.youtube.com";
    }
    return site;
  } catch {
    return link.url;
  }
};

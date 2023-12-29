import { VanObj } from "mini-van-plate/shared";
// import markdownit from "markdown-it";
import { smartypantsu } from "smartypants";
import { Release } from "#lib/types";
import { MainH1, MainHead, MainSide, MainText } from "#lib/components";
import {
  artist_name,
  genres_links,
  link_site,
  release_artist_names,
  release_has_score,
  release_image_src,
  release_kind,
  release_score,
  sep_list,
} from "#lib/functions";
import "./style.css";

interface Props {
  van: VanObj;
  data: { release: Release };
}

// -----------------------------------------------------------------------------

export default ({ van, data: { release } }: Props) => {
  const { div, h1, p, img, span, br, ul, li, a, dl, dd, dt } = van.tags;
  // const md = markdownit();

  // const marked = (src: string) => {
  //   const html = md.render(src);
  //   const temp: HTMLDivElement = van.tags.div();
  //   temp.outerHTML = html;
  //   console.log(temp);
  //   return temp;
  // };

  const year = release.date.substring(0, 4);

  const artists = () =>
    release.artists.length > 0
      ? div(
          release.artists.length > 1 ? "artists: " : "artist: ",
          ...release_artists_name_links(van, release)
        )
      : null;

  const genres = () => {
    if (release.genres.length == 0) return;

    const main_genres = release.genres.filter((g) => g.ord < 100);
    const other_genres = release.genres.filter((g) => g.ord > 100);

    const label1 = main_genres.length > 1 ? "genres: " : "genre: ";

    const res = [div(label1, genres_links(van, main_genres))];

    if (other_genres.length > 0)
      res.push(
        div(
          { style: "margin-top: -0.6rem" },
          "with some: ",
          genres_links(van, other_genres)
        )
      );

    return res;
  };

  return [
    MainHead(van, release_kind(release)),

    MainH1(
      van,
      span({ class: "artist" }, release_artist_names(release)),
      ": ",
      span({ class: "title" }, release.title),
      release.which ? ` [${release.which}] ` : "",
      " (",
      a({ href: `/year/${year}` }, year),
      release.label ? ", " : "",
      release.label
        ? a({ href: `/label/${release.label.id}` }, release.label.name)
        : "",
      ")"
    ),

    MainSide(
      van,
      img({ src: release_image_src(release) }),

      artists(),
      genres(),

      div(
        "external links: ",
        sep_list(
          " • ",
          make_links(release).map(([txt, url, scr]) =>
            span(a({ href: url }, txt), scr)
          )
        )
      )
    ),

    release.text
      ? MainText(
          van,
          release.text
            .split("\n\n")
            .map((para) =>
              para.startsWith("-")
                ? p({ class: "byline" }, para.substring(2))
                : p({ class: "text" }, smartypantsu(para, 1))
            )
        )
      : "",
  ];
};

// -----------------------------------------------------------------------------

const SITE_NAMES: Record<string, string> = {
  "bandcamp.com": "Bandcamp",
  "soundcloud.com": "SoundCloud",
  "music.youtube.com": "YouTube Music",
  "spotify.com": "Spotify",
  "apple.com": "Apple",
  "deezer.com": "Deezer",
  "youtube.com": "YouTube",
  "wikipedia.org": "Wikipedia",
  "wikidata.org": "WikiData",
  "musicbrainz.org": "MusicBrainz",
  "discogs.com": "Discogs",
  "allmusic.com": "AllMusic",
  "rateyourmusic.com": "RateYourMusic",
  "albumoftheyear.org": "AlbumOfTheYear",
};

function make_links(release: Release) {
  const links = [];
  for (const site of Object.keys(SITE_NAMES)) {
    for (const link of release.links) {
      if (link_site(link) == site) {
        const lnk = [SITE_NAMES[site], link.url];
        // text += `\n${SITE_NAMES[site]}: ${link.url}`;
        if (site == "rateyourmusic.com" && release_has_score(release, "rym")) {
          lnk.push(` (${release_score(release, "rym")} / 5)`);
        } else if (
          site == "albumoftheyear.org" &&
          release_has_score(release, "aoty") &&
          release_score(release, "aoty") !== "-"
        ) {
          lnk.push(` (${release_score(release, "aoty")})`);
        } else lnk.push("");
        links.push(lnk);
        break;
      }
    }
  }
  return links;
}

// -----------------------------------------------------------------------------

const release_artists_name_links = (van: VanObj, release: Release) =>
  sep_list(
    " • ",
    (release.artists || []).map((artist) =>
      van.tags.a({ href: `/artist/${artist.id}` }, artist_name(artist))
    )
  );

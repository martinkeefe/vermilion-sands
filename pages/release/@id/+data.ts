import fetch from "node-fetch";
import type { JsonData, Release } from "#lib/types";

export async function data(pageContext) {
  // data() runs only on the server-side by default;
  // we could use SQL/ORM queries here.
  const response = await fetch(
    "https://mjk-decades.s3.eu-west-2.amazonaws.com/db.json"
  );
  const data = (await response.json()) as JsonData;
  const json = data.releases[pageContext.routeParams.id];

  const release: Release = {
    ...json,
    label:
      json.label_id in data.labels
        ? { ...data.labels[json.label_id], releases: [] }
        : null,
    artists: json.artist_ids
      .filter((id) => id in data.artists)
      .map((id) => ({
        ...data.artists[id],
        releases: [],
      })),
    genres: json.genre_id_ords
      .filter(({ id }) => id in data.genres)
      .map(({ id, ord }) => ({
        ord,
        ...data.genres[id],
        parents: [],
        sub_genres: [],
        releases: [],
      })),
  };

  return { release };
}

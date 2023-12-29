import fetch from "node-fetch";
import type { JsonData, Release } from "#lib/types";

export async function data(pageContext) {
  const response = await fetch(
    "https://mjk-decades.s3.eu-west-2.amazonaws.com/db.json"
  );
  const data = (await response.json()) as JsonData;
  const year = pageContext.routeParams.id as string;

  const releases: Release[] = Object.values(data.releases)
    .filter((json) => json.date.substring(0, 4) == pageContext.routeParams.id)
    .map((json) => ({
      ...json,
      label: { ...data.labels[json.label_id], releases: [] },
      artists: json.artist_ids.map((id) => ({
        ...data.artists[id],
        releases: [],
      })),
      genres: json.genre_id_ords.map(({ id, ord }) => ({
        ord,
        ...data.genres[id],
        parents: [],
        sub_genres: [],
        releases: [],
      })),
    }));

  return { year, releases };
}

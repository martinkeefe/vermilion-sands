import fetch from "node-fetch";
import type { JsonData, Artist } from "#lib/types";

export async function data(pageContext) {
  // data() runs only on the server-side by default;
  // we could use SQL/ORM queries here.
  const response = await fetch(
    "https://mjk-decades.s3.eu-west-2.amazonaws.com/db.json"
  );
  const data = (await response.json()) as JsonData;
  const json = data.artists[pageContext.routeParams.id];

  // console.log(json);

  const artist: Artist = {
    ...json,
    releases: [],
  };

  return { artist };
}

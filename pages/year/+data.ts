import fetch from "node-fetch";
import type { JsonData, Year } from "#lib/types";
import { release_is_approved } from "#lib/functions";

export async function data() {
  const response = await fetch(
    "https://mjk-decades.s3.eu-west-2.amazonaws.com/db.json"
  );
  const data = (await response.json()) as JsonData;

  const counts: Record<string, number> = {};

  for (const r of Object.values(data.releases).filter(release_is_approved)) {
    const year = r.date.substring(0, 4);
    if (year in counts) counts[year]++;
    else counts[year] = 1;
  }

  const years: Year[] = Object.entries(counts)
    .map(([id, count]) => ({ id, count }))
    .toSorted((a, b) => Number(a.id) - Number(b.id));

  return { years };
}

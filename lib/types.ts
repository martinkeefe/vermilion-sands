export interface Link {
  url: string;
  which: string | null;
}

export interface Release {
  id: string;
  date: string;
  title: string;
  which: string | null;
  as_by: string | null;
  label: Label | null;
  image_ext: string | null;
  cat: string;
  tags: string | null;
  text: string | null;
  status: string | null;
  no_link: string | null;
  links: Link[];
  artists: Artist[];
  genres: ReleaseGenre[];
  scores: { rym: string | null; aoty: string | null };
}

export interface Artist {
  id: string;
  name: string;
  family_name: string | null;
  which: string | null;
  links: Link[];
  releases: Release[];
}

export interface Genre {
  id: string;
  name: string;
  desc: string | null;
  tags: string | null;
  parents: Genre[];
  sub_genres: Genre[];
  links: Link[];
  releases: Release[];
}

export type ReleaseGenre = { ord: number } & Genre;

export interface Label {
  id: string;
  name: string;
  which: string | null;
  links: Link[];
  releases: Release[];
}

export interface Year {
  id: string;
  count: number;
}

// -----------------------------------------------------------------------------

export interface JsonRelease {
  id: string;
  date: string;
  title: string;
  which: string | null;
  as_by: string | null;
  label_id: string | null;
  image_ext: string | null;
  cat: string;
  tags: string | null;
  text: string | null;
  status: string | null;
  no_link: string | null;
  links: Link[];
  artist_ids: string[];
  genre_id_ords: { id: string; ord: number }[];
  scores: { rym: string | null; aoty: string | null };
}

export interface JsonArtist {
  id: string;
  name: string;
  family_name: string | null;
  which: string | null;
  links: Link[];
  release_ids: string[];
}

export interface JsonGenre {
  id: string;
  name: string;
  desc: string | null;
  tags: string | null;
  parent_ids: string[];
  child_ids: string[];
  links: Link[];
  release_ids: string[];
}

export interface JsonLabel {
  id: string;
  name: string;
  which: string | null;
  links: Link[];
  release_ids: string[];
}

export interface JsonData {
  releases: Record<string, JsonRelease>;
  artists: Record<string, JsonArtist>;
  genres: Record<string, JsonGenre>;
  labels: Record<string, JsonLabel>;
}

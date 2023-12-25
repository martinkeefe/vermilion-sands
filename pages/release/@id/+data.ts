import fetch from "node-fetch";

export async function data(pageContext) {
  // data() runs only on the server-side by default; we could use SQL/ORM queries here.
  const response = await fetch(
    "https://mjk-decades.s3.eu-west-2.amazonaws.com/db.json"
  );
  let data: any = await response.json();

  // `movies` will be serialized and passed to the browser; we select only the data we
  // need in order to minimize what is sent to the browser.
  //   data = data.map(({ title, release_date }) => ({ title, release_date }));

  return {
    // movies: data,
    release: data.releases[pageContext.routeParams.id],
  };
}

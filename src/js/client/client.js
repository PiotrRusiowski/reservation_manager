import sanityClient from "@sanity/client";
export default sanityClient({
  projectId: "jmveweac",
  dataset: "production",
  apiVersion: "2021-03-25", // use current UTC date - see "specifying API version"!
  token: process.env.TOKEN,
  // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
});

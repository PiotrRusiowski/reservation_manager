import sanityClient from "@sanity/client";

export default sanityClient({
    projectId: "jmveweac",
    dataset: "production",
    apiVersion: "2021-03-25",
    token: process.env.TOKEN,
    useCdn: true,
});

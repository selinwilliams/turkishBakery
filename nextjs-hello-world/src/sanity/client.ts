import { createClient } from "next-sanity";


export const client = createClient({
    projectId: "6z9velcz",
    dataset: "production",
    apiVersion: "v2025-07-05",
    useCdn: false,
});
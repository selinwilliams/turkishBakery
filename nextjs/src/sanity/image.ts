import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

export function urlForImage(source: any){
    return builder.image(source);
}
import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: "https://knowing-lemur-54719.upstash.io",
  token: "AdW_AAIjcDE2MjIzMzg3ZTQ3ZmI0MzczYWY2NDEzNDI5NDBkYzFmZHAxMA",
  // Turn off auto-deserialization
  automaticDeserialization: false,
});
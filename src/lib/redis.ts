import { Redis } from "@upstash/redis";

// Hardcoded Redis configuration (replace with environment variables in production)
const redisUrl = "https://knowing-lemur-54719.upstash.io"; // Replace with your Redis URL
const redisToken = "AdW_AAIjcDE2MjIzMzg3ZTQ3ZmI0MzczYWY2NDEzNDI5NDBkYzFmZHAxMA"; // Replace with your Redis token

export const redis = new Redis({
  url: redisUrl,
  token: redisToken,
});
const LOCAL_API_URL = "https://5e9d-88-202-204-152.ngrok-free.app"; // Local development
const PROD_API_URL = process.env.NEXT_PUBLIC_NODE_API_URL || "https://5e9d-88-202-204-152.ngrok-free.app"; // Set in Vercel

export const NODE_API_URL = process.env.NODE_ENV === "production" ? PROD_API_URL : LOCAL_API_URL;
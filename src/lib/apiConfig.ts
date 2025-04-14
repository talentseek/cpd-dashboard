const LOCAL_API_URL = "https://794a-2a06-61c1-2f85-0-9d08-ba58-818f-dbd.ngrok-free.app"; // Local development
const PROD_API_URL = process.env.NEXT_PUBLIC_NODE_API_URL || "https://794a-2a06-61c1-2f85-0-9d08-ba58-818f-dbd.ngrok-free.app"; // Set in Vercel

export const NODE_API_URL = process.env.NODE_ENV === "production" ? PROD_API_URL : LOCAL_API_URL;
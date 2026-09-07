import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return res.status(200).json({
    status: "ok",
    service: "LernexAI Serverless API Gateway",
    endpoints: [
      "/api/ai-tutor",
      "/api/razorpay/create-order",
      "/api/razorpay/verify-payment",
      "/api/health"
    ],
    timestamp: new Date().toISOString(),
  });
}

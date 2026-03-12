// pages/api/products.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Forward query params like ?limit=4
    const query = req.url?.split("?")[1] || "";
    const apiUrl = `https://fakestoreapi.com/products${query ? "?" + query : ""}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      const text = await response.text();
      console.error("Failed to fetch from FakeStoreAPI:", text);
      return res.status(response.status).json({ error: "Failed to fetch products" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("API route error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

// Initialize Gemini with the provided API Key
// Usually this is in process.env, but per user request, we can use it directly or via env.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export async function POST(request) {
  try {
    const { message } = await request.json();
    
    // Đọc file pets.json để lấy bối cảnh cho bot
    let petsData = [];
    try {
      const petsPath = path.join(process.cwd(), "src", "data", "pets.json");
      petsData = JSON.parse(fs.readFileSync(petsPath, "utf-8"));
    } catch (e) {
      console.log("Could not load pets.json for AI context");
    }

    const contextStr = petsData.map(p => `- ${p.name} (${p.breed}): ${p.price} VND. Mô tả: ${p.description}`).join("\n");

    const prompt = `
      Bạn là một trợ lý ảo siêu dễ thương, nhiệt tình và am hiểu về thú cưng của cửa hàng PetShop.
      Bạn trả lời ngắn gọn, thân thiện (có thể dùng emoji 🐾, ❤️). 
      Dưới đây là danh sách thú cưng đang có sẵn tại cửa hàng:
      ${contextStr}
      
      Nếu khách hỏi về thú cưng có trong danh sách, hãy tư vấn nhiệt tình. 
      Nếu khách hỏi thú cưng không có trong danh sách, hãy xin lỗi và giới thiệu các bé khác đang có.
      
      Câu hỏi của khách hàng: "${message}"
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({ reply: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { reply: "Xin lỗi, hiện tại tôi đang đi spa nên không trả lời được. Bạn vui lòng gọi hotline 1900 1234 nhé! 🐾" },
      { status: 500 }
    );
  }
}

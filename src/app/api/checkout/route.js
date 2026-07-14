import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Validate
    if (!data.name || !data.phone || !data.address || !data.cart || data.cart.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const orderPath = path.join(process.cwd(), "src", "data", "orders.json");
    
    let orders = [];
    try {
      const fileContent = fs.readFileSync(orderPath, "utf-8");
      orders = JSON.parse(fileContent);
    } catch (e) {
      // File might not exist or empty
    }

    const newOrder = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      customer: {
        name: data.name,
        phone: data.phone,
        address: data.address,
      },
      cart: data.cart,
      total: data.total
    };

    orders.push(newOrder);
    fs.writeFileSync(orderPath, JSON.stringify(orders, null, 2), "utf-8");

    return NextResponse.json({ success: true, orderId: newOrder.id });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

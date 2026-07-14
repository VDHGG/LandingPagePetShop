import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const usersFilePath = path.join(process.cwd(), "src", "data", "users.json");

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Vui lòng điền đủ thông tin" }, { status: 400 });
    }

    // Đọc data cũ
    const fileData = fs.readFileSync(usersFilePath, "utf8");
    const users = JSON.parse(fileData);

    // Kiểm tra trùng lặp email
    const isExist = users.some(u => u.email === email);
    if (isExist) {
      return NextResponse.json({ message: "Email này đã được sử dụng" }, { status: 409 });
    }

    // Tạo user mới
    const newUser = {
      id: `u${Date.now()}`,
      name,
      email,
      password,
      role: "user"
    };

    users.push(newUser);

    // Ghi lại vào file
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf8");

    const { password: _, ...userWithoutPassword } = newUser;
    return NextResponse.json({ message: "Đăng ký thành công", user: userWithoutPassword }, { status: 201 });

  } catch (error) {
    console.error("Register API Error:", error);
    return NextResponse.json({ message: "Lỗi Server Internal" }, { status: 500 });
  }
}

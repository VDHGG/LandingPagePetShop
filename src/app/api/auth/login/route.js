import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const usersFilePath = path.join(process.cwd(), "src", "data", "users.json");

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Vui lòng nhập đầy đủ thông tin" }, { status: 400 });
    }

    const fileData = fs.readFileSync(usersFilePath, "utf8");
    const users = JSON.parse(fileData);

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      // Trả về user nhưng không chứa password để bảo mật (tương đối)
      const { password: _, ...userWithoutPassword } = user;
      return NextResponse.json({ message: "Đăng nhập thành công", user: userWithoutPassword }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Email hoặc mật khẩu không chính xác" }, { status: 401 });
    }
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json({ message: "Lỗi Server Internal" }, { status: 500 });
  }
}

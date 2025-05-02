import { getUserByUsername, registerUser } from "../services/authService.js";
import bcrypt from "bcrypt"; // import bcrypt from "bcrypt"; // kalau pakai hash password
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ error: "Username tidak ditemukan" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Password salah" });
    }

    const token = jwt.sign(
      { userId: user.userId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    const { password: _, ...userWithoutPassword } = user;
    return res.json({ token, user: userWithoutPassword }); // ✅ Hanya ini yang dikirim
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Terjadi kesalahan server" });
  }
};

export const handleRegister = async (req, res) => {
  const { name, email, username, password, role } = req.body;

  try {
    // Cek apakah username sudah dipakai
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: "Username sudah digunakan" });
    }

    // Hash password (optional)
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await registerUser({
      name,
      email,
      username,
      password: hashedPassword,
      role: role || "USER",
    });

    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);

    console.log("🚀 Saving user with data:", {
      name,
      email,
      username,
      password,
      role,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Terjadi kesalahan saat register" });
  }
};

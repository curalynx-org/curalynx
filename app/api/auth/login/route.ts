import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { User } from "@/lib/models/User";

export async function POST(req: Request) {
  try {
    const { email, password, role } = await req.json();

    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "Email, password, and role are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if user exists
    let user = await User.findOne({ email, role });

    if (!user) {
      // For demo purposes, we automatically create the user if they don't exist
      user = await User.create({
        email,
        passwordHash: password, // In production, hash this using bcrypt!
        role,
        firstName: role === "provider" ? "Dr. Demo" : "Demo",
        lastName: role === "provider" ? "Doctor" : "Patient",
      });
    } else {
      // Validate password (plain text compare for prototype)
      if (user.passwordHash !== password) {
        return NextResponse.json(
          { error: "Invalid credentials." },
          { status: 401 }
        );
      }
    }

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

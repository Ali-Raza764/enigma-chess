"use server";
import dbConnect from "@/lib/dbConnet";
import User from "@/lib/models/user.model";

export const signInOauth = async (payload) => {
  const { email } = payload;
  await dbConnect();
  try {
    const user = await User.findOne({ email });
    if (user) {
      return {
        success: true,
        status: 200,
        data: user,
      };
    } else {
      const user = await User.create(payload);
      return {
        success: true,
        status: 200,
        data: user,
      };
    }
  } catch (error) {
    throw new Error("An error while signing in user");
  }
};

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { signInOauth } from "@/actions/signin/signIn.action";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  pages: {
    // signIn: "/auth/sign-in",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const { name, email, image } = user;
        const payload = {
          name,
          email,
          avatar: image,
        };

        try {
          const res = await signInOauth(payload);
          user.id = res.data._id.toString();
          user.isVerified = res.data.isVerified;
          user.image = res.data.avatar;
          user.rating = res.data.rating;
          user.puzzlesSolved = res.data.puzzlesSolved;
          user.lastPuzzleIndex = res.data.lastPuzzleIndex;
          return user;
        } catch (error) {
          console.log("some errror occured while singing in to databse");
        }
        // user.rating = "test rating";
        // user.puzzlesSolved = "1333";
      }
      // Default to allow sign-in
      return user;
    },
    async jwt({ token, user }) {
      if (user) {
        const id = user._id?.toString() || user.id;
        token.id = id;
        token.email = user.email;
        token.name = user.name;
        token.isVerified = user.isVerified;
        token.avatar = user.avatar || user.image;
        token.rating = user.rating;
        token.puzzlesSolved = user.puzzlesSolved;
        token.lastPuzzleIndex = user.lastPuzzleIndex;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.image = token.picture;
      session.user.isVerified = token.isVerified;
      session.user.rating = token.rating;
      session.user.puzzlesSolved = token.puzzlesSolved;
      session.user.lastPuzzleIndex = token.lastPuzzleIndex;
      return session;
    },
  },
});

import SignOutButton from "@/app/_components/auth/SignOutButton";
import { auth } from "@/auth";

const ProfilePage = async () => {
  const session = await auth();
  console.log(session);

  return (
    <div>
      {JSON.stringify(session)}
      <br />
      <SignOutButton />
    </div>
  );
};

export default ProfilePage;

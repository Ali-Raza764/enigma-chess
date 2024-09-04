"use client";
import { signOutAction } from "@/actions/signin/signOut";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const router = useRouter();
  const handleClick = async () => {
    await signOutAction();
    router.refresh();
  };
  return (
    <button className="p-3 rounded-md bg-red-500" onClick={handleClick}>
      Sign Out
    </button>
  );
};

export default SignOutButton;

import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import SignInForm from "./SignInForm";
import { FaChessBishop } from "react-icons/fa";

const SignInPage = async () => {
  const session = await auth();
  if (session) {
    redirect("/");
  }

  return (
    <div className="h-screen w-screen flex flex-col-reverse md:flex-row items-center justify-center pt-6 px-4 ">
      <div className="md:w-1/2 md:p-6 w-full flex flex-col items-center md:items-start justify-center text-center md:text-left mt-6 md:mt-0">
        <h2 className="text-3xl font-bold mb-4">Welcome to Enigma Chess</h2>
        <p className="mb-4 text-lg">
          Enigma Chess is the ultimate platform for mastering your chess skills.
          Whether you are a beginner or a seasoned player, we provide puzzles and
          analysis to elevate your gameplay to the next level.
        </p>
        <p className="mb-6 text-gray-400">
          Join us today and start your journey toward becoming a chess
          grandmaster.
        </p>
      </div>

    
      <div className="md:w-1/2 md:p-6 flex flex-col items-center justify-center gap-6">
        <Image
          src={"/images/banner.webp"}
          alt="Chess Banner"
          width={400}
          height={400}
          priority
          className="rounded-md hidden md:block"
        />
        <FaChessBishop size={200} className="text-primary-500 md:hidden" />
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;

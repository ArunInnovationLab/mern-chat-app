import Link from "next/link";
import React from "react";
import SignIn from "./sign-in/page";
import SignUp from "./sign-up/page";

const Entry = () => {
  return (
    // <div className="flex items-center justify-center w-screen h-screen">
    //   <Link href="/sign-in" className="underline text-blue-700">
    //     Go to sign in
    //   </Link>
    // </div>
    <div>
      <SignIn/>
    </div>
  );
};

export default Entry;

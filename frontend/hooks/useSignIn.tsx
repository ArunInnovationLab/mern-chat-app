import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const useSignIn = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const signIn = async ({ data }: { data: any }) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      if (res) {
        if (res?.error) {
          throw new Error(res.error);
        }
      }

      toast.success("Signin successful!", { id: "signin_success" });
      router.push("/dashboard");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message, { id: "signin_error" });
    } finally {
      setLoading(false);
    }
  };

  return { loading, signIn };
};

export default useSignIn;

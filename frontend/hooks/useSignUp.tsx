import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const signUp = async ({ data }: { data: any }) => {
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials in the request

        body: JSON.stringify(data),
      });

      const res = await response.json();

      if (res) {
        if (res?.error) {
          throw new Error(res.error);
        }
      }

      toast.success("Signup successful!", { id: "signup_success" });
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message, { id: "signup_error" });
    } finally {
      setLoading(false);
    }
  };

  return { loading, signUp };
};

export default useSignUp;

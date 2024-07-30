import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const logout = async () => {
    try {
      setLoading(true);
      // Send a request to the backend to log out (optional)
      const response = await fetch(`${baseUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include", // Include cookies in the request
      });

      if (!response.ok) {
        toast.error("Logout failed. Please try again.");
        return;
      }

      // Clear user session from local storage or cookies
      localStorage.removeItem("token"); // Adjust based on your storage method
      // You might also need to clear cookies if you store the session in cookies
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Notify user of successful logout
      toast.success("You have been logged out.");
      window.location.href = "/sign-in";
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;

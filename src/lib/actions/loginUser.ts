import axios from "axios";

export async function loginUser(user: { username: string; password: string }) {
  try {
    const response = await axios.post(
      "http://localhost:8000/users/api/login/",
      user,
      {
        withCredentials: true, // Include credentials in the request
      }
    );
    // console.log("Login successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

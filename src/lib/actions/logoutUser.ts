import axios from "axios";

export async function logoutUser() {
  try {
    const logout = await axios.post(
      "http://localhost:8000/users/api/logout/",
      {}
    );
    return logout;
  } catch (error) {
    console.log(error);
  }
}

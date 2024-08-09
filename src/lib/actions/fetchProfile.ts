import axios from "axios";

export async function fetchProfile(id: number) {
  try {
    const profileData = await axios.get(
      `http://localhost:8000/users/api/profile-data/${id}/`
    );

    return profileData.data;
  } catch (error) {
    console.log("An error occured:", error);
    return null;
  }
}

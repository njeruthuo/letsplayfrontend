import axios from "axios";

export async function createProfile(values) {
  try {
    const profileInfo = await axios.post(
      "http://localhost:8000/users/api/profile/",
      values
    );

    return profileInfo;
  } catch (error) {
    console.log(error);
  }
}

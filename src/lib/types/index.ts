// Define the UserProfile interface
interface UserProfile {
  id: number;
  user: number; // Assuming this is the user ID
  dob: string; // Or Date if you're handling Date objects
  location: string;
  gender: "MALE" | "FEMALE" | null;
  bio: string;
  phone: string; // Assuming phone numbers are stored as strings
}

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

// Define the UserState interface
export interface UserState {
  isAuthenticated: boolean;
  isCreateAccountLoading: boolean;
  isLoginLoading: boolean;
  loginError: boolean;
  user: User; // You can define a more specific type if needed
  user_profile: UserProfile | null; // Use null or {} if it can be empty initially
}

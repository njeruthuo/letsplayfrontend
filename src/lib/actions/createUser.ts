export async function createUserAccount(user: {
  username: string;
  email: string;
  lastname: string;
  firstname: string;
  password: string;
}) {
  console.log(user);
}
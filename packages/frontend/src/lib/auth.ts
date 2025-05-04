import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
});

export const { signIn, signOut, useSession, getSession } = authClient;
export default authClient;

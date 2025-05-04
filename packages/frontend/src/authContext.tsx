import { createContext, useContext, useState, useEffect } from "react";
import { signIn, signOut, useSession } from "./lib/auth";
import authClient from "./lib/auth";

type signIn = ReturnType<typeof signIn.social>;
type signOut = ReturnType<typeof signOut>;

type UserContext = {
  signIn: signIn;
  signOut: signOut;
};

export const AuthContext = createContext<UserContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const signIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: import.meta.env.VITE_APP_URL,
    });
  };

  const signOut = async () => await authClient.signOut();

  return (
    <AuthContext.Provider value={{ signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth)
    throw new Error("User authentication context has not been defined");
  return auth;
};

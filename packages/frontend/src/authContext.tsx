import { createContext, useContext } from "react";

type User = {
  email: string;
};

type UserContext = {
  user: User;
  signIn: () => void;
  signOut: () => void;
};

export const AuthContext = createContext<UserContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const user = {
    user: { email: "" },
    signIn: async () => {},
    signOut: async () => {},
  };

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth)
    throw new Error("User authentication context has not been defined");
  return auth;
};

import { createContext, useContext } from 'react';
import { signIn, signOut } from './lib/auth';
import authClient from './lib/auth';

type signIn = ReturnType<typeof signIn.social>;
type signOut = ReturnType<typeof signOut>;

type UserContext = {
  signIn: signIn;
  signOut: signOut;
};

export const AuthContext = createContext<UserContext | undefined>(undefined);

// TODO: Check if user completed onboarding (via firstTimeLogin or new field)
// and redirect to /dashboard instead of /gender-select if already completed
// See: packages/backend/auth-schema.ts:32 for firstTimeLogin field

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const signIn = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: `${import.meta.env.VITE_APP_URL}/gender-select`,
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
    throw new Error('User authentication context has not been defined');
  return auth;
};

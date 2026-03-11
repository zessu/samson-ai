import { ReactElement, ReactNode } from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { AuthContext } from './authContext.tsx';

type AllProvidersProps = {
  children: ReactNode;
};

const AllProviders = ({ children }: AllProvidersProps) => {
  return (
    <AuthContext.Provider
      value={{
        signIn: () => Promise.resolve(),
        signOut: () => Promise.resolve(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => rtlRender(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };

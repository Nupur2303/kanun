import React from 'react'
import { authProvider } from '../auth';
import {
    Navigate,
  } from "react-router-dom";

interface AuthContextType {
    user: any;
    signin: (user: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
  }
  

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);

  let signin = (newUser: string, callback: VoidFunction) => {
    return authProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback: VoidFunction) => {
    return authProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
    return React.useContext(AuthContext);
  }
  

export function RequireAuth({ children }: { children: JSX.Element }) {
    let auth = useAuth();
  
    if (!auth.user) {
      return <Navigate to="/login"  />;
    }
  
    return children;
  }

  
  
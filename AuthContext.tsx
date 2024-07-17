import React, { createContext, useContext, useEffect, useState } from "react";
import { auth as firebaseAuth } from "./firebase"; // Make sure this is the correct import
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  Auth,
} from "firebase/auth";

interface AuthContextType {
  user: any;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  // logout: () => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);

  // Initialize Firebase Auth
  const auth: Auth = firebaseAuth;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  const register = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  // const logout = async () => {
  //   signOut(auth);
  //   setUser(null);
  // };

  const signOut = () => {
    auth.signOut().then(() => {
      setUser(null);
    });
  };
  return (
    <AuthContext.Provider value={{ user, register, login, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

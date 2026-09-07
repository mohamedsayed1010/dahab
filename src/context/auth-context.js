import { createContext } from "react";

// The context object lives in its own (component-free) module so the provider
// file can export only a component — keeping Fast Refresh happy.
export const AuthContext = createContext();

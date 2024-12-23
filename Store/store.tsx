'use client'
import React, { createContext, useReducer } from "react";

// Define the context type
type ShortnerContextType = {
  URL:string,
   shortURL:string
  dispatch: React.Dispatch<Action>;
};

// Define the state shape
type State = {
  URL: string,
  shortURL: string
}

// Define the action types
type Action =
  | { type: "SET_URL"; payload: {URL:string, shortURL: string} }
  | { type: "RESET_URL" };

// Reducer function
const Reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_URL":
      return {URL:action.payload.URL, shortURL:action.payload.shortURL};  
    case "RESET_URL":
      return {URL:"",shortURL:""};
    default:
      throw new Error("Unknown action type");
  }
};

// Create context with an initial value of null
export const ShortnerContext = createContext<ShortnerContextType>({} as ShortnerContextType);

// ShortnerProvider component
export const ShortnerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, {URL:"http://",shortURL:""});

  return (
    <ShortnerContext.Provider value={{...state, dispatch }}> 
      {children}
    </ShortnerContext.Provider>
  );
};

import React, { useState, useContext } from "react";

const UserContext = React.createContext();
const UpdateUserContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export function useUpdateUser() {
  return useContext(UpdateUserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    isSignedIn: false,
    userId: null,
    watchlist: []
  });
  return (
    <UserContext.Provider value={user}>
      <UpdateUserContext.Provider value={setUser}>
        {children}
      </UpdateUserContext.Provider>
    </UserContext.Provider>
  );
}

import { createContext } from "react";

let AuthContext=createContext();

const AuthContextProvider=({children})=> {
    return (
        <AuthContext.Provider value={{user: null}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext,AuthContextProvider};
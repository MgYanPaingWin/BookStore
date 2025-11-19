//themecontext
import { createContext, useReducer } from "react";

const ThemeContext = createContext();

let ThemeReducer=(state,action)=>{
  console.log(state,action)
}

//themecontextprovider component
const ThemeContextProvider = ({ children }) => {

  let [state,dispatch]=useReducer(ThemeReducer,{ 
    theme : 'light'
  })

  let changeTheme=()=>{
    //action-> type + palyload -> {type,payload}
    dispatch({type : "CHANGE_THEME",payload : 'dark'})
  }

  return <ThemeContext.Provider value={{...state,changeTheme}}>
    {children}
  </ThemeContext.Provider>;
};

export {ThemeContext,ThemeContextProvider}
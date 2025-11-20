//themecontext
import { createContext, useReducer } from "react";

const ThemeContext = createContext();

let ThemeReducer=(state,action)=>{
    switch (action.type) {
      case "CHANGE_THEME":
        return {...state,theme : action.payload}  //{theme : 'dark'}
    
      default:
        return state; //{theme : 'light'}
    }  
}

//themecontextprovider component
const ThemeContextProvider = ({ children }) => {

  let [state,dispatch]=useReducer(ThemeReducer,{ 
    theme : 'light'
  })

  let changeTheme=(theme)=>{
    //action-> type + palyload -> {type,payload}
    dispatch({type : "CHANGE_THEME",payload : theme})
  }

  return <ThemeContext.Provider value={{...state,changeTheme}}>
    {children}
  </ThemeContext.Provider>;
};

export {ThemeContext,ThemeContextProvider}
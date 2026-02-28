import { createContext, useState } from "react";
export const AuthContext = createContext({
    isAuthenticated: false,
    user: {
        name: "",
        email: "",

    },

});

export const AuthWrapper = (props) => {
    const [auth, setAtuh] = useState({
        isAuthenticated: false,
        user: {
            name: "",
            email: ""
        },
    });

    return (<AuthContext.Provider value={{ auth, setAtuh }}>
        {props.children}
    </AuthContext.Provider>
    )

}
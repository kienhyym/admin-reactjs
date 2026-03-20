import { createContext, useState } from "react";
export const AuthContext = createContext({
    isAuthenticated: false,
    user: {
        name: "",
        email: "",

    },
    loading: true,
    isFullPageLoading: false

});

export const AuthWrapper = (props) => {
    const [auth, setAtuh] = useState({
        isAuthenticated: false,
        user: {
            name: "",
            email: ""
        },
        loading: true,
        isFullPageLoading: false
    });
    const [loading, setLoading] = useState(true);
    const [isFullPageLoading, setFullPageLoading] = useState(true);

    return (<AuthContext.Provider value={{ auth, setAtuh, loading, setLoading, isFullPageLoading, setFullPageLoading }}>
        {props.children}
    </AuthContext.Provider>
    )

}
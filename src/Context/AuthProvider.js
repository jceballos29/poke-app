import { createContext, useContext, useState } from "react";

const authContext = createContext();

const useProvideAuth = () => {
    const [user, setUser] = useState(null)

    const signIn = (user) => {
        setUser(user)
    }

    const signOut = () => {
        setUser(null)
    }

    return {
        user, signIn, signOut
    }
}

// const useLastPage = () => {
//     const [lastPage, setLastPage] = useState(0)

//     const getLastPage = (page) => {
//         setLastPage(page)
//     }

//     return {
//         lastPage, getLastPage
//     }
// }

export const ProvideAuth = ({children}) => {
    const auth = useProvideAuth()

    return <authContext.Provider value={auth}> {children} </authContext.Provider>
}

export const useAuth = () => useContext(authContext);
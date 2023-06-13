import React, { createContext, useContext, useState, useEffect } from 'react'
// onAuthStateChanged -> ye method tab call hoga jab bhi hamara "user" login/logout/register hoga 
// authentication se related jo bhi action hoga toh ye onAuthStateChanged method call hoga
// onAuthStateChanged do parameter leta hai => 1- auth , 2- callback fun lega
// signOut method ka use karr ke user ko signout karayegen
import { onAuthStateChanged, signOut as authSignOut } from 'firebase/auth'
import { auth } from './firebase'

// create kiye context ko
const AuthUserContext = createContext({
    authUser: null,
    isLoading: true
})


export default function UseFirebaseAuth() {
    const [authUser, setAuthUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)


    // jha user logout hoga ye clear() call kar degen bcz logout hone prr "user" ki value null ho jayegi toh "null" bhej rhe ess method se  
    const clear = () => {
        setAuthUser(null)
        setIsLoading(false)
    }


    // jab bhi user login/logout/register ho rha tab ye call back fun chalega
    // ess method ke ander hame mil jayega "user"
    // jab bhi user login kiya hai toh hme yha prr user ki "information" mil jayega
    // agar logout kiya toh user "null" ho jayega
    const authStateChanged = async (user) => {
        // jaise hi user login/logout ho loding ko kara dena hai "true"
        setIsLoading(true)

        if (!user) { // user logout hua toh null mila
            clear()
            return;
        }

        // user signup kiaa toh user ko update karana hai
        setAuthUser({
            uid: user.uid,
            email: user.email,
            username: user.displayName
        })

        setIsLoading(false)   // suru me true karaya last me false kra diaa loading ko
    }


    // signout ke liye method create kiaa
    const signOut = () => {
        // signOut ka alias authSignOut create kiaa hai import karte samay
        // signout hone prr user ki value null hogi toh clear() method call krr diaa
        authSignOut(auth).then(() => clear())
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, authStateChanged)
        return () => unsubscribe()
    }, [])


    return {
        authUser,
        isLoading,
        setAuthUser,
        signOut
    }

}


// AuthUserProvider k ander apni application ko karna hai rap toh "app.js" me ja kar "all components" ko kar degen rap
export const AuthUserProvider = ({ children }) => {

    const auth = UseFirebaseAuth();

    <AuthUserContext.Provider value={auth}>
        {children}
    </AuthUserContext.Provider>
}

// instance create kiaa then export kiaa , jisse ham easily kisi bhi file ke ander import kar ke eski value ko excess kar sake.
// esi ke ander sari value hogin , dusare component me uss value ko access esi k thr karegen
export const useAuth = () => {
    useContext(AuthUserContext)
}

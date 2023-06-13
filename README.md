### firebase todo app with react + redux
- app.js , document.js , index.js pahle se hi inbuilt file hai(component)
- login.js , register.js component ko hamne banaya hai 


### how to add firebase in our app :
#### in firsebase => product categories 
- build
   - authentication
   - firestore database 

#### steps :
- go on firebase website
- then create account
- then nav me  "go to console" 
- then create new project => "add project"
- then disable -> Enable Google Analytics for this project => then click button => "create project"

#### Get started by adding Firebase to your app
- go in web => </>
- Add Firebase to your web app :
    - register app 
         - app name => firebase-todo-app
         - [❌] Also set up Firebase Hosting for this app <= bcz next.js k project ko vercel prr deploy karna aasan h with respect to firebase
    - Add Firebase SDK 
         - use npm => npm install firebase
         - use a <script/> tag => firebase.js
         - then "continue to console"
         - then go to build => authentication
         - then go to build => Firestore database

- firebase.js
```js

// "initializeApp" nam se method milta hai "firebase" me
// "firebaseConfig" k ander jitane bhi credentials hai , ye credentials hamare firebase ko initialise karne k liye jaruri hai
import { initializeApp } from "firebase/app";

// authentication k liye firebase me "getAuth" method milta hai
// "getAuth" method authentication service enable karta hai firebase me 
import {getAuth} from 'firebase/auth'
// databse handle karne k liye firebase me "getFirestore" method milta hai
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDZSZDoQ2zCjLFfGwqEsBxnHLvMSC6fa6A",
  authDomain: "fir-todo-app-2d1af.firebaseapp.com",
  projectId: "fir-todo-app-2d1af",
  storageBucket: "fir-todo-app-2d1af.appspot.com",
  messagingSenderId: "624042332883",
  appId: "1:624042332883:web:49ec496b516d0b212dba26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// yha do chije create karegen 1- authentication , 2- db => database
// app pass krr diye
// Initialize Firebase Authentication, database and get a reference to the service
export const auth = getAuth(app)
export const db = getFirestore(app)

```

### authentication :
- get Started
- add two Providers 
    - In authentication => sign-in-method coloumn
           - login with "email/pass" => enable
           - login with "google" => enable

    - In authentication => users coloumn
            - users me aa kar apne users "add" kar sakte hai 


### register :
- first of "state" create karegen for username , email, password
- username , email, password ke field ko "<form>" tag k ander dal degen
- "<form><form/>" tag k ander => e.preventDefault() likhate hai taki "<form><form/>" tag "submit" hone k bad "re-fresh" na ho.
- aur <input/> tag me "required" likh degen
- search : "firebase documentation" => go on "build" => then "authentication"
- then "authentication" => web => get started
##### signup new user
- https://firebase.google.com/docs/auth/web/start#sign_up_new_users
```js
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

```
- register
```js
// "getAuth" method firebase.js file se mil jayega "auth" me
//  const auth = getAuth(app)
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const signUpHandler = async () => {
        // username,email,password teeno me se koi bhi field , field nhi hai toh kuch bhi nhi hona chahiye , 
        // hamara aage ka code execute hi nhi hoga
        // username,email,password teeno me se koi bhi field write nhi kiye toh aage ka code execute nhi hona chahiye
        if (!username || !email || !password) return;
        
        try {
             // createUserWithEmailAndPassword apne paramater me 1-auth, 2- email , 3- password leta hai.
             const user = await createUserWithEmailAndPassword(auth, email, password)
             console.log(user)

        } catch (error) {
            console.log("an error occured",error)
        }

    }


#note : 
- esme "user" ka nam nhi dikhaya ,"null" show kiya , toh "user" ke name k liye alag se handle karegen => with "updateProfile" nam k method se 

```
##### updateProfile in register
- updateProfile => se hamm kuchh bhi update kar sakte hai eg. email,password,username
- register me mere ko user ka nam null mila toh => user ka name update kiya wtih "updateProfile" se 
- import { createUserWithEmailAndPassword , updateProfile } from "firebase/auth";
```js
// "getAuth" method firebase se mil jayega "auth" me
// updateProfile => se hamm kuchh bhi update kar sakte hai eg. email,password,username
// register me mere ko user ka nam null mila toh => user ka name update kiya wtih "updateProfile" se 
import { createUserWithEmailAndPassword , updateProfile } from "firebase/auth";


const signUpHandler = async () => {
        // username,email,password teeno me se koi bhi field , field nhi hai toh kuch bhi nhi hona chahiye , 
        // hamara aage ka code execute hi nhi hoga

        if (!username || !email || !password) return;
        
        try {
             // createUserWithEmailAndPassword apne paramater me 1-auth, 2- email , 3- password leta hai.
             const user = await createUserWithEmailAndPassword(auth, email, password)
            
             // jaise hi hamara user register ho jayega vaise hi auth ke ander hame wo wala user mil jayega as current user
             // eske ander jo bhi information update karni hao wo de degen eg. email,pass,name
             await updateProfile(auth.currentUser,{
                // hme user ka nam update karna hai
                displayName:username
             })
             console.log(user)

        } catch (error) {
            console.log("an error occured",error)
        }

    }

```
##### register with google

- google wale "div" par onClick se signInWithGoogle method lagaye taki google se register krr paye
- eske liye ek additional provider hai => GoogleAuthProvider
     - import {  GoogleAuthProvider , signInWithPopup} from "firebase/auth";
     - eska instance create kar legen => 
            - const provider = new GoogleAuthProvider();
- basically jab bhi hamm click kare google button par "signInWithPopup" open ho , uske ander sara kam hona chahiye
- signInWithPopup hone par => sari "email" dikhayega aap chahe jisse bhi login kar lo
     - signInWithPopup ke ander do chije pas hoti hai 1- auth , 2-provider
```js
import { createUserWithEmailAndPassword , updateProfile , GoogleAuthProvider , signInWithPopup} from "firebase/auth";

const provider = new GoogleAuthProvider();


 const signInWithGoogle = async () =>{
    const user = await signInWithPopup(auth, provider)
    console.log(user)
} 

```
##### register.js
```js
import React from "react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
// authentication k liye register me "auth" import kiaa
import { auth } from "../firebase/firebase";

// "getAuth" method firebase se mil jayega "auth" me
// updateProfile => se hamm kuchh bhi update kar sakte hai eg. email,password,username
// register me mere ko user ka nam null mila toh => user ka name update kiya wtih "updateProfile" se 
// register me mere ko user ka nam null mila toh => user ka name update kiya wtih "updateProfile" se 
import { createUserWithEmailAndPassword , updateProfile , GoogleAuthProvider , signInWithPopup} from "firebase/auth";

const provider = new GoogleAuthProvider();



const RegisterForm = () => {

    // name , email , password k liye "state" create kiaa
    const [username, setUserName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const signUpHandler = async () => {
        // username,email,password teeno me se koi bhi field , field nhi hai toh kuch bhi nhi hona chahiye , 
        // hamara aage ka code execute hi nhi hoga

        if (!username || !email || !password) return;
        
        try {
             // createUserWithEmailAndPassword apne paramater me 1-auth, 2- email , 3- password leta hai.
             const user = await createUserWithEmailAndPassword(auth, email, password)
            
             // jaise hi hamara user register ho jayega vaise hi auth ke ander hame wo wala user mil jayega as current user
             await updateProfile(auth.currentUser,{
                // eske ander jo bhi information update karni hao wo de degen
                displayName:username
             })
             console.log(user)

        } catch (error) {
            console.log("an error occured",error)
        }

    }

    const signInWithGoogle = async () =>{
                const user = await signInWithPopup(auth, provider)
                console.log(user)
    } 

    return (
        <main className="flex lg:h-[100vh]">
            <div className="w-full lg:w-[60%] p-8 md:p-14 flex items-center justify-center lg:justify-start">
                <div className="p-8 w-[600px]">
                    <h1 className="text-6xl font-semibold">Sign Up</h1>
                    <p className="mt-6 ml-1">
                        Already have an account ?{" "}
                        <span className="underline hover:text-blue-400 cursor-pointer">
                            Login
                        </span>
                    </p>

                    <div className="bg-black/[0.05] text-white w-full py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90 flex justify-center items-center gap-4 cursor-pointer group"
                      onClick={signInWithGoogle}>
                        <FcGoogle size={22} />
                        <span className="font-medium text-black group-hover:text-white">
                            Login with Google
                        </span>
                    </div>


                    <form onSubmit={(e) => e.preventDefault()}>

                        <div className="mt-10 pl-1 flex flex-col">
                            <label>Name</label>
                            <input
                                type="text"
                                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                required
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>

                        <div className="mt-10 pl-1 flex flex-col">
                            <label>Email</label>
                            <input
                                type="email"
                                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>


                        <div className="mt-10 pl-1 flex flex-col">
                            <label>Password</label>
                            <input
                                type="password"
                                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>


                        <button className="bg-black text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90"
                            onClick={signUpHandler}>
                            Sign Up
                        </button>

                    </form>

                </div>
            </div>

            <div
                className="w-[40%] bg-slate-400 bg-cover bg-right-top hidden lg:block"
                style={{
                    backgroundImage: "url('/login-banner.jpg')",
                }}
            ></div>
        </main>
    );
};

export default RegisterForm;

```

### login 
```js
// authentication k liye register me "auth" import kiaa
// "getAuth" method firebase se mil jayega "auth" me
import { auth } from "../firebase/firebase";


import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();


// login button par ye method lgaya
const loginHandler = async () => {
        if (!username || !email || !password) return;
        try {
            const user = await signInWithEmailAndPassword(auth, email, password)
            console.log(user)
        } catch (error) {
            console.error("an error occured",error)
        }

}



// "google" wale button prr ye onClick se method banaya => signInWithGoogle
 const signInWithGoogle = async () =>{
        try {
            const user = await signInWithPopup(auth, provider)
            console.log(user)
        } catch (error) {
            console.error("an error occured",error)
        }
} 


```
##### login
```js

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

// authentication k liye register me "auth" import kiaa
// "getAuth" method firebase se mil jayega "auth" me
import { auth } from "../firebase/firebase";


import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();



const LoginForm = () => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)


    const loginHandler = async () => {
        if (!email || !password) return;
        try {
            const user = await signInWithEmailAndPassword(auth, email, password)
            console.log(user)
        } catch (error) {
            console.error("an error occured",error)
        }

    }


    const signInWithGoogle = async () =>{
        try {
            const user = await signInWithPopup(auth, provider)
            console.log(user)
        } catch (error) {
            console.error("an error occured",error)
        }
    } 

    return (
        <main className="flex lg:h-[100vh]">
            <div className="w-full lg:w-[60%] p-8 md:p-14 flex items-center justify-center lg:justify-start">
                <div className="p-8 w-[600px]">
                    <h1 className="text-6xl font-semibold">Login</h1>
                    <p className="mt-6 ml-1">
                        Don't have an account ?{" "}
                        <span className="underline hover:text-blue-400 cursor-pointer">
                            Sign Up
                        </span>
                    </p>


                    <div className="bg-black/[0.05] text-white w-full py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90 flex justify-center items-center gap-4 cursor-pointer group"
                      onClick={signInWithGoogle}>
                        <FcGoogle size={22} />
                        <span className="font-medium text-black group-hover:text-white">
                            Login with Google
                        </span>
                    </div>


                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mt-10 pl-1 flex flex-col">
                            <label>Email</label>
                            <input
                                type="email"
                                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mt-10 pl-1 flex flex-col">
                            <label>Password</label>
                            <input
                                type="password"
                                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>


                        <button className="bg-black text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90"
                            onClick={loginHandler}>
                            Sign in
                        </button>
                    </form>


                </div>
            </div>

            <div
                className="w-[40%] bg-slate-400 bg-cover bg-right-top hidden lg:block"
                style={{
                    backgroundImage: "url('/login-banner.jpg')",
                }}
            ></div>

        </main>
    );
};

export default LoginForm;

```

### Authorised user ka yani jo user loggedIn hai uska data throughout the application avariable karana taki usko hamm easily kisi bhi components me use kar sake - with context API

- context create kiaa 
```js

import React,{createContext,useContext} from 'react'

// create kiye context ko
const AuthUserContext = createContext()

export const AuthUserProvider = ({children}) =>{
      <AuthUserContext.Provider value={{}}>
          {children}
      </AuthUserContext.Provider>
}

// instance create kiaa then export kiaa , jisse ham easily kisi bhi file/component ke ander import kar ke eski value ko excess kar sake.
export const useAuth = () =>{
    useContext(AuthUserContext)
}

```
- authContext.js -> Context esi me banaye hai
```js
import React, { createContext, useContext, useState, useEffect } from 'react'
// onAuthStateChanged -> ye method tab call hoga jab bhi hamara "user" login/logout/register hoga 
// authentication se related jo bhi action hoga toh ye onAuthStateChanged method call hoga
// onAuthStateChanged do parameter leta hai => 1- auth , 2- callback fun lega
// signOut method ka use karr ke user ko signout karayegen
import { onAuthStateChanged, signOut as authSignOut } from 'firebase/auth'
import { auth } from './firebase'

// create kiye context ko
const AuthUserContext = createContext()


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

```

### Handle Routing : 
#### jab bhi hmm login kare direct index page prr land kare , aur chah kar bhi hamm login page ko access nhi kar payegen jsb tak "logout" na ho jaye ... and same for register page.

- login.js
```js

// eske ander sari state/value aa rhi context api ke global store se 
import { useAuth } from "@/firebase/authContext";

// router => useRouter from next , eska instance bhi create karegen => const router = useRouter()
import { useRouter } from "next/router";

import Loader from "@/components/Loader";


 // value extract kiye context api store se 
    const {authUser, isLoading} = useAuth()
    
    // instance create kiaa useRouter ka 
    const router = useRouter()


    //enn dono me se kisi ki bhi state change hoti hai toh useEffect chalega
    useEffect(()=>{
         //isLoading true nhi hai , authUser null nhi hai toh ess vase me hamara user "login" hai
         if(!isLoading && authUser){
            router.push("/")
         }
    },[authUser,isLoading])

```

```js

import React, { useState , useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

// authentication k liye register me "auth" import kiaa
// "getAuth" method firebase se mil jayega "auth" me
import { auth } from "../firebase/firebase";


import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();


// eske ander sari state/value aa rhi context api ke global store se 
import { useAuth } from "@/firebase/authContext";

// router => useRouter from next , eska instance bhi create karegen => const router = useRouter()
import { useRouter } from "next/router";

import Loader from "@/components/Loader";





const LoginForm = () => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    // value extract kiye context api store se 
    const {authUser, isLoading} = useAuth()
    
    // instance create kiaa useRouter ka 
    const router = useRouter()


    //enn dono me se kisi ki bhi state change hoti hai toh useEffect chalega
    useEffect(()=>{
         //isLoading true nhi hai , authUser null nhi hai toh ess vase me hamara user "login" hai
         if(!isLoading && authUser){
            router.push("/")
         }
    },[authUser,isLoading])


    const loginHandler = async () => {
        if (!email || !password) return;
        try {
            const user = await signInWithEmailAndPassword(auth, email, password)
            console.log(user)
        } catch (error) {
            console.error("an error occured",error)
        }

    }


    const signInWithGoogle = async () =>{
        try {
            const user = await signInWithPopup(auth, provider)
            console.log(user)
        } catch (error) {
            console.error("an error occured",error)
        }
    } 



    // loading true hai tab dikhna chahiye , aur dusare case me loading tab dikhana chahiye jab loading-> false ho , user null na ho
    return isLoading || (!isLoading && authUser) ? (<Loader/>):(
        <main className="flex lg:h-[100vh]">
            <div className="w-full lg:w-[60%] p-8 md:p-14 flex items-center justify-center lg:justify-start">
                <div className="p-8 w-[600px]">
                    <h1 className="text-6xl font-semibold">Login</h1>
                    <p className="mt-6 ml-1">
                        Don't have an account ?{" "}
                        <span className="underline hover:text-blue-400 cursor-pointer">
                            Sign Up
                        </span>
                    </p>


                    <div className="bg-black/[0.05] text-white w-full py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90 flex justify-center items-center gap-4 cursor-pointer group"
                      onClick={signInWithGoogle}>
                        <FcGoogle size={22} />
                        <span className="font-medium text-black group-hover:text-white">
                            Login with Google
                        </span>
                    </div>


                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="mt-10 pl-1 flex flex-col">
                            <label>Email</label>
                            <input
                                type="email"
                                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mt-10 pl-1 flex flex-col">
                            <label>Password</label>
                            <input
                                type="password"
                                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>


                        <button className="bg-black text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90"
                            onClick={loginHandler}>
                            Sign in
                        </button>
                    </form>


                </div>
            </div>

            <div
                className="w-[40%] bg-slate-400 bg-cover bg-right-top hidden lg:block"
                style={{
                    backgroundImage: "url('/login-banner.jpg')",
                }}
            ></div>

        </main>
    );
};

export default LoginForm;

```

- register.js
```js

// eske ander sari state/value aa rhi context api ke global store se 
import { useAuth } from "@/firebase/authContext";

// router => useRouter from next , eska instance bhi create karegen => const router = useRouter()
import { useRouter } from "next/router";

import Loader from "@/components/Loader";

 // value extract kiye context api store se 
    const {authUser, isLoading ,setAuthUser} = useAuth()

    // instance create kiaa useRouter ka 
    const router = useRouter()

     //enn dono me se kisi ki bhi state change hoti hai toh useEffect chalega
     useEffect(()=>{
        //isLoading true nhi hai , authUser null nhi hai toh ess vase me hamara user "login" hai
        if(!isLoading && authUser){
           router.push("/")
        }
   },[authUser,isLoading])


 const signUpHandler = async () => {
         
        // username,email,password teeno me se koi bhi field , field nhi hai toh kuch bhi nhi hona chahiye , 
        // hamara aage ka code execute hi nhi hoga
        // username,email,password teeno me se koi bhi field write nhi kiye toh aage ka code execute nhi hona chahiye
        if (!username || !email || !password) return;
        
        try {
             // createUserWithEmailAndPassword apne paramater me 1-auth, 2- email , 3- password leta hai.
             const user = await createUserWithEmailAndPassword(auth, email, password)
            
             // jaise hi hamara user register ho jayega vaise hi auth ke ander hame wo wala user mil jayega as current user
            // eske ander jo bhi information update karni hao wo de degen eg. email,pass,name
             await updateProfile(auth.currentUser,{
                // hme user ka nam update karna hai
                displayName:username
             })
             //user profile update huyi toh set kiaa
             setAuthUser({
                uid: user.uid,
                email : user.email,
                // username : username
                username

             })
            //  console.log(user)

        } catch (error) {
            console.error("an error occured",error)
        }

    }

```

```js
import React,{ useState ,useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

// authentication k liye register me "auth" import kiaa
// "getAuth" method firebase.js file se mil jayega "auth" me
import { auth } from "../firebase/firebase";


// updateProfile => se hamm kuchh bhi update kar sakte hai eg. email,password,username
// register me mere ko user ka nam null mila toh => user ka name update kiya wtih "updateProfile" se 
// GoogleAuthProvider , signInWithPopup method for login/register with google
import { createUserWithEmailAndPassword , updateProfile , GoogleAuthProvider , signInWithPopup} from "firebase/auth";

const provider = new GoogleAuthProvider();


// eske ander sari state/value aa rhi context api ke global store se 
import { useAuth } from "@/firebase/authContext";

// router => useRouter from next , eska instance bhi create karegen => const router = useRouter()
import { useRouter } from "next/router";

import Loader from "@/components/Loader";




const RegisterForm = () => {

    // name , email , password k liye "state" create kiaa
    const [username, setUserName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    // value extract kiye context api store se 
    const {authUser, isLoading , setAuthUser} = useAuth()

    // instance create kiaa useRouter ka 
    const router = useRouter()

     //enn dono me se kisi ki bhi state change hoti hai toh useEffect chalega
     useEffect(()=>{
        //isLoading true nhi hai , authUser null nhi hai toh ess vase me hamara user "login" hai
        if(!isLoading && authUser){
           router.push("/")
        }
   },[authUser,isLoading])


    const signUpHandler = async () => {
         
        // username,email,password teeno me se koi bhi field , field nhi hai toh kuch bhi nhi hona chahiye , 
        // hamara aage ka code execute hi nhi hoga
        // username,email,password teeno me se koi bhi field write nhi kiye toh aage ka code execute nhi hona chahiye
        if (!username || !email || !password) return;
        
        try {
             // createUserWithEmailAndPassword apne paramater me 1-auth, 2- email , 3- password leta hai.
             const user = await createUserWithEmailAndPassword(auth, email, password)
            
             // jaise hi hamara user register ho jayega vaise hi auth ke ander hame wo wala user mil jayega as current user
            // eske ander jo bhi information update karni hao wo de degen eg. email,pass,name
             await updateProfile(auth.currentUser,{
                // hme user ka nam update karna hai
                displayName:username
             })
             //user profile update huyi toh set kiaa
             setAuthUser({
                uid: user.uid,
                email : user.email,
                // username : username
                username

             })
            //  console.log(user)

        } catch (error) {
            console.error("an error occured",error)
        }

    }

    const signInWithGoogle = async () =>{
                try {
                    const user = await signInWithPopup(auth, provider)
                    console.log(user)
                } catch (error) {
                    console.error("an error occured",error)
                }
    } 

    return isLoading || (!isLoading && authUser) ? (<Loader/>):(
        <main className="flex lg:h-[100vh]">
            <div className="w-full lg:w-[60%] p-8 md:p-14 flex items-center justify-center lg:justify-start">
                <div className="p-8 w-[600px]">
                    <h1 className="text-6xl font-semibold">Sign Up</h1>
                    <p className="mt-6 ml-1">
                        Already have an account ?{" "}
                        <span className="underline hover:text-blue-400 cursor-pointer">
                            Login
                        </span>
                    </p>

                    <div className="bg-black/[0.05] text-white w-full py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90 flex justify-center items-center gap-4 cursor-pointer group"
                      onClick={signInWithGoogle}>
                        <FcGoogle size={22} />
                        <span className="font-medium text-black group-hover:text-white">
                            Login with Google
                        </span>
                    </div>


                    <form onSubmit={(e) => e.preventDefault()}>

                        <div className="mt-10 pl-1 flex flex-col">
                            <label>Name</label>
                            <input
                                type="text"
                                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                required
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>

                        <div className="mt-10 pl-1 flex flex-col">
                            <label>Email</label>
                            <input
                                type="email"
                                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>


                        <div className="mt-10 pl-1 flex flex-col">
                            <label>Password</label>
                            <input
                                type="password"
                                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>


                        <button className="bg-black text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90"
                            onClick={signUpHandler}>
                            Sign Up
                        </button>

                    </form>

                </div>
            </div>

            <div
                className="w-[40%] bg-slate-400 bg-cover bg-right-top hidden lg:block"
                style={{
                    backgroundImage: "url('/login-banner.jpg')",
                }}
            ></div>
        </main>
    );
};

export default RegisterForm;

```

- index.js me => logout ka code hai 
```js
import { AiOutlinePlus } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import React,{useEffect} from "react";

// eske ander sari state/value aa rhi context api ke global store se 
import { useAuth } from "@/firebase/authContext";

// router => useRouter from next , eska instance bhi create karegen => const router = useRouter()
import { useRouter } from "next/router";

import Loader from "@/components/Loader";


const arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

export default function Home() {
    // value extract kiye context api store se 
    const { authUser, isLoading , signOut } = useAuth()

    // instance create kiaa useRouter ka 
    const router = useRouter()


    //enn dono me se kisi ki bhi state change hoti hai toh useEffect chalega
    useEffect(() => {
        // loading false , user ki value null toh logout
        if (!isLoading && !authUser) {
            router.push("/login")
        }
    }, [authUser, isLoading])


    return !authUser ? <Loader/> : (
        <main className="">
            <div className="bg-black text-white w-44 py-4 mt-10 rounded-lg transition-transform hover:bg-black/[0.8] active:scale-90 flex items-center justify-center gap-2 font-medium shadow-md fixed bottom-5 right-5 cursor-pointer"
              onClick={signOut}>
                <GoSignOut size={18} />
                <span>Logout</span>
            </div>
            <div className="max-w-3xl mx-auto mt-10 p-8">
                <div className="bg-white -m-6 p-3 sticky top-0">
                    <div className="flex justify-center flex-col items-center">
                        <span className="text-7xl mb-10">📝</span>
                        <h1 className="text-5xl md:text-7xl font-bold">
                            ToooDooo's
                        </h1>
                    </div>
                    <div className="flex items-center gap-2 mt-10">
                        <input
                            placeholder={`👋 Hello name, What to do Today?`}
                            type="text"
                            className="font-semibold placeholder:text-gray-500 border-[2px] border-black h-[60px] grow shadow-sm rounded-md px-4 focus-visible:outline-yellow-400 text-lg transition-all duration-300"
                            autoFocus
                        />
                        <button className="w-[60px] h-[60px] rounded-md bg-black flex justify-center items-center cursor-pointer transition-all duration-300 hover:bg-black/[0.8]">
                            <AiOutlinePlus size={30} color="#fff" />
                        </button>
                    </div>
                </div>
                <div className="my-10">
                    {arr.map((todo, index) => (
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-3">
                                <input
                                    id={`todo-${index}`}
                                    type="checkbox"
                                    className="w-4 h-4 accent-green-400 rounded-lg"
                                />
                                <label
                                    htmlFor={`todo-${index}`}
                                    className="font-medium"
                                >
                                    This is my first todo
                                </label>
                            </div>

                            <div className="flex items-center gap-3">
                                <MdDeleteForever
                                    size={24}
                                    className="text-red-400 hover:text-red-600 cursor-pointer"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

```






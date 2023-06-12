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
// "getAuth" method firebase se mil jayega "auth" me
//  const auth = getAuth(app)
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const signUpHandler = async () => {
        // username,email,password teeno me se koi bhi field , field nhi hai toh kuch bhi nhi hona chahiye , 
        // hamara aage ka code execute hi nhi hoga

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
             await updateProfile(auth.currentUser,{
                // eske ander jo bhi information update karni hao wo de degen
                displayName:username
             })
             console.log(user)

        } catch (error) {
            console.log("an error occured",error)
        }

    }

```
##### register with google
- <h1>google</h1> wale "div" par onClick se signInWithGoogle method lagaye taki google se register krr paye
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
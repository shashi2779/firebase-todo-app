import React from "react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

// authentication k liye register me "auth" import kiaa
// "getAuth" method firebase.js file se mil jayega "auth" me
import { auth } from "../firebase/firebase";


// updateProfile => se hamm kuchh bhi update kar sakte hai eg. email,password,username
// register me mere ko user ka nam null mila toh => user ka name update kiya wtih "updateProfile" se 
// GoogleAuthProvider , signInWithPopup method for login/register with google
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

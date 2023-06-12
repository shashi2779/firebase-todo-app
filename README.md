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



// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
    apiKey: "AIzaSyB71HQ0C8FqxcW38-8Zz-3v-dJx9ipCZnU",
    authDomain: "order-20dc6.firebaseapp.com",
    projectId: "order-20dc6",
    storageBucket: "order-20dc6.appspot.com",
    messagingSenderId: "962492965713",
    appId: "1:962492965713:web:a88e723534057b3d2be970",
    measurementId: "G-84SVGPKQ9Z"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };

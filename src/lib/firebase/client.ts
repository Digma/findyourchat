import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAIjkEPoZ9VSLwJcUHh-yDESmhv_1Skjzk",
  authDomain: "findyourchat.firebaseapp.com",
  projectId: "findyourchat",
  storageBucket: "findyourchat.appspot.com",
  messagingSenderId: "252352740877",
  appId: "1:252352740877:web:1226e2f365bb22b3775f44",
  measurementId: "G-C8NW3XHE56",
};

export const app = initializeApp(firebaseConfig);

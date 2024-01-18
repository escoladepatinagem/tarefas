import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyCq02SfqivvEAZGgRBkfSTJDA8UwHegPjc',
  authDomain: 'tarefas-25706.firebaseapp.com',
  projectId: 'tarefas-25706',
  storageBucket: 'tarefas-25706.appspot.com',
  messagingSenderId: '99296499325',
  appId: '1:99296499325:web:d2239f92c5d67e6cdc0314',
  measurementId: 'G-L2MGWPDVK2'
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

//const analytics = getAnalytics(app)


export{
  db
}

import React, { useEffect } from 'react'
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import GoogleLogin from '../../componets/GoogleLogin';
import { initializeApp } from 'firebase/app';


const firebaseConfig = {
  apiKey: "AIzaSyAzeRY7RYox42t6Cpy33TQRmzTmlxt8lKo",
  authDomain: "push-notification-ea1fa.firebaseapp.com",
  projectId: "push-notification-ea1fa",
  storageBucket: "push-notification-ea1fa.firebasestorage.app",
  messagingSenderId: "545562261821",
  appId: "1:545562261821:web:26691e6028aad5e4dbed54",
  measurementId: "G-B02Q5ZDQV4",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export default function SignSinup() {


  useEffect(() => {
    async function requestPermission() {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          console.log("Notification permission granted.");

          const token = await getToken(messaging, {
            vapidKey: "BKu5onkuM7rkxFBTo1jEJ_PTno0D_IDPK-_t3Bnr05egp-oZ_ixE1_yTSRQ6TSJhbBp97NrbdzC6WrZ3MgHyIY8",
          });

          if (token) {
            console.log("FCM Token:", token);

            // Send token to backend
            await fetch("http://localhost:5000/save-token", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token }),
            });
          } else {
            console.log("No token available");
          }
        } else {
          console.log("Notification permission denied.");
        }
      } catch (error) {
        console.error("Error getting permission or token", error);
      }
    }

    requestPermission();

    // Optional: listen for foreground messages
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      // alert(`Push notification: ${payload.notification?.title} - ${payload.notification?.body}`);
    });
  }, []);

  if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch((err) => {
      console.error('Service Worker registration failed:', err);
    });
}

  return (
     <div>

  <div className="bg-white min-h-screen py-5">
      {/* External CSS */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/motion-tailwind/motion-tailwind.css"
      />

      <div className="container mx-auto flex flex-col bg-white rounded-lg pt-12 my-5">
        <div className="flex justify-center w-full h-full xl:gap-14 lg:justify-normal md:gap-5">
          <div className="flex items-center justify-center w-full lg:p-12">
            <div className="flex items-center xl:p-10">
              <form className="flex flex-col w-full text-center bg-white rounded-3xl">
                <h3 className="mb-3 text-4xl font-extrabold text-gray-900">Sign In</h3>
                <p className="mb-4 text-gray-700">Enter your email and password</p>

                <GoogleLogin/>

                <div className="flex items-center mb-3">
                  <hr className="flex-grow border-gray-500" />
                  <p className="mx-4 text-gray-600">or</p>
                  <hr className="flex-grow border-gray-500" />
                </div>

                <label htmlFor="email" className="mb-2 text-sm text-left text-gray-900">
                  Email*
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="mail@loopple.com"
                  className="w-full px-5 py-4 mb-7 text-sm font-medium bg-gray-200 text-gray-900 rounded-2xl placeholder:text-gray-700 focus:bg-gray-400 outline-none"
                />

                <label htmlFor="password" className="mb-2 text-sm text-left text-gray-900">
                  Password*
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter a password"
                  className="w-full px-5 py-4 mb-5 text-sm font-medium bg-gray-200 text-gray-900 rounded-2xl placeholder:text-gray-700 focus:bg-gray-400 outline-none"
                />

                <div className="flex justify-between items-center mb-8">
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-5 h-5 border-2 border-gray-500 rounded-sm bg-white peer-checked:bg-purple-500 peer-checked:border-0 flex items-center justify-center">
                      <img
                        src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/icons/check.png"
                        alt="tick"
                        className="w-3 h-3"
                      />
                    </div>
                    <span className="ml-3 text-sm text-gray-900">Keep me logged in</span>
                  </label>
                  <a href="#" className="text-sm font-medium text-purple-500 hover:underline">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className=" text-primary font-bold py-2 px-4 rounded-full"
                  style={{backgroundColor: "#FF6B6B"}}
                >
                  Sign In
                </button>

                <p className="text-sm text-gray-900">
                  Not registered yet?{" "}
                  <a href="#" className="font-bold text-gray-700 hover:underline">
                    Create an Account
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-center mt-10">
        <p className="text-sm text-slate-500">
          Tailwind CSS Component from{" "}
          <a
            href="https://www.loopple.com/theme/motion-landing-library?ref=tailwindcomponents"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-700 hover:text-slate-900"
          >
            Motion Landing Library
          </a>{" "}
          by{" "}
          <a
            href="https://www.loopple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-700 hover:text-slate-900"
          >
            Loopple Builder
          </a>
        </p>
      </div>
    </div>
  
  </div>
)}

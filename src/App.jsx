import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./assets/scss/bootstrap.scss";

import "./assets/css/global.css";
import "./assets/css/fonts.css";
import "./assets/css/animations.css";
// import "./assets/css/responsive.css";

import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Astros from "./pages/astro/Astros";
import Astro from "./pages/astro/Astro";
import Calls from "./pages/call/Calls";
import Call from "./pages/call/Call";
import Chat from "./pages/chat/Chat";
import Chats from "./pages/chat/Chats";
import Payment from "./pages/payment/Payment";
import Payments from "./pages/payment/Payments";
import Order from "./pages/order/Order";
import Orders from "./pages/order/Orders";
import { useSelector } from "react-redux";
import Posts from "./pages/post/Posts";
import RedirectToRoot from "./pages/RedirectToRoot";
import ActiveChatPage from "./pages/ActiveChatPage";
import Wallet from "./pages/wallet/Wallet";
import Review from "./pages/order/Review";
import Profile from "./pages/Profile";
import SignInV1 from "./pages/SignInV1";
import FullScreenImg from "./pages/FullScreenImg";
import ActiveAudioCallPage from "./pages/call/ActiveAudioCallPage";
import ActiveVideoCallPage from "./pages/call/ActiveVideoCallPage";
import BackgroundFcm from "./firebase/BackgroundFcm";
import SplashScreen from "./pages/SplashScreen";
import Notifications from "./pages/Notifications";
import Editprofile from "./pages/Editprofile";
import HelpAndSupport from "./pages/policy/HelpAndSupport";
import Feedback from "./pages/policy/Feedback";
import PrivacyPolicy from "./pages/policy/PrivacyPolicy";
import TermsAndConditions from "./pages/policy/TermsAndConditions";
import RateUs from "./pages/policy/RateUs";
import Coupons from "./pages/coupons/Coupons";

function App() {
  const isSignedIn = useSelector((state) => state.auth.authToken);


  const [isStarting, setIsStarting] = useState(true);
  const [isSplashed, setIsSplashed] = useState(true);

  const startWithPermission = () => {
    const permissions = window.cordova.plugins.permissions;
    console.log(permissions)
    permissions.requestPermissions([permissions.CAMERA, permissions.RECORD_AUDIO], success, error);

    function success(status) {
      if (!status.hasPermission) {
        error(status);
      }
      else setIsStarting(false)
    }

    function error(err) {
      console.log("error", err)
      console.warn('Camera or Microphone permission is not turned on');
    }
  }

  useEffect(() => {
    if (window.cordova) document.addEventListener("deviceready", startWithPermission, false);
    else setIsStarting(false);
  }, []);


  useEffect(() => {
    import("bootstrap");
  }, []);

  useEffect(() => {
    if (!isStarting && !isSplashed && window.cordova) window.StatusBar.backgroundColorByHexString('#fe6a0e')
  }, [isStarting, isSplashed])

  if (isStarting || isSplashed) {
    return <SplashScreen setIsSplashed={setIsSplashed} />;
  }

  return (
    <Routes>
      {isSignedIn ? (
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />

          <Route path='/backgroundNotification/:subject/:subjectId/:event' element={<BackgroundFcm />} />

          <Route path="Astro">
            <Route index element={<Astros />} />
            <Route path=":id" element={<Astro />} />
          </Route>
          <Route path="Astro/Category/:category" element={<Astros />} />

          <Route path="Img">
            <Route path=":src" element={<FullScreenImg />} />
          </Route>

          <Route path="Call">
            <Route index element={<Calls />} />
            <Route path=":id">
              <Route index element={<Call />} />
              <Route path="active/audio" element={<ActiveAudioCallPage />} />
              <Route path="active/video" element={<ActiveVideoCallPage />} />
            </Route>
          </Route>

          <Route path="Chat">
            <Route index element={<Chats />} />
            <Route path=":id">
              <Route index element={<Chat />} />
              <Route path="active" element={<ActiveChatPage />} />
            </Route>
          </Route>

          <Route path="Payment">
            <Route index element={<Payments />} />
            <Route path=":id" element={<Payment />} />
          </Route>

          <Route path="Order">
            <Route index element={<Orders />} />
            {/* <Route path=":id" element={<Order />} />
          </Route> */}
            <Route path=":id">
              <Route index element={<Order />} />
              <Route path="review" element={<Review />} />
            </Route>
          </Route>

          <Route path="Post">
            <Route index element={<Posts />} />
            {/* <Route path=":id" element={<Picture />} /> */}
          </Route>

          <Route path="Profile">
            <Route index element={<Profile />} />
            <Route path="EditProfile" element={<Editprofile />} />

          </Route>

          <Route path="Wallet">
            <Route index element={<Wallet />} />
          </Route>

          <Route path="Notifications">
            <Route index element={<Notifications />} />
          </Route>

          <Route path="HelpAndSupport">
            <Route index element={<HelpAndSupport />} />
          </Route>

          <Route path="Feedback">
            <Route index element={<Feedback />} />
          </Route>

          <Route path="PrivacyPolicy">
            <Route index element={<PrivacyPolicy />} />
          </Route>

          <Route path="TermsAndConditions">
            <Route index element={<TermsAndConditions />} />
          </Route>


          <Route path="RateUs">
            <Route index element={<RateUs />} />
          </Route>

          <Route path="Coupons">
            <Route index element={<Coupons />} />
          </Route>

          <Route path="*" element={<RedirectToRoot />} />
        </Route>
      ) : (
        <Route path="/">
          <Route index element={<SignInV1 />} />
          {/* <Route path="loginWithPhone" element={<VerifyYourPhoneNumber2 />} /> */}
          <Route path="*" element={<RedirectToRoot />} />
        </Route>
      )}
    </Routes>
  );

}

export default App;

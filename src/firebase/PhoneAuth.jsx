import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ErrorModal from "../components/modal/ErrorModal";
import { useSignInMutation } from "../services/authSlice";
import { setAuthData } from "../redux/authSlice";
import 'react-phone-input-2/lib/style.css';
import Button from "../components/form/Button";
import Icons from "../components/ui/Icons";
import PhoneInput from "react-phone-input-2";
import OTPInput from "../components/OTPInput";

export default function PhoneAuth({ setHideGoogle }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signIn] = useSignInMutation();

  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [otp, setOtp] = useState();

  const formClassName = " w-100";
  const btnClassName = " rounded-10 text-white fs-5 w-100 mb-3";


  const setIsOtpVerified = () => navigate(`/`);

  const sendOtp = async (event) => {
    event.preventDefault();
    const form = event.target;
    form?.classList.add('was-validated');
    if (!form.checkValidity()) return;
    setIsLoading(true);
    const phone = form["phone"].value.replace(" ", "").replace("-", "");


    if (window.cordova) {
      // Use Cordova plugin for phone authentication
      window.cordova.GoogleSignIn.sendOtp(phone, function () {
        setIsOtpSent(true);
        setIsLoading(false);
      }, function (error) {
        console.error(error);
        setError("Failed to send OTP");
        setIsLoading(false);
      });
    } else {
      // Use Firebase for web authentication
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(auth,
          "sign-in-button",
          {
            size: "invisible",
            callback: () => { },
            "expired-callback": () => { },
          },
        );

        const result = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);

        window.confirmationResult = result;
        setIsOtpSent(true);
        setHideGoogle(true);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to send OTP");
        setIsLoading(false);
      }
    }
  };

  const verifyOtp = async (event) => {
    event.preventDefault();
    const form = event.target;
    form?.classList.add('was-validated');
    if (!form.checkValidity()) return;
    setIsLoading(true);

    if (window.cordova) {
      // Use Cordova plugin for phone authentication
      window.cordova.GoogleSignIn.verifyOtp(otp, async function (result) {
        const signInRes = await signIn({ token: result });
        if (signInRes.error) return;
        dispatch(setAuthData(signInRes.data.token));
        setIsLoading(false);
        setIsOtpVerified(true);
      }, function (error) {
        console.error(error);
        setError("Failed to verify OTP");
        setIsLoading(false);
      });
    } else {
      // Use Firebase for web authentication
      try {
        const result = await window.confirmationResult.confirm(otp);
        const user = result.user;

        const signInRes = await signIn({ token: user.accessToken });
        if (signInRes.error) return;
        dispatch(setAuthData(signInRes.data.token));
        setIsLoading(false);
        setIsOtpVerified(true);
      } catch (error) {
        console.error(error);
        setError("Failed to verify OTP");
        setIsLoading(false);
      }
    }
  };

  return (
    <>

      {error && <ErrorModal label="Error" message={isOtpSent ? "Invalid OTP" : "Invalid Phone Number"} />}


      <form id="sendOtpForm" className={formClassName} onSubmit={sendOtp} noValidate>
        <PhoneInput
          country={'in'}
          inputProps={{
            name: 'phone',
            required: true,
            autoFocus: true,
            autocomplete: "off",
          }}
          disableDropdown

          inputClass="w-100 rounded-10 ms-3 fs-5 border-0 "
          inputStyle={{ paddingTop: 21, paddingBottom: 21 }}
          containerClass="w-100 rounded-10 mb-3 overflow-hidden border  border-warning"
        />

        {!isOtpSent &&

          <Button
            color={"warning"}
            className={btnClassName}
            res={{ isLoading }}
            id="sign-in-button"
            loadingText="Sending OTP"
          >
            {Icons.phone("me-1 ")}
            Sign In with Phone
          </Button>

        }
      </form>

      <form className={(isOtpSent) ? formClassName : "d-none"} onSubmit={verifyOtp} noValidate>

        <div className="row mb-3 ">
          <div className="col  w-100">
            {/* <input
              className="form-control bg-dark bg-opacity-10 text-muted fw-bold rounded-end-3"
              type="tel"
              name="otp"
              placeholder="Enter OTP"
              minLength={6}
              maxLength={6}
              required
            /> */}
            <OTPInput otp={otp} setOtp={setOtp} />
            <div className="invalid-feedback text-center">
              Please enter a valid 6 digit OTP
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <Button
              color={"warning"}
              className={btnClassName}
              res={{ isLoading }}
              id="sign-in-button"
              loadingText=" Verifying OTP"
            >

              Verify OTP
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

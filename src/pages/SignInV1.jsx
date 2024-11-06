import SignInWithGoogle from "../firebase/SignInWithGoogle";
import PhoneAuth from "../firebase/PhoneAuth";
import signinRishivar from "../assets/images/signinRishivar.png";
import { useState } from "react";

const SignInV1 = () => {
  const [hideGoogle, setHideGoogle] = useState(false);



  return (
    <div className=" h-100 signInGradient d-flex flex-column align-items-center justify-content-center px-5 ">
      <div className=" d-flex flex-column align-items-center ">
        <img src={signinRishivar} alt="notAvailable" className="w-50 mb-3" />
        <h3 className="font-mont text-primary display-1 fw-bold mb-5 ">Rishivar</h3>
        <PhoneAuth setHideGoogle={setHideGoogle} />
        {
          hideGoogle || <>
            <div className="d-flex  w-100 align-items-center  mb-3">
              <hr className="flex-grow-1 border border-warning " />
              <div className="px-2">Or</div>
              <hr className="flex-grow-1 border border-warning" />
            </div>

            <SignInWithGoogle />

            <p className="text-center">By Signing In, you agree to our Terms & Condition and
              Privacy Policy</p>
          </>

        }

      </div>
    </div>

  );
};

export default SignInV1;


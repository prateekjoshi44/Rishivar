import { useEffect, useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";
import { useSignInMutation } from '../services/authSlice';
import GoogleIcon from '../assets/images/google-icon.png';
import { useDispatch } from 'react-redux';
import { setAuthData } from '../redux/authSlice';

const SignInWithGoogle = ({ isDisabled, onDisabledClick }) => {
    const dispatch = useDispatch();
    const provider = new GoogleAuthProvider();
    const [signIn, signInResponse] = useSignInMutation();
    const [isButtonLoading, setIsButtonLoading] = useState(false);

    const signInCordova = () => {
        console.log("sgn in cordova")
        window.cordova.GoogleSignIn.signIn(async (token) => {
            console.log('Sign-In Success:', token);
            const signInRes = await signIn({ token });
            if (signInRes.error) {
                console.error('Firebase sign-in error:', signInRes.error);
                return;
            }
            setIsButtonLoading(false);
            dispatch(setAuthData(signInRes.data.token));
        }, function (error) {
            setIsButtonLoading(false);
            console.error('Sign-In Error:', error);
        });
    }

    const handleSignIn = async (event) => {
        try {
            event.preventDefault();
            setIsButtonLoading(true);

            if (window.cordova) {
                signInCordova()
            } else {
                // Firebase-specific Google sign-in logic
                const result = await signInWithPopup(auth, provider);
                const token = await result.user.getIdToken();
                const signInRes = await signIn({ token });
                if (signInRes.error) {
                    console.error('Firebase sign-in error:', signInRes.error);
                    return;
                }
                dispatch(setAuthData(signInRes.data.token));
                setIsButtonLoading(false);
            }
        } catch (error) {
            console.error('Unexpected error during sign-in:', error);
            setIsButtonLoading(false);
        }
    };


    useEffect(() => {
        if (signInResponse.isSuccess) setIsButtonLoading(false);
    }, [signInResponse.isSuccess]);

    return (
        <form onSubmit={handleSignIn} className="w-100 placeholder-glow mb-4 ">
            <div onClick={onDisabledClick}>
                {
                    isButtonLoading ?

                        <button
                            className="  card bg-white flex-row btn  shadow-sm  align-items-center justify-content-center w-100 rounded-10 placeholder d-flex "
                            disabled
                        >
                            <>
                                <img src={GoogleIcon} width={30} alt="Google Icon" className='me-2' />
                                <div className='fs-5'>Sign in with Google</div>
                            </>
                        </button>
                        :
                        <button
                            className=" card flex-row btn  shadow-sm  align-items-center justify-content-center w-100 rounded-10 "
                            disabled={isDisabled}
                        >
                            <>
                                <img src={GoogleIcon} width={30} alt="Google Icon" className='me-2' />
                                <div className='fs-5'>Sign in with Google</div>
                            </>
                        </button>
                }
            </div>
        </form>
    );
};

export default SignInWithGoogle;

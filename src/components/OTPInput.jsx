import { useState, useRef, useEffect } from "react";
// import "./styles.css";

const OTPInput = ({ name, setOtp }) => {

    const [otpCode, setOtpCode] = useState(Array(6).fill(""));
    const inputRefs = useRef([]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return;

        setOtpCode(prevOtpCode => {
            const newOtpCode = [...prevOtpCode];
            newOtpCode[index] = element.value;

            // Focus next input field
            if (element.nextSibling && element.value) {
                element.nextSibling.focus();
            }

            return newOtpCode;
        });
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otpCode[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    useEffect(() => {
        const otpString = otpCode.join("");
        setOtp(otpString)
    }, [otpCode])

    return (
        <div className=" d-flex justify-content-between mb-3" style={{ width: 150 }}>
            {otpCode.map((data, index) => (
                <input
                    key={index}
                    type="number"
                    name={name}
                    maxLength="1"
                    value={data}
                    className="text-center border border-primary fs-5 rounded-3 mx-1"
                    style={{ height: 40, width: 40 }}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                />
            ))}
        </div>
    );
};


export default OTPInput
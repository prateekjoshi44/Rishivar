import NewPhoneInput from "./NewPhoneInput";
import PhoneCodeInput from "./PhoneInput";

const LatestPhoneInput = ({

  containerClass,
  phoneCode,
  setPhoneCode,
  phoneno,
  setPhoneno,
}) => {
  const containerClassName =
    "d-flex align-items-center " + (containerClass ? containerClass : "");
  // const labelClassName =
  //   "fw-bold fs-13 text-nowrap me-3 " + (labelClass ? labelClass : "");
  // const inputSelectClassName =
  //   " form-select form-select-sm rounded-pill shadow-sm " +
  //   (inputClass ? inputClass : "");
  // const overrideInputClassName =
  //   " form-select form-select-sm" + overrideInputClass;

  return (
    <div className={containerClassName}>
      <PhoneCodeInput
        name={"Phone Code"}
        labelName={" "}
        value={phoneCode}
        onChange={(phone) => setPhoneCode("+" + phone)}
      />
      <NewPhoneInput name={"Phone No"} value={phoneno} setValue={setPhoneno} required />
    </div>
  );
};

export default LatestPhoneInput;

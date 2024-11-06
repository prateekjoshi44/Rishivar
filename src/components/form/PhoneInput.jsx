import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PhoneCodeInput = ({
  name,
  placeholder,


  containerClass,
  inputClass,
  ...attributes
}) => {
  const containerClassName =
    "d-flex align-items-center " + (containerClass ? containerClass : "");
  // const labelClassName =
  //   "fw-bold fs-13 me-3 text-nowrap " + (labelClass ? labelClass : "");
  const inputClassName =
    "form-control form-control-sm rounded-pill shadow-sm " +
    (inputClass ? inputClass : "");
  // const overrideInputClassName =
  //   "form-control form-control-sm" + overrideInputClass;
  // const inputType = type ? type : "text";

  return (
    <div className={containerClassName}>
      <PhoneInput
        country={"us"}
        buttonClass="rounded-start-pill"
        inputClass={inputClassName}
        id={name}
        name={name || placeholder}
        // inputProps={{ disabled: true }}
        placeholder={placeholder ? placeholder : name}
        inputStyle={{ width: 100 }}
        {...attributes}
      />
    </div>
  );
};

export default PhoneCodeInput;

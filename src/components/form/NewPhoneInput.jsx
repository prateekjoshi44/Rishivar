const NewPhoneInput = ({
  name,
  placeholder,
  type,
  containerClass,
  inputClass,
  setValue,
  overrideInputClass,
  ...attributes
}) => {
  const containerClassName =
    "d-flex align-items-center col ms-2 " +
    (containerClass ? containerClass : "");
  // const labelClassName =
  //   "fw-bold fs-13 me-3 text-nowrap " + (labelClass ? labelClass : "");
  const inputClassName =
    "form-control form-control-sm rounded-pill px-3 shadow-sm " +
    (inputClass ? inputClass : "");
  const overrideInputClassName =
    "form-control form-control-sm" + overrideInputClass;
  const inputType = type ? type : "text";

  const onChange = (e) => setValue && setValue(e.target.value);

  return (
    <div className={containerClassName}>
      <input
        type={inputType}
        className={overrideInputClass ? overrideInputClassName : inputClassName}
        id={name}
        name={name || placeholder}
        onChange={onChange}
        placeholder={placeholder ? placeholder : name}
        {...attributes}
      />
    </div>
  );
};

export default NewPhoneInput;

import { useEffect, useRef, useState } from "react";

import ProfilePicture from "../ProfilePicture";
import { FaUserCircle } from "react-icons/fa";

const ProfilePictureInput = ({
  name,
  containerClass,
  defaultValue,
  placeholder,
  ...attributes
}) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const containerClassName = containerClass ? containerClass : "";

  const onChange = (e) => setFile(e.target.files[0]);

  useEffect(() => {
    const inputElement = fileInputRef.current;
    const form = inputElement?.form;

    if (form) {
      const handleReset = () => setFile(null);
      form.addEventListener("reset", handleReset);
      return () => {
        form.removeEventListener("reset", handleReset);
      };
    }
  }, []);

  return (
    <div className={containerClassName}>
      {file ? (
        <label htmlFor={name}>
          <img
            src={URL.createObjectURL(file)}
            className="object-fit-cover rounded-4 border border-2 border-dark"
            alt=""
            style={{ height: 132, width: 132 }}
            placeholder={placeholder}
          />
        </label>
      ) : defaultValue ? (
        <label htmlFor={name}>
          <ProfilePicture imgClass="rounded-4" size={132} name={"hello"} picture={defaultValue} />
        </label>
      ) : (
        <label htmlFor={name}>
          <FaUserCircle style={{ fontSize: "100px", color: "#6c757d" }} />
        </label>
      )}

      <input
        type="file"
        className="d-none"
        id={name}
        name={name}
        ref={fileInputRef}
        onChange={onChange}
        {...attributes}
      />
    </div>
  );
};

export default ProfilePictureInput;

import { useState } from "react";

const CustomInput = (props: {
  locationStyle: string;
  placeholder: string;
  type: string;
  regular: string;
  errorMsg: string;
  setValue: (value: string) => void;
}) => {
  const [isInput, setIsInput] = useState(false);

  return (
    <div className={props.locationStyle}>
      <input
        placeholder={props.placeholder}
        type={props.type}
        onBlur={(e) => {
          if (!e.target.value.match(props.regular)) {
            setIsInput(true);
          } else {
            setIsInput(false);
            props.setValue(e.target.value);
          }
        }}
        className="w-full h-10 bg-transparent   border-b  rounded-none
           border-gray-600 hover:border-gray-300 focus:outline-none "
      />
      <div className="h-4  text-orange-500 text-sm">
        {isInput && props.errorMsg}
      </div>
    </div>
  );
};

export default CustomInput;

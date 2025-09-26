import { useRef, useState } from "react";
import { Back, ForwardArrow } from "../common/Icon";
import { Logo } from "../common/Logo";

const Register = () => {
  const [registerName, setRegisterName] = useState("");
  const [registerPass, setRegisterPass] = useState("");
  const [registerRep, setRegisterRep] = useState("");
  const [error, setError] = useState("");

  const registerNameRef = useRef<HTMLInputElement>(null);
  const registerPassRef = useRef<HTMLInputElement>(null);
  const registerRepRef = useRef<HTMLInputElement>(null);

  const regexUsername = "^[a-zA-Z][a-zA-Z0-9_]{4,15}$";
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,18}$/;

  const usernameRegexNotMatch =
    "username consists of characters and numbers, and is between 5 and 16 in length";
  const passwordRegexNotMatch =
    "password starts with a letter, is between 6~18 in length, and can only contain letters, numbers ";
  const passwordTwiceNotMatch = "the password entered twice is not the same";

  function regex_username_test(username: string) {
    if (username != "" && !username.match(regexUsername)) {
      setError(usernameRegexNotMatch);
    } else {
      setError("");
    }
  }

  function regex_password_test(password: string) {
    if (password != "" && !password.match(regexPassword)) {
      setError(passwordRegexNotMatch);
    } else {
      setError("");
    }
  }

  function handle_register(
    username: string,
    password: string,
    passwordRep: string
  ) {
    if (username == "") {
      setError("please fill username ");
      registerNameRef.current?.focus();
      return;
    }
    if (!username.match(regexUsername)) {
      setError(usernameRegexNotMatch);
      registerNameRef.current?.focus();
      return;
    }
    if (password == "") {
      setError("please fill password");
      registerPassRef.current?.focus();
      return;
    }
    if (!password.match(regexPassword)) {
      setError(passwordRegexNotMatch);
      registerPassRef.current?.focus();
      return;
    }
    if (passwordRep == "") {
      setError(passwordTwiceNotMatch);
      registerRepRef.current?.focus();
      return;
    }
    if (!passwordRep.match(regexPassword)) {
      setError(passwordRegexNotMatch);
      registerRepRef.current?.focus();
      return;
    }
    if (password !== passwordRep) {
      setError(passwordTwiceNotMatch);
      return;
    }
    register();
  }

  const register = () => {
    const url = import.meta.env.VITE_API_URL + "/register";
    const bodyStr = JSON.stringify({
      name: registerName,
      password: registerPass,
    });
    fetch(url, {
      method: "POST",
      body: bodyStr,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        if (data == "success") {
          history.go(-1);
        } else {
          setError(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="flex  h-10 pt-2 pr-12 items-end w-full ">
        <Back className=" ml-2 " onClick={() => history.go(-1)} />
        <Logo className="h-8 m-auto" />
      </div>
      <div className="  mt-20 ">
        <div className="flex w-4/5 m-auto  pb-4">
          <div
            className="text-center w-full ml-2 h-8"
            onClick={() => {
              setError("");
            }}
          >
            REGISTER
          </div>
        </div>

        <div className="flex">
          <input
            placeholder="username"
            type="text"
            ref={registerNameRef}
            value={registerName}
            onChange={(e) => {
              regex_username_test(e.target.value);
              setRegisterName(e.target.value);
            }}
            className="w-4/5  m-auto h-12 bg-transparent p-2 border-b rounded-none border-gray-600 hover:border-gray-300 focus:outline-none "
            autoFocus
          ></input>
        </div>
        <div className="flex ">
          <div className=" relative w-4/5   m-auto place-items-end ">
            <input
              placeholder="password"
              type="password"
              ref={registerPassRef}
              value={registerPass}
              onChange={(e) => {
                regex_password_test(e.target.value);
                setRegisterPass(e.target.value);
              }}
              className="w-full   m-auto h-12 bg-transparent p-2 border-b rounded-none border-gray-600 hover:border-gray-300 focus:outline-none "
            ></input>
          </div>
        </div>
        <div className="flex ">
          <div className=" relative w-4/5   m-auto place-items-end ">
            <input
              placeholder="password"
              type="password"
              ref={registerRepRef}
              value={registerRep}
              onChange={(e) => {
                regex_password_test(e.target.value);
                setRegisterRep(e.target.value);
              }}
              className="w-full   m-auto h-12 bg-transparent p-2 border-b rounded-none border-gray-600 hover:border-gray-300 focus:outline-none "
            ></input>
            <ForwardArrow
              className="absolute bottom-2 right-2 z-10 "
              onClick={() =>
                handle_register(registerName, registerPass, registerRep)
              }
            />
          </div>
        </div>

        {error != "" && (
          <div className="mt-10 w-4/5   m-auto  text-center  text-orange-400">
            {error}
          </div>
        )}
      </div>
    </>
  );
};

export default Register;

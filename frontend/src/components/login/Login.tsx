import { useRef, useState } from "react";
import { Back, ForwardArrow } from "../common/Icon";
import { Logo } from "../common/Logo";

const Login = () => {
  const [loginName, setLoginName] = useState("");
  const [loginPass, setLoginPass] = useState("");

  const [error, setError] = useState("");

  const loginNameRef = useRef<HTMLInputElement>(null);
  const loginPassRef = useRef<HTMLInputElement>(null);

  const regexUsername = "^[a-zA-Z][a-zA-Z0-9_]{4,15}$";
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,18}$/;

  const usernameRegexNotMatch =
    "username consists of characters and numbers, and is between 5 and 16 in length";
  const passwordRegexNotMatch =
    "password starts with a letter, is between 6~18 in length, and can only contain letters, numbers ";

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

  function handle_login(username: string, password: string) {
    if (username == "") {
      setError("please fill username ");
      loginNameRef.current?.focus();

      return;
    }
    if (!username.match(regexUsername)) {
      setError(usernameRegexNotMatch);
      loginNameRef.current?.focus();
      return;
    }
    if (password == "") {
      setError("please fill password");
      loginPassRef.current?.focus();
      return;
    }
    if (!password.match(regexPassword)) {
      setError(passwordRegexNotMatch);
      loginPassRef.current?.focus();
      return;
    }
    login();
  }

  const login = () => {
    const url = import.meta.env.VITE_API_URL + "/login";
    const bodyStr = JSON.stringify({ name: loginName, password: loginPass });
    fetch(url, {
      method: "POST",
      body: bodyStr,
      headers: {
        "content-type": "application/json",
      },
    })
      .then(async (response) => {
        const text = response.text();
        if (response.ok) {
          return text;
        } else if (response.status == 400) {
          console.log(response.status);
          setError(await text);
          return;
        }
      })
      .then((data) => {
        if (!!data) {
          localStorage.setItem("username", loginName);
          localStorage.setItem("user_token", data);
          var now = new Date();
          localStorage.setItem(
            "expire_time",
            new Date(
              now.getTime() + 99 * 24 * 60 * 60 * 1000
            ).toLocaleDateString()
          );
          history.go(-1);
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
        <div className="w-4/5 m-auto  pb-4">
          <div
            className="text-center w-full mr-2 h-12 "
            onClick={() => {
              setError("");
            }}
          >
            LOGIN
          </div>
        </div>

        <div className="flex">
          <input
            placeholder="username"
            type="text"
            ref={loginNameRef}
            value={loginName}
            onChange={(e) => {
              regex_username_test(e.target.value);
              setLoginName(e.target.value);
            }}
            className="w-4/5  m-auto h-12 mb-4 bg-transparent p-2  border-b  rounded-none border-gray-600 hover:border-gray-300 focus:outline-none "
            autoFocus
          ></input>
        </div>
        <div className="flex ">
          <div className=" relative w-4/5   m-auto place-items-end ">
            <input
              placeholder="password"
              type="password"
              ref={loginPassRef}
              value={loginPass}
              onChange={(e) => {
                regex_password_test(e.target.value);
                setLoginPass(e.target.value);
              }}
              className="w-full   m-auto h-12 bg-transparent p-2 border-b rounded-none border-gray-600 hover:border-gray-300 focus:outline-none "
            ></input>
            <ForwardArrow
              className="absolute bottom-2 right-2 z-10 "
              onClick={() => handle_login(loginName, loginPass)}
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

export default Login;

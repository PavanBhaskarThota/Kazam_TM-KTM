import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { DynamicInput } from "./DynamicInput";
import { useDispatch, useSelector } from "react-redux";
import { createUser, loginUser } from "../../redux/Slices/user.slice";
import { Loading } from "../../components/subComponents/Loading/Loading";
import { AppDispatch } from "../../redux/store";

export const Auth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSigned, setIsSigned] = useState(true);
  const [passwordType, setPasswordType] = useState("password");

  const isAuthenticated = !!localStorage.getItem("token");

  const { status } = useSelector((state: any) => state.users);
  const handleChange = (e: any) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (isSigned) {
      dispatch(loginUser(user));
    } else {
      dispatch(createUser(user));
    }
  };

  if (status === "success") {
    navigate(-1);
  }

  const handleIsSigned = () => {
    setIsSigned(!isSigned);
    setUser({
      name: "",
      email: "",
      password: "",
    });
  };

  const inputData = [
    {
      title: "Name",
      name: "name",
      type: "text",
      value: user.name,
      placeholder: "Name",
      handleChange,
      isShow: !isSigned,
    },
    {
      title: "Email",
      name: "email",
      type: "email",
      value: user.email,
      placeholder: "Email",
      handleChange,
      isShow: true,
    },
    {
      title: "Password",
      name: "password",
      type: passwordType,
      value: user.password,
      placeholder: "Password",
      handleChange,
      isShow: true,
    },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center py-10 h-[92vh] bg-gradient-to-b from-[#A6CDC6] to-white">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[350px]">
        {inputData.map((input) => (
          <DynamicInput key={input.name} {...input} />
        ))}

        <h2
          className="text-[#468585] text-lg cursor-pointer self-end"
          onClick={() =>
            setPasswordType(passwordType == "password" ? "text" : "password")
          }
        >
          {passwordType == "password" ? "Show" : "Hide"}
        </h2>
        <button
          type="submit"
          className="bg-[#468585] text-white p-4 rounded-md"
        >
          {isSigned ? "Login" : "Sign Up"}
        </button>
      </form>

      <h2>
        {isSigned ? "Don't have an account?  " : "Already have and account?  "}{" "}
        <Link
          to={`/auth`}
          onClick={handleIsSigned}
          className="text-[#468585] text-lg"
        >
          {isSigned ? " Sign Up" : " Login"}
        </Link>
      </h2>
    </div>
  );
};

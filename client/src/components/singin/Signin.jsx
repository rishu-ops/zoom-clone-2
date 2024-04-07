import { useState } from "react";
import { bannersinginImage } from "../../assets";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contex/Auth";
import { errorToast, successToast } from "../../services/toasts";
import { baseUrl } from "../../config";

const Signin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [auth, setAuth] = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${baseUrl}/signin`, {
        email: user.email,
        password: user.password,
      });

      if (res && res.data.success) {
        successToast(res.data && res.data.message);

        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

        localStorage.setItem("auth", JSON.stringify(res.data));

        navigate(location.state || "/dashboard");
      } else {
        errorToast(res.data.message);
      }
    } catch (error) {
      errorToast("Something went wrong");
    }
  };

  return (
    <div className="w-full h-screen flex lg:flex-row flex-col md:flex-row  ">
      <div className=" lg:w-[45%] md:-w-[45%] w-100% flex justify-center items-center">
        <img
          className="lg:h-[300px] md:h-[300px] h-[200px]"
          src={bannersinginImage}
          alt="image"
        />
      </div>

      <div className="mt-12  lg:w-[50%] md:-w-[50%] w-100% ">
        <div className="text-black text-4xl font-bold text-center">
          <p> Sign In </p>
        </div>

        <div className="mt-10 flex justify-center ">
          <form
            className="flex-col text-center w-[80%]"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Email-address"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="border border-gray-500 rounded-lg p-3 w-full mb-5"
            />
            <input
              type="text"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="border border-gray-500 rounded-lg p-3 w-full mb-10"
            />{" "}
            {/* Using w-full for child inputs */}
            <div className="flex justify-between text-blue-900 w-full  mb-3">
              <p>Forgot password?</p>
              <p>Help</p>
            </div>
            <button
              type="submit"
              className="bg-blue-600 w-full p-2 rounded-lg text-xl text-white mb-4 hover:bg-blue-500"
            >
              Sign In
            </button>
            <div className="">
              <p className="text-left text-blue-600 w-[80%]">
                By signing in, I agree to the Zoom's Privacy Statement and Terms
                of Service.
              </p>
            </div>
          </form>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-8 mb-10">
          <p>Or sign in with</p>
          <div className="flex justify-center gap-20">
            <img src="" alt="1" />
            <img src="" alt="2" />
            <img src="" alt="3" />
            <img src="" alt="4" />
          </div>
        </div>
        <div className="">
          <p className="text-sm mx-auto w-[80%]">
            Zoom is protected by reCAPTCHA and the Google Privacy Policy and
            Terms of Service apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;

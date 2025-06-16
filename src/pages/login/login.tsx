import "./login.css";
import { loginEmployee } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import type { LoginRequest } from "../../models/request/loginRequest";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

// validation schema
const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "empTester",
      password: "@Tester10",
    },
  });

  const login = async (request: LoginRequest) => {
    try {
      const resp = await loginEmployee(request);

      if (resp.status == 200) {
        localStorage.setItem("sessionKey", resp.content?.sessionKey || "");
        localStorage.setItem("accountId", resp.content?.id || "");

        console.log("Logged in employee", resp.content);

        toast.success(resp.message);

        navigate("/project");
      } else {
        toast.error(resp.message);
      }
    } catch (error) {
      console.error("Login failed", error);

      toast.error("Login failed");
    }
  };

  return (
    <>
      <div className="loginContainer">
        <div className="loginTitle">Login</div>
        <form onSubmit={handleSubmit(login)}>
          <div>
            <label>Username</label>
          </div>
          <div className="formGroup">
            <input type="text" {...register("username")} />
            {errors.username && (
              <p className="errorText">{errors.username.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="">Password</label>
          </div>
          <div className="formGroup">
            <input type="password" {...register("password")} />
            {errors.password && (
              <p className="errorText">{errors.password.message}</p>
            )}
          </div>
          <button type="submit" className="loginBtn">
            Sign In
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;

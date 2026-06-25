import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useState } from "react";
import logo from "../../assets/images/kurdistan-region-goverment-logo.png";
import { login } from "../../api/auth";
import type { LoginPayload } from "../../types/auth";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "../../store/userStore";
import { ImSpinner } from "react-icons/im";
import { LogInIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginPayload, setLoginPayload] = useState<LoginPayload>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { setUser } = useUserStore();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (data) => {
      // set the user as global state when login is successful
      setUser(data);
      navigate('/');
    },
    onError: () => {
      // set the user as null when login fails
      setUser(null);
    },
  });

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutate(loginPayload); // trigger the login function
  };

  const handlePayloadChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLoginPayload({
      ...loginPayload,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* text and image side */}
      <div className="flex flex-col w-full items-center justify-center gap-5 bg-teal-600 p-8 text-white md:w-2/5 md:min-h-screen">
        <img
          src={logo}
          alt="Kurdistan Region Government logo"
          className="w-60 md:w-64 h-auto"
        />
        <div>
          <h1 className="text-2xl font-bold">e-Zanko</h1>
          <h2 className="text-md text-gray-200">Higher education</h2>
        </div>
      </div>

      {/* login */}
      <div className="flex w-full flex-1 items-center justify-center p-6 md:w-3/5">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <h2 className="text-md text-gray-400">
            Sign in to your e-zanko account
          </h2>

          {/* email input */}
          <div className="mt-6 space-y-2">
            <Label>Email address</Label>
            <Input
              name="email"
              onChange={handlePayloadChange}
              type="email"
              placeholder="name@institution.edu.krd"
              className="w-full"
            />
          </div>

          {/* password input */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <Label>Password</Label>
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer text-sm font-bold text-teal-600 hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <Input
              name="password"
              onChange={handlePayloadChange}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full"
            />
          </div>

          <p className="text-teal-600 text-sm mt-3 font-bold text-right cursor-pointer text-align-right">
            Forgot password?
          </p>

          {error && (
            <p className="mt-4 text-sm font-semibold text-red-500">
              {error.message}
            </p>
          )}

          <Button
            className={`mt-6 w-full bg-teal-600 hover:bg-teal-700 ${isPending ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
            onClick={handleLogin}
          >
            {isPending ? (
              <>
                <ImSpinner className="animate-spin mr-2" />
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <LogInIcon className="mr-2" />
                <span>Login</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

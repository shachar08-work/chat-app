import Victory from "@/assets/victory.svg"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs.jsx"
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useState } from "react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client"
import { SIGNUP_ROUTE, LOGIN_ROUTE } from "@/utils/constants";
import { useNavigate } from 'react-router-dom';
import { useAppStore } from "@/store";

const Auth = () => {

  const navigate = useNavigate();
  const { setUserInfo } = useAppStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateSignup = () => {
    if(email.length == 0) {
      toast.error("Email is required!")
      return false;
    }
    if(password.length == 0) {
      toast.error("Password is required!")
      return false;
    }
    if(password !== confirmPassword) {
      toast.error("Password and confirm password should be the same!")
      return false;
    }
    return true;
  }

  const validateLogin = () => {
    if(email.length == 0) {
      toast.error("Email is required!")
      return false;
    }
    if(password.length == 0) {
      toast.error("Password is required!")
      return false;
    }
    return true;
  }

  const handleSignUp = async () => {
    if (validateSignup()) {
      const response = await apiClient.post(SIGNUP_ROUTE, { email, password }, { withCredentials: true });
      if (response.status === 201) {
        setUserInfo(response.data.user);
        navigate("/profile");
        toast.error("Please setup profile to continue!")
      }
      console.log({ response });
    } 
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      const response = await apiClient.post(LOGIN_ROUTE, { email, password }, { withCredentials: true });
      if (response.data.user.id) {
        setUserInfo(response.data.user);
        console.log(response.data.user.profileSetup)
        if(response.data.user.profileSetup) {
          navigate("/chat");
        }
        else {
          navigate("/profile")
        }
      }
      console.log({ response });
    } 
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white border-2 border-white text-opacity-90 shadow-2xl rounded-3xl p-6 md:p-10 grid">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <div className="flex items-center justify-center gap-3">
              <h1 className="text-3xl md:text-5xl font-bold">Welcome</h1>
              <img src={Victory} alt="Victory Emoji" className="h-12 md:h-24" />
            </div>
            <p className="font-medium text-sm md:text-base">
              Fill in the details to get started!
            </p>
          </div>
  
          <div className="w-full max-w-xl">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="bg-transparent rounded-none w-full flex">
                <TabsTrigger
                  value="login"
                  className="w-1/2 text-black text-opacity-90 border-b-2 border-transparent p-3 transition-all duration-300 data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="w-1/2 text-black text-opacity-90 border-b-2 border-transparent p-3 transition-all duration-300 data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
  
              <TabsContent value="login" className="mt-6">
                <div className="flex flex-col gap-5">
                  <Input
                    placeholder="Email"
                    type="email"
                    name="loginEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-full p-4"
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    name="loginPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-full p-4"
                  />
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    name="loginConfirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="rounded-full p-4 invisible"
                  />
                  <div className="mt-6 w-full flex justify-center">
                    <Button
                      className="rounded-full w-1/4 px-6 py-3 bg-purple-700 text-white font-semibold"
                      onClick={handleLogin}
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </TabsContent>
  
              <TabsContent value="signup" className="mt-6">
                <div className="flex flex-col gap-5">
                  <Input
                    placeholder="Email"
                    type="email"
                    name="signupEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-full p-4"
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    name="signupPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-full p-4"
                  />
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    name="signupConfirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="rounded-full p-4"
                  />
                  <div className="mt-6 w-full flex justify-center">
                    <Button
                      className="rounded-full w-1/4 px-6 py-3 bg-purple-700 text-white font-semibold"
                      onClick={handleSignUp}
                    >
                      Sign Up
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Auth;
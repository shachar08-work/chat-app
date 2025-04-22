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
      }
      console.log({ response });
    } 
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      const response = await apiClient.post(LOGIN_ROUTE, { email, password }, { withCredentials: true });
      if (response.data.user.id) {
        setUserInfo(response.data.user);
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
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="h-[80vh] w-[80vw] bg-white border-2 border-white text-opacity-90 shadow-2xl rounded-3xl grid">
        <div className="flex flex-col gap-10 items-center justify-center">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={Victory} alt="Victory Emoji" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Fill in the details to get started!
            </p>
          </div>
          <div className="flex items-center justify-center w-full bg">
            <Tabs defaultValue="login" className="w-3/4">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger value="login" className="state-active data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">Login</TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="mt-8">
                <div className="flex flex-col items-center justify-center gap-5 h-[300px]">
                  <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-full p-4 w-full"
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-full p-4 w-full"
                  />
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="rounded-full p-4 w-full invisible"
                  />
                  <div className="mt-6">
                    <Button
                      className="rounded-full px-6 py-3 bg-purple-700 text-white font-semibold"
                      onClick={handleLogin}
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="signup" className="mt-8">
                <div className="flex flex-col items-center justify-center gap-5 h-[300px]">
                  <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-full p-4 w-full"
                  />
                  <Input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-full p-4 w-full"
                  />
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="rounded-full p-4 w-full"
                  />
                  <div className="mt-6">
                    <Button
                      className="rounded-full px-6 py-3 bg-purple-700 text-white font-semibold"
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
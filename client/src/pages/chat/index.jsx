import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store"
import { useEffect } from "react";
import { toast } from "sonner";

const Chat = () => {

  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    toast("Please setup profile to continue!");
    navigate("/profile");
  }, [userInfo])

  return (
    <div className="">Chat</div>
  )
}

export default Chat
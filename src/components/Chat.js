import { Box } from "@chakra-ui/react";
import { ChatState } from "../context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer"
import Navbar from './Navbar';
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
export default function Chat(){
  const navigate = useNavigate();
  const user=ChatState();
  const [FetchAgain, setFetchAgain] = useState(false)
  useEffect(() => {
  const userInfo = JSON.parse(localStorage.getItem("User"))
  if(!userInfo){
    navigate("/")
  }
  }, [])
  
  const userInfo = JSON.parse(localStorage.getItem("User"))
  if (userInfo){
    return(<>
    <Navbar/>
      <div className="w-[100%]">
         {user && <SideDrawer/>}
         <Box
         display='flex'
         justifyContent='space-between'
         w='100%'
         h='91.5vh'
         padding='10px'
         >
          {user && <MyChats  FetchAgain = {FetchAgain} />}
          {user && <ChatBox FetchAgain = {FetchAgain} setFetchAgain={setFetchAgain}/>}
         </Box>
      </div>
      </>)
  }
  return (
    <div className="text-2xl flex justify-center items-center font-sans">
    Unauthorised Access
    </div>
  )

}
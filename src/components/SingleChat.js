import React, { useEffect, useState } from 'react'
import {Box, Button, FormControl, Input, Spinner, useToast, Text, IconButton } from '@chakra-ui/react'
import { ChatState } from '../context/ChatProvider'
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderObject } from '../Config/ChatLogics';
import ProfileModel from './miscellaneous/ProfileModel';
import UpdateGroupChatModel from './miscellaneous/UpdateGroupChatModel';
import ScrollableChat from './ScrollableChat';
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
var socket , selectedChatCompare;
const SingleChat = ({FetchAgain,setFetchAgain}) => {
    
    
    const [Messages, setMessages] = useState([]);
     const [Loading, setLoading] = useState(false);
     const [newMessage, setNewMessage] = useState("");
    const {User,SelectedChat,setSelectedChat,Notification,setNotification} = ChatState();
    const [SocketConnected, setSocketConnected] = useState(false)
    const [Typing, setTyping] = useState(false)
    const [IsTyping, setIsTyping] = useState(false)
    const toast = useToast();
      //EStablishing socket io client 
      useEffect(() => {
        const uI = JSON.parse(localStorage.getItem("User"));
        socket = io(ENDPOINT);
        socket.emit("setup", uI);
        socket.on("connected", () => setSocketConnected(true))
        socket.on("typing", () => setIsTyping(true))
        socket.on("stop typing", () => setIsTyping(false))
    }, [])
    //-------------------------------
    useEffect(() => {
        fetchMessages();
        selectedChatCompare = SelectedChat;
      }, [SelectedChat])
    //    console.log(Notification,"=----------------------------------")
      useEffect(() => {
       socket.on('message recieved',(newMessageRecieved)=>{
        if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id){
            if(!Notification.includes(newMessageRecieved)){
                setNotification([newMessageRecieved,...Notification])
                setFetchAgain(!FetchAgain)
            }
        }else{
            setMessages([...Messages, newMessageRecieved])
        }
       });
      })
      
    async function sendMessage(event){
           if(event.key === 'Enter' && newMessage){
            socket.emit('stop typing',SelectedChat._id)
              try {
                const res = await fetch ("http://localhost:5000/api/message/",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${User.token}`
                    },
                    body:JSON.stringify({
                        content:newMessage,
                        chatId:SelectedChat._id
                    })
                })
                const data = await res.json();
                socket.emit('new message',data)
                 setNewMessage(" ");
                 setMessages([...Messages,data])
              } catch (error) {
                  console.log(error)
                   toast({
                      title:"Error Occured!",
                      description:"Failed to send the Message",
                      status:"error",
                      duration:5000,
                      isClosable:true,
                      position:"bottom"
                  })
              }
           }
    }
    async function fetchMessages(){
        if(!SelectedChat) return;
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:5000/api/message/${SelectedChat._id}`,{
                method:"GET",
                headers:{
                    Authorization:`Bearer ${User.token}`
                }
            })
            const data = await res.json();
            setMessages(data);
            socket.emit("join chat", SelectedChat._id);
        } catch (error) {
            console.log(error)
            toast({
                title:"Error Occured!",
                description:"Failed to fetch the Messages",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom"
            })
        }
        setLoading(false);

    }
  
    function typingHandler(e){
           setNewMessage(e.target.value);

           if(!SocketConnected) return;
           if(!Typing){
            setTyping(true);
            socket.emit("typing", SelectedChat._id);
           }
           let lastTypingTime = new Date().getTime();
           var timerLength = 3000;
           setTimeout(() => {
            var timeNow = new Date().getTime();
            var timeDiff = timeNow - lastTypingTime;
            if(timeDiff >= timerLength && Typing){
                socket.emit("stop typing", SelectedChat._id);
                setTyping(false);
            }
           }, timerLength);
    }
  return (
    <>
    {SelectedChat?(
        <>
        <Text fontSize={{base:"28px" , md:"30px"}} 
            pb={3} px={2} w="100%"   
            fontFamily="Work sans" d="flex" justifyContent={{base:"space-between"}} 
            alignItems="center"
        >
            <IconButton
                d={{base:"flex", md:"none"}}
                 icon={<ArrowBackIcon/>}
                 onClick={()=>setSelectedChat("")}
                 />    
                 {
                     !SelectedChat.isGroupChat?
                     (
                         <>
                         {getSender(User,SelectedChat.users)}
                         <ProfileModel user={getSenderObject(User,SelectedChat.users)}/>
                         </>
                     ):
                     (
                         <>
                         {SelectedChat.chatName.toUpperCase()}
                         <UpdateGroupChatModel
                             fetchAgain={FetchAgain}
                             setFetchAgain={setFetchAgain}
                             fetchMessages={fetchMessages}
                         />
                         </>
                     )
                 } 
        </Text>
        <Box 
            d="flex" flexDir="column" justifyContent="flex-end" p={3} bg="#E8E8E8" w="100%" h="100%"   
             borderRadius="lg" overflowY="hidden"
        > 
      {Loading?(
        <Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto"/>
      ):(
        <div className='flex flex-col overflow-y-scroll'>
            <ScrollableChat Messages={Messages}/>
        </div>

      )}
    
        </Box>
        <FormControl onKeyDown={sendMessage} isRequired mt={3}>
            {IsTyping?<div>Typing....</div>:<></>}
        <Input variant="fliied" bg="#E0E0E0" placeholder="Enter a message" value={newMessage} onChange={typingHandler}/>

      </FormControl>
        </>
    ):(
        <div>
            <h1>Please select a chat</h1>
        </div>  
    )}
    </>
  )
}

export default SingleChat

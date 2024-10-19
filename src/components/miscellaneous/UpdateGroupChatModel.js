import { ViewIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, FormControl, IconButton, Input, Spinner, useDisclosure } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ChatState } from '../../context/ChatProvider'
import { useToast } from '@chakra-ui/react'
import UserBadgeItem from '../User Avatar/UserBadgeItem'
import UserListItem from '../User Avatar/UserListItem'

const UpdateGroupChatModel = ({FetchAgain,setFetchAgain,fetchMessages}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {SelectedChat,setSelectedChat,User} = ChatState();
    const [groupChatName, setgroupChatName] = useState()
    const [Search, setSearch] = useState("")
    const [SearchResult, setSearchResult] = useState([])
    const [Loading, setLoading] = useState(false)
    const [RenameLoading, setRenameLoading] = useState(false)
    const toast = useToast()
    // useEffect(() => {
    //     setFetchAgain(!FetchAgain);
    //   }, [SelectedChat]); 
    async function handelRemove(user){
        if(SelectedChat.groupAdmin._id !== User._id && user._id !== User._id){
            toast({
                title:"Only admins can remove someone!",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom"
            })
            return;
        }
        try {
            setLoading(true)
            const res = await fetch(`https://lsserver-2.onrender.com/api/chat/groupremove`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${User.token}`
                },
                body:JSON.stringify({
                    chatId:SelectedChat._id,
                    userId:user._id
                })
            })
            const data = await res.json()
            // console.log(data)
            setLoading(false)
            user._id === User._id ? setSelectedChat() : setSelectedChat(data)
            setFetchAgain(!FetchAgain)
            fetchMessages();
        } catch (error) {
            toast({
                title:"Error Occured!",
                description:"Failed to Remove the User",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom"
            })
        }             
    }
   async function handelRename(){
    if(!groupChatName) return
     try {
        setRenameLoading(true)
        const res = await fetch(`https://lsserver-2.onrender.com/api/chat/rename`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${User.token}`
            },
            body:JSON.stringify({
                chatId:SelectedChat._id,
                chatName:groupChatName
            })
        })
        const data = await res.json()
          setSelectedChat(data);
          setFetchAgain(!FetchAgain);
          setRenameLoading(false);
     } catch (error) {
        console.log(error)
         toast({
             title:"Error Occured!",
             description:"Failed to Rename",
             status:"error",
             duration:5000,
             isClosable:true,
             position:"bottom"
         })
         setRenameLoading(false);
     }
     setgroupChatName(" ")
    }
    async function handelSearch(query){
        setSearch(query)
        if(!query){
            return;
        }
        try {
            setLoading(true)
            const res = await fetch(`https://lsserver-2.onrender.com/api/chatusers?search=${Search}`,{
                method:"GET",
                headers:{
                    Authorization:`Bearer ${User.token}`
                }
            })
            const data = await res.json()
            setLoading(false)

            setSearchResult(data)
        } catch (error) {
             toast({
                 title:"Error Occured!",
                 description:"Failed to Load the Search Results",
                 status:"error",
                 duration:5000,
                 isClosable:true,
                 position:"bottom-left"
             })
        }
    }
    async function handelAddUser(user){
        if(SelectedChat.users.find((u)=>u._id === user._id)){
            toast({
                title:"User Already in group!",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom"
            })
            return;
        }
        if(SelectedChat.groupAdmin._id !== User._id){
            toast({
                title:"Only admins can add someone!",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom"
            })
            return;
        }
        try {
            setLoading(true)
            const res = await fetch(`https://lsserver-2.onrender.com/api/chat/groupadd`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${User.token}`
                },
                body:JSON.stringify({
                    chatId:SelectedChat._id,
                    userId:user._id
                })
            })
            const data = await res.json()
            // console.log(data)
            setLoading(false)
            setSelectedChat(data)
            setFetchAgain(!FetchAgain)
        } catch (error) {
            console.log(error)
            toast({
                title:"Error Occured!",
                description:"Failed to add user",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom"
            })
        }
    }
    return (
        <>
          <Avatar name={SelectedChat.chatName}  onClick={onOpen}/>
    
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader></ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {SelectedChat?.users?.length >0 && (
                    
                        <Box>
                        {SelectedChat.users.map((u)=>(
                          <UserBadgeItem
                           key={u._id}
                           user={u}
                           handelFunction={()=> handelRemove(u)}
                          />
        
                        )
                        )}
                        </Box>
                )}
                <FormControl>
                     <Input 
                      placeholder='Chat Name' 
                      mb={3}  
                      value={groupChatName || " "}
                      onChange={(e)=>setgroupChatName(e.target.value)}
                     />
                     <Button
                      variant='solid' colorScheme='teal' ml={1}
                      isLoading={RenameLoading}
                      onClick={handelRename}
                     >
                     Update
                     </Button>
                </FormControl>
                <FormControl>
                    <Input placeholder='Add User to group' mb={1}  onChange={(e)=>handelSearch(e.target.value)}/>
                    <Button variant='solid' colorScheme='teal' ml={1} isLoading={Loading} onClick={()=>{}}>
                        Add User
                    </Button>
                </FormControl>
                 {Loading?(<Spinner size="lg" />):(
                    SearchResult?.slice(0,4).map(user=>{
                        return <UserListItem key={user._id} user={user} handleFunction={()=>{handelAddUser(user)}}/>
                    })
                 )}
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='red' onClick={(e)=> handelRemove(User)}>
                  Leave group
                </Button>
              </ModalFooter>

            </ModalContent>
          </Modal>
        </>
      )
    }


export default UpdateGroupChatModel

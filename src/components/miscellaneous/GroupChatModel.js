import { Box, Button, FormControl, useDisclosure } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { ChatState } from '../../context/ChatProvider'
import UserListItem from '../User Avatar/UserListItem'
import UserBadgeItem from '../User Avatar/UserBadgeItem'


const GroupChatModel = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [GroupChatName, setGroupChatName] = useState()
    const [SelectedUsers, setSelectedUsers] = useState([])
    const [Search, setSearch] = useState("")
    const [SearchResult, setSearchResult] = useState([])
    const [Loading, setLoading] = useState(false)
    const toast = useToast();
   const {User,Chats,setChats }= ChatState()
    async function handelSearch(query){
      setSearch(query)
      if(!query){
        return;
      }
      try{
        setLoading(true)
        const res = await fetch(`https://lsserver-2.onrender.com/api/chatusers?search=${Search}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${User.token}`
            }
          });
               const data = await res.json()
               setLoading(false)
               setSearchResult(data)
      }catch(error){
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
    
    async function handelSubmit(){
          if(!GroupChatName || !SelectedUsers){
            toast({
              title:"Please fill all the feilds",
              status:"warning",
              duration:5000,
              isClosable:true,
              position:"top"
            })
            return;
          }
          try{
            const res = await fetch(`https://lsserver-2.onrender.com/api/chat/group`, {
              method: 'POST',
              headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${User.token}`
              },
              body: JSON.stringify({
                name: GroupChatName,
                users: JSON.stringify(SelectedUsers.map((u)=>u._id))
              })
            });
            const data = await res.json()
            setChats([data, ...Chats])
            onClose()
            toast({
              title:"New Group Chat Created!",
              status:"success",
              duration:5000,
              isClosable:true,
              position:"bottom"
            })
          }catch(error){
            toast({
              title:"Failed to Create the Chat!",
              description:error.message,
              status:"error",
              duration:5000,
              isClosable:true,
              position:"bottom"
            })
          }
          }
    
    function handelDelete(userTodel){
         setSelectedUsers(SelectedUsers.filter((sel)=>sel._id !== userTodel._id))
    }
    function handelGroup(userToAdd){
        // console.log(userToAdd)
      if(SelectedUsers.includes(userToAdd)){
        toast({
          title:"User already added",
          status:"warning",
          duration:5000,
          isClosable:true,
          position:"top"
        })
        return;
      }
      setSelectedUsers([...SelectedUsers,userToAdd])
    }
    return (
        <>
          <span onClick={onOpen}>{children}</span>
    
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create a New Group</ModalHeader>
              <ModalCloseButton />
              <ModalBody d='flex' flexDir='column' alignItems='center' >
                 <FormControl>
                    <input type="text" placeholder='Group Name' onChange={(e)=>setGroupChatName(e.target.value)}/>
                 </FormControl>
                 <FormControl>
                    <input type="text" placeholder='Add Users' onChange={(e)=>handelSearch(e.target.value)}/>
                 </FormControl>
               
                {/* {SelectedUsers?.length>0}
                   {SelectedUsers.map((u)=>(
                   ))}     */}
                   {SelectedUsers?.length > 0 && (
                    
  <Box display="flex" flexWrap='wrap' w="100%">
    {SelectedUsers.slice(0, 4).map((u) => (
        <UserBadgeItem key={u._id} user={u} handelFunction={()=>handelDelete(u)}/>
    ))}
  </Box>
)}

                                  
                 {Loading?<div>Loading...</div>:(
                    SearchResult?.slice(0,4).map(user=>{
                        return <UserListItem key={user._id} user={user} handleFunction={()=>{handelGroup(user)}}/>
                    })
                 )}
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={handelSubmit}>
                  Create Group
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
    }


export default GroupChatModel

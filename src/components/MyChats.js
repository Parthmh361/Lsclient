import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text, Button, useToast, Avatar } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ChatState } from '../context/ChatProvider';
import ChatLoading from './ChatLoading';
import { getSender } from '../Config/ChatLogics';
import GroupChatModel from './miscellaneous/GroupChatModel';

const MyChats = ({ FetchAgain }) => {
  const { User, SelectedChat, setSelectedChat, Chats, setChats } = ChatState();
  const [LoggedUser, setLoggedUser] = useState();
  const toast = useToast();

  const fetchChats = async (token) => {
    try {
      const res = await fetch('http://localhost:5000/api/chat/fetchchat', {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left"
      });
    }
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("User"));
    setLoggedUser(userInfo);
    fetchChats(userInfo.token);
  }, [FetchAgain]);

  return (
    <Box
      display={{ base: SelectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={4}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      boxShadow="md"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "24px", md: "28px" }}
        fontFamily="Work sans"
        w="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderBottom="1px solid #e2e8f0"
      >
        <Text fontWeight="bold">My Chats</Text>
        <GroupChatModel>
          <Button
            display="flex"
            fontSize={{ base: "14px", md: "16px" }}
            rightIcon={<AddIcon />}
            colorScheme="teal"
            variant="solid"
          >
            New Group Chat
          </Button>
        </GroupChatModel>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {Chats ? (
          <Stack overflowY="scroll">
            {Chats.map((chat) => (
              <Box
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                bg={SelectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={SelectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                cursor="pointer"
                _hover={{ bg: "#d3d3d3" }}
                transition="background 0.3s"
              >
                <Box display='flex' alignItems='center'>
                <Avatar mr={4} size='sm' name={!chat.isGroupChat
                    ? getSender(LoggedUser, chat.users)
                    : chat.chatName}/>
                <Text fontSize={{ base: "14px", md: "16px" }} fontWeight="semibold">
                  
                  {!chat.isGroupChat
                    ? getSender(LoggedUser, chat.users)
                    : chat.chatName}
                </Text>
                </Box>
                
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
}

export default MyChats;

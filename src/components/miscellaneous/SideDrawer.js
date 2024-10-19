import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useToast,
  Spinner,
  Avatar,
  Box,
  Tooltip,
  Text,
  Input,
  Button,
  Flex,
  Badge,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import ProfileModel from './ProfileModel';
import ChatLoading from '../ChatLoading';
import UserListItem from '../User Avatar/UserListItem';
import { BellIcon, ChevronDownIcon, Search2Icon, SearchIcon } from '@chakra-ui/icons';

const SideDrawer = () => {
  const { User, setSelectedChat, Chats, setChats, Notification, setNotification } = ChatState();
  const [Search, setSearch] = useState('');
  const [SearchResult, setSearchResult] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [LoadingChat, setLoadingChat] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const logOutHandler = () => {
    localStorage.removeItem('User');
    navigate('/login');
  };

  const handleSearch = async () => {
    if (!Search) {
      toast({
        title: 'Please Enter something in search',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-left',
      });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`https://lsserver-2.onrender.com/api/chatusers?search=${Search}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${User.token}`,
        },
      });
      const data = await res.json();
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: 'Error Occurred!',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const res = await fetch(`https://lsserver-2.onrender.com/api/chat/accesschat`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${User.token}`,
        },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (!Chats.find((c) => c._id === data._id)) {
        setChats([data, ...Chats]);
      }
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: 'Error Occurred!',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        bg="white"
        w="100%"
        p="5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search user to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <Flex align="center">
              <SearchIcon h="24px" w="24px" color="black" />
              <Text display={{ base: 'none', md: 'flex' }} ml="2">
                Search User
              </Text>
            </Flex>
          </Button>
        </Tooltip>
        
        <Flex align="center">
          <Menu>
            <MenuButton p={1}>
            <Badge
                      colorScheme="red"
                      variant="solid"
                      borderRadius="full"
                      position="absolute"

                      fontSize="0.6em"
                    >
                      {Notification.length}
                      
                    </Badge>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList>
              {!Notification.length && 'No New Messages'}
              {Notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(Notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${notif.sender.username} : ${notif.content}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          {/* <Menu>
            <MenuButton p={1}>
              <Avatar size="sm" cursor="pointer" name={User?.name || 'User Name'} />
              <ChevronDownIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList>
              <ProfileModel user={User}>
                <MenuItem>Profile</MenuItem>
              </ProfileModel>
              <MenuDivider />
              <MenuItem onClick={logOutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu> */}
        </Flex>
      </Flex>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Flex pb={2}>
              <Input
                placeholder="Search by name or email"
                value={Search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button ml={2} onClick={handleSearch}>
                Go
              </Button>
            </Flex>
            {Loading ? (
              <ChatLoading />
            ) : (
              SearchResult?.map((user) => (
                <UserListItem key={user._id} user={user} handleFunction={() => accessChat(user._id)} />
              ))
            )}
            {LoadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;

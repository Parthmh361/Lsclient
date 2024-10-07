import React, { useEffect } from 'react';
import gsap from 'gsap';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Avatar,
  Link,
  useColorModeValue,
  useDisclosure,
  Badge,
  Center,
  Stack,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { FiHome, FiUsers, FiBriefcase, FiMessageSquare, FiBell } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { ChevronDownIcon } from '@chakra-ui/icons';
import ProfileModel from './miscellaneous/ProfileModel';
import { ChatState } from '../context/ChatProvider';

export default function Navbar() {
  const userInfo = localStorage.getItem('User');
  const {User} = ChatState();
  const navigate = useNavigate();
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  
  useEffect(() => {
   
    gsap.fromTo(
      ".navbar",
      { y: -100, opacity: 0 },
      { duration: 1, y: 0, opacity: 1, ease: "power2.out" }
    );

    // Animate navbar links
    gsap.fromTo(
      ".navbar-link",
      { y: -20, opacity: 0 },
      { duration: 1, y: 0, opacity: 1, stagger: 0.2 }
    );
  }, []);
function logOutHandler(){
   localStorage.removeItem('User');
}
  return (
    <Box bg="linear-gradient(90deg, #093E40, #092c35)" px={4} boxShadow="sm">
      <Flex className="navbar" h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={8} alignItems={'center'}>
          <Box display="flex" alignItems="center" position="relative">
            <Text fontSize="xl" fontWeight="bold" color={useColorModeValue('gray.100', 'white')}>
              Legal Sahayogi
            </Text>
          </Box>
        </HStack>

        <HStack spacing={8} alignItems={'center'} display={{ base: 'none', md: 'flex' }}>
          <Link href="#" className="navbar-link" _hover={{ textDecoration: 'none' }}>
            <Center flexDirection="column" color={useColorModeValue('gray.100', 'white')}>
              <FiHome />
              <Text fontSize="sm">Home</Text>
            </Center>
          </Link>
          <Link href="#" className="navbar-link" _hover={{ textDecoration: 'none' }}>
            <Center flexDirection="column" color={useColorModeValue('gray.100', 'white')}>
              <FiUsers />
              <Text fontSize="sm">About Us</Text>
            </Center>
          </Link>
          <Link href="#" className="navbar-link" _hover={{ textDecoration: 'none' }}>
            <Center flexDirection="column" color={useColorModeValue('gray.100', 'white')}>
              <FiBriefcase />
              <Text fontSize="sm">Services</Text>
            </Center>
          </Link>
          <Link onClick={() => navigate('/chatsection')} className="navbar-link" _hover={{ textDecoration: 'none' }}>
            <Center flexDirection="column" color={useColorModeValue('gray.100', 'white')}>
              <FiMessageSquare />
              <Text fontSize="sm">Contact Us</Text>
            </Center>
          </Link>
          <Link href="#" className="navbar-link" _hover={{ textDecoration: 'none' }}>
            <Center flexDirection="column" position="relative" color={useColorModeValue('gray.100', 'white')}>
              <FiBell />
              <Badge
                colorScheme="red"
                variant="solid"
                borderRadius="full"
                position="absolute"
                top="0"
                right="-1"
                fontSize="0.6em"
              >
                1
              </Badge>
              <Text fontSize="sm">News</Text>
            </Center>
          </Link>
          <Flex alignItems={'center'}>
            {/* <Avatar size={'sm'} name={userInfo.name} />
            <Text ml={2}></Text> */}
            <Menu>
            {User?.name?(
                <Flex alignItems={'center'} mb={4} p={4}>
                  <Avatar name={User?.name} size={'sm'} />
                  
                </Flex>
              ):(
                
                <Button
                 size="md"
                 bg="teal.500"
                 color="white"
                 
                 _hover={{ bg: 'teal.400' }}
                 onClick={() => navigate('/two')}
                >SignIn</Button>
              
              )}
            <MenuList>
              <ProfileModel user={userInfo}>
                <MenuItem>Profile</MenuItem>
              </ProfileModel>
              {/* <MenuDivider /> */}
              <MenuItem onClick={logOutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
          </Flex>
        </HStack>

        <HStack spacing={2} alignItems={'center'} display={{ base: 'flex', md: 'none' }}>
          <IconButton
            bg='#092c35'
            size={'md'}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white">
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
              </svg>
            }
            aria-label={'Open Menu'}
            onClick={onDrawerOpen}
          />
        </HStack>
      </Flex>

      <Drawer isOpen={isDrawerOpen} placement="left" onClose={onDrawerClose}>
        <DrawerOverlay />
        <DrawerContent bg="linear-gradient(90deg, #093E40, #092c35)">
          <DrawerBody>
            <Flex flexDirection="column" justifyContent="space-between" height="100%">
              <Stack spacing={4} mt={8} p={4}>
                <Link href="#" onClick={onDrawerClose} _hover={{ textDecoration: 'none' }}>
                  <Center flexDirection="row" justifyContent="flex-start" w="full" color={useColorModeValue('gray.100', 'white')}>
                    <FiHome size={24} />
                    <Text ml={3}>Home</Text>
                  </Center>
                </Link>
                <Link href="#" onClick={onDrawerClose} _hover={{ textDecoration: 'none' }}>
                  <Center flexDirection="row" justifyContent="flex-start" w="full" color={useColorModeValue('gray.100', 'white')}>
                    <FiUsers size={24} />
                    <Text ml={3}>About Us</Text>
                  </Center>
                </Link>
                <Link href="#" onClick={onDrawerClose} _hover={{ textDecoration: 'none' }}>
                  <Center flexDirection="row" justifyContent="flex-start" w="full" color={useColorModeValue('gray.100', 'white')}>
                    <FiBriefcase size={24} />
                    <Text ml={3}>Services</Text>
                  </Center>
                </Link>
                <Link
                  onClick={() => {
                    navigate('/chatsection');
                    onDrawerClose();
                  }}
                  _hover={{ textDecoration: 'none' }}
                >
                  <Center flexDirection="row" justifyContent="flex-start" w="full" color={useColorModeValue('gray.100', 'white')}>
                    <FiMessageSquare size={24} />
                    <Text ml={3}>Contact Us</Text>
                  </Center>
                </Link>
                <Link href="#" onClick={onDrawerClose} _hover={{ textDecoration: 'none' }}>
                  <Center flexDirection="row" justifyContent="flex-start" w="full" position="relative" color={useColorModeValue('gray.100', 'white')}>
                    <FiBell size={24} />
                    <Badge
                      colorScheme="red"
                      variant="solid"
                      borderRadius="full"
                      position="absolute"
                      top="0"
                      right="0"
                      fontSize="0.6em"
                    >
                      1
                    </Badge>
                    <Text ml={3}>News</Text>
                  </Center>
                </Link>
              </Stack>
              {User?.name?(
                <Flex alignItems={'center'} mb={4} p={4}>
                  <Avatar name={User?.name} size={'sm'} />
                  <Text ml={3} >
                    {User?.name}
                  </Text>
                </Flex>
              ):(
                <></>
              )}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

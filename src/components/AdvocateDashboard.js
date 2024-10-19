import React, { useEffect } from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  SimpleGrid,
  Button,
  IconButton,
  Avatar,
  Text,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiUserPlus, FiFilePlus, FiCalendar, FiDollarSign, FiUsers, FiMessageSquare, FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../context/ChatProvider';

const AdvocateDashboard = () => {
  const {User} = ChatState()
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  async function verify(){
    try{
        const userInfo = JSON.parse(localStorage.getItem("User"));
        const token = userInfo.token;
        const res = await fetch("https://lsserver-2.onrender.com/api/advocateauth", {
           method: "GET",
           headers: {
             Authorization: `Bearer ${token}`
           }
         });
         
         if (!res.ok){
        navigate('/AdvocateSignIn')
         }
       
    }catch(err){
        navigate('/AdvocateSignIn')
    }
  
}
useEffect(() => {
  verify();
}, [])
  return (
    <>
      <Box bg={bgColor} minH="100vh" py={10} px={6}>
        <VStack spacing={10} align="stretch">
          <HStack justify="space-between">
            <Heading color={textColor}>Advocate Dashboard</Heading>
            <Avatar name={User?.name} size="lg" />
          </HStack>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            <Box bg={cardBgColor} p={6} rounded="md" boxShadow="md">
              <VStack spacing={4}>
                <IconButton
                  icon={<FiUserPlus />}
                  aria-label="Add Client"
                  isRound
                  size="lg"
                  colorScheme="teal"
                />
                <Heading size="md" color={textColor}>Add Client</Heading>
                <Text color={textColor}>
                  Register new clients and manage their profiles and case history.
                </Text>
                <Button colorScheme="teal" variant="outline" onClick={()=>{
                  navigate('/addclient')
                }}>Add Client</Button>
              </VStack>
            </Box>

            <Box bg={cardBgColor} p={6} rounded="md" boxShadow="md">
              <VStack spacing={4}>
                <IconButton
                  icon={<FiFilePlus />}
                  aria-label="Add Case"
                  isRound
                  size="lg"
                  colorScheme="blue"
                />
                <Heading size="md" color={textColor}>Add Case</Heading>
                <Text color={textColor}>
                  Create and manage new cases, track case progress and updates.
                </Text>
                <Button colorScheme="blue" variant="outline" onClick={()=>{
                  navigate('/addcase')
                }}>Add Case</Button>
              </VStack>
            </Box>

            <Box bg={cardBgColor} p={6} rounded="md" boxShadow="md">
              <VStack spacing={4}>
                <IconButton
                  icon={<FiCalendar />}
                  aria-label="Schedule"
                  isRound
                  size="lg"
                  colorScheme="purple"
                />
                <Heading size="md" color={textColor}>Schedule</Heading>
                <Text color={textColor}>
                  Schedule and manage your appointments, court dates, and meetings.
                </Text>
                <Button colorScheme="purple" variant="outline" onClick={()=>{
                  navigate('/advocatediary')
                }}>Manage Schedule</Button>
              </VStack>
            </Box>

            <Box bg={cardBgColor} p={6} rounded="md" boxShadow="md">
              <VStack spacing={4}>
                <IconButton
                  icon={<FiSearch />}
                  aria-label="AI Model"
                  isRound
                  size="lg"
                  colorScheme="green"
                />
                <Heading size="md" color={textColor}>Try Ai</Heading>
                <Text color={textColor}>
                  Create Documents, Get Document review , Legal Research , Legal Advice.
                </Text>
                <Button onClick={()=>{
                  navigate('/ai')}}
                colorScheme="green" variant="outline">Try New Ai</Button>
              </VStack>
            </Box>

            <Box bg={cardBgColor} p={6} rounded="md" boxShadow="md">
              <VStack spacing={4}>
                <IconButton
                  icon={<FiUsers />}
                  aria-label="Manage Clients"
                  isRound
                  size="lg"
                  colorScheme="red"
                />
                <Heading  size="md" color={textColor}>Manage Clients</Heading>
                <Text color={textColor}>
                  Manage your clients and their details efficiently.
                </Text>
                <Button onClick={()=>{
                  navigate('/manageclients')
                }} colorScheme="red" variant="outline">Manage Clients</Button>
              </VStack>
            </Box>

            <Box bg={cardBgColor} p={6} rounded="md" boxShadow="md">
              <VStack spacing={4}>
                <IconButton
                  icon={<FiMessageSquare />}
                  aria-label="Start a Conversation"
                  isRound
                  size="lg"
                  colorScheme="teal"
                />
                <Heading size="md" color={textColor}>Start a Conversation</Heading>
                <Text color={textColor}>
                  Reach out to fellow advocates.
                </Text>
                <Button colorScheme="teal" variant="outline" onClick={()=>{
                  navigate('/chat')
                }}>My Chats</Button>
              </VStack>
            </Box>
          </SimpleGrid>

          <Box bg={cardBgColor} p={6} rounded="md" boxShadow="md">
            <Heading size="md" color={textColor}>Case Updates</Heading>
            <Divider my={4} />
            <Text color={textColor}>
              Keep track of the latest updates on your ongoing cases.
            </Text>
            <Button mt={4} colorScheme="blue" variant="outline">View Case Updates</Button>
          </Box>
        </VStack>
      </Box>
      <Button onClick={() => {
        localStorage.removeItem('User');
      }}>
        Logout
      </Button>
    </>
  );
};

export default AdvocateDashboard;

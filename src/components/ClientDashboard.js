import React from 'react';
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
import { FiSearch, FiFileText, FiBell, FiDollarSign, FiCalendar, FiMessageSquare } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../context/ChatProvider';

const ClientDashboard = () => {
  const {User} = ChatState();
  const navigate = useNavigate();
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBgColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('black', 'white');
  const buttonBgColor = useColorModeValue('teal.500', 'teal.600');
  const buttonHoverColor = useColorModeValue('teal.400', 'teal.500');



  return (
    <Box bg={bgColor} minH="100vh" py={10} px={6}>
      <VStack spacing={10} align="stretch">
        <HStack justify="space-between">
          <Heading color={textColor}>Client Dashboard</Heading>
          <Avatar name={User?.name} size="lg" />
        </HStack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          <Box bg={cardBgColor} p={6} rounded="md" boxShadow="md">
            <VStack spacing={4}>
              <IconButton
                icon={<FiSearch />}
                aria-label="Search Advocate"
                isRound
                size="lg"
                colorScheme="teal"
              />
              <Heading size="md" color={textColor}>Find an Advocate</Heading>
              <Text color={textColor}>
                Search and connect with advocates based on your needs.
              </Text>
              <Button onClick={()=>{
                navigate('/findadvocate')
              }} bg={buttonBgColor} color="white" _hover={{ bg: buttonHoverColor }} variant="solid">
                Search Advocates
              </Button>
            </VStack>
          </Box>

          <Box bg={cardBgColor} p={6} rounded="md" boxShadow="md">
            <VStack spacing={4}>
              <IconButton
                icon={<FiFileText />}
                aria-label="View Cases"
                isRound
                size="lg"
                colorScheme="blue"
              />
              <Heading size="md" color={textColor}>Your Cases</Heading>
              <Text color={textColor}>
                View details and updates of your ongoing and past cases.
              </Text>
              <Button bg={buttonBgColor} color="white" _hover={{ bg: buttonHoverColor }} variant="solid">
                View Cases
              </Button>
            </VStack>
          </Box>

          <Box bg={cardBgColor} p={6} rounded="md" boxShadow="md">
            <VStack spacing={4}>
              <IconButton
                icon={<FiBell />}
                aria-label="Notifications"
                isRound
                size="lg"
                colorScheme="red"
              />
              <Heading size="md" color={textColor}>Notifications</Heading>
              <Text color={textColor}>
                Stay updated with the latest notifications and case updates.
              </Text>
              <Button bg={buttonBgColor} color="white" _hover={{ bg: buttonHoverColor }} variant="solid">
                View Notifications
              </Button>
            </VStack>
          </Box>

          <Box bg={cardBgColor} p={6} rounded="md" boxShadow="md">
            <VStack spacing={4}>
              <IconButton
                icon={<FiDollarSign />}
                aria-label="Payments"
                isRound
                size="lg"
                colorScheme="green"
              />
              <Heading size="md" color={textColor}>Payments</Heading>
              <Text color={textColor}>
                Track your payments and manage your billing information.
              </Text>
              <Button bg={buttonBgColor} color="white" _hover={{ bg: buttonHoverColor }} variant="solid">
                View Payments
              </Button>
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
              <Heading size="md" color={textColor}>Dates</Heading>
              <Text color={textColor}>
                View and manage your appointments and meetings.
              </Text>
              <Button bg={buttonBgColor} color="white" _hover={{ bg: buttonHoverColor }} variant="solid">
                Manage Schedule
              </Button>
            </VStack>
          </Box>

          <Box bg={cardBgColor} p={6} rounded="md" boxShadow="md">
            <VStack spacing={4}>
              <IconButton
                icon={<FiMessageSquare />}
                aria-label="Contact Advocate"
                isRound
                size="lg"
                colorScheme="orange"
              />
              <Heading size="md" color={textColor}>Contact Advocate</Heading>
              <Text color={textColor}>
                Get in touch with your advocate for consultations.
              </Text>
              <Button bg={buttonBgColor} color="white" _hover={{ bg: buttonHoverColor }} variant="solid">
                Contact Advocate
              </Button>
            </VStack>
          </Box>
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default ClientDashboard;

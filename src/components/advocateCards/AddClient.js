import React, { useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChatState } from '../../context/ChatProvider';
const AddClient = () => {
  const {User} = ChatState();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const toast = useToast();
  const cardBgColor = useColorModeValue('white', 'gray.700');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const X = {
        id: User._id,
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }
      // Replace with your actual API endpoint
      const res = await fetch("https://lsserver-2.onrender.com/api/addclient", {
        method: "POST",
        headers: {
          'Content-type': 'application/json',
          "Authorization": `Bearer ${User.token}`,
        },
        body: JSON.stringify(X),
      });
      if (res.ok) {
        toast({
          title: "Client added.",
          description: "The client has been successfully added.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setFormData({
          name: '',
          email: '',
          password:"",
        });
      } else {
        toast({
          title: "An error occurred.",
          description: "Unable to add client.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error adding client:", error);
      toast({
        title: "An error occurred.",
        description: "Unable to add client.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg={cardBgColor} p={6} rounded="md" boxShadow="md">
      <Heading size="md" mb={4}>Add Client</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter client's name"
            />
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter client's email"
            />
          </FormControl>

          <FormControl id="password">
            <FormLabel>Set a password for client</FormLabel>
            <Input
              type="password"
              name="password"
            
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password for client"
            />
          </FormControl>

          
          <Button
            type="submit"
            colorScheme="teal"
            width="full"
            mt={4}
          >
            Add Client
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddClient;

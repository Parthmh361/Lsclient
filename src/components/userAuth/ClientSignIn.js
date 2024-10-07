import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ClientSignIn = () => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const toast = useToast();

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
      const res = await fetch("http://localhost:5000/api/clientsignin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('User',JSON.stringify(data.user))
    
      toast ({
        title: "Login successful.",
        description: "Welcome back!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate('/client')
      }
      else{
        toast({
          title: "Login failed.",
          description: "Please check your credentials and try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      
    } catch (error) {
      console.error('Login error:', error);     
      toast({
        title: "Login failed.",
        description: "Please check your credentials and try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setFormData({
      email: '',
      password: '',
    });
  };

  return (
    <Box
    className="background"
    position="relative"
    width="100vw"
    minHeight="100vh"
    display="flex"
    alignItems="center"
    justifyContent="center"
    bgGradient="linear(to-r, #093239, #1A5276)"
    _before={{
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backdropFilter: "blur(10px)",
      zIndex: -1,
    }}
    >
      <Box
        bg="white"
        p={8}
        boxShadow="lg"
        rounded="lg"
        width="400px"
      >
        <Heading as="h1" mb={6} size="lg" textAlign="center">
          Client Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="teal"
              width="full"
            >
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default ClientSignIn;

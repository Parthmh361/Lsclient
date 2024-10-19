import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation

const AdvocateSignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  async function handleSubmit(e){
    e.preventDefault();
    try {
        const res = await fetch("https://lsserver-2.onrender.com/api/advocatesignin", {
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
        navigate('/advocate')
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
   
  };
}

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
        p={6}
        rounded="md"
        boxShadow="lg"
        maxW={{ base: "90%", md: "75%", lg: "50%" }}
        w="100%"
        mx="auto"
        className="form-container"
      >
        <Heading mb={6} textAlign="center" color="#093239">
          Advocate Sign In
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                bg="gray.100"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                bg="gray.100"
              />
            </FormControl>

            <Button type="submit" colorScheme="blue" variant="solid" width="full">
              Sign In
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default AdvocateSignIn;
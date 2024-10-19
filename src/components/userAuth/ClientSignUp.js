import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Heading,
  useToast
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import PasswordValidator from 'password-validator';
import { useNavigate } from 'react-router-dom';

const schema = new PasswordValidator();
schema
  .is().min(8)                                    // Minimum length 8
  .is().max(100)                                  // Maximum length 100
  .has().uppercase()                              // Must have uppercase letters
  .has().lowercase()                              // Must have lowercase letters
  .has().digits()                                 // Must have digits
  .has().not().spaces();                          // Should not have spaces

const ClientSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const toast = useToast();

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // Validate password
    if (!schema.validate(formData.password)) {
      toast({
        title: 'Invalid Password',
        description: 'Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a digit, and should not contain spaces.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    // If password is valid, continue with form submission
    try {
      const res = await fetch("https://lsserver-2.onrender.com/api/createclient", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate('/ClientSignIn')
      } else {
        toast({
          title: "An error occurred.",
          description: "Unable to create account.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }

    } catch (error) {
      console.error('Error creating account:', error);
      toast({
        title: "An error occurred.",
        description: "Unable to create account.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    // Reset form data after submission
    setFormData({
      name: '',
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
        content: '""', // Ensure content is a string
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
          Client Signup Form
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel> Full Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>
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
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <InputRightElement>
                  <Button size="sm" onClick={handleShowClick}>
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              type="submit"
              colorScheme="teal"
              width="full"
            >
              Sign Up
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default ClientSignUp;

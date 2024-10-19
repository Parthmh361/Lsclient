import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Textarea,
  Select,
  useToast,
  SimpleGrid,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
} from '@chakra-ui/react';
import gsap from 'gsap';
import passwordValidator from 'password-validator';
import { useNavigate } from 'react-router-dom';

const AdvocateSignUp = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    state: '',
    experience: '',
    specialization: [],
    barCouncilRegNumber: '',
    password: '',
    about: '',
  });

  const [newSpecialization, setNewSpecialization] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    gsap.from(".form-container", {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: "power3.out",
    });
  }, []);

  const schema = new passwordValidator();
  schema
    .is().min(8) // Minimum length 8
    .is().max(100) // Maximum length 100
    .has().uppercase() // Must have uppercase letters
    .has().lowercase() // Must have lowercase letters
    .has().digits() // Must have digits
    .has().not().spaces(); // Should not have spaces

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddSpecialization = () => {
    if (newSpecialization && !formData.specialization.includes(newSpecialization)) {
      setFormData((prevData) => ({
        ...prevData,
        specialization: [...prevData.specialization, newSpecialization],
      }));
      setNewSpecialization('');
    }
  };

  const handleRemoveSpecialization = (index) => {
    const newSpecializations = formData.specialization.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      specialization: newSpecializations,
    }));
  };

  const checkPasswordBreach = async (password) => {
    // Replace this with your backend API or service to check against a breached passwords database
    try {
      const res = await fetch(`https://api.pwnedpasswords.com/range/${password}`);
      if (!res.ok) {
        navigate('/AdvocateSignIn')

        // throw new Error('Failed to check password against breach database.');
      }
      const text = await res.text();
      const regex = new RegExp(`:${password.toUpperCase().slice(-35)}`);
      const found = text.match(regex);
      return found ? parseInt(found[0].split(':')[1], 10) : 0;
    } catch (error) {
      console.error('Error checking password breach:', error);
      toast({
        title: 'Error',
        description: 'Failed to check password against breach database. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return 0;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password format
    if (!schema.validate(formData.password)) {
      setPasswordError('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit.');
      return;
    }

    // // Check if the password has been breached
    // try {
    //   const count = await checkPasswordBreach(formData.password);
    //   if (count > 0) {
    //     setPasswordError('Change your password, your password was found in a security breach.');
    //     return;
    //   }
    // } catch (error) {
    //   console.error('Error checking password breach:', error);
    //   return;
    // }

    // Submit form if password is valid
    try {
      const res = await fetch("https://lsserver-2.onrender.com/api/createadvocate", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 500) {
        toast({
          title: "User already exists.",
          description: "Please try to login, account is already exists.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else if (res.ok) {
        toast({
          title: "Account created.",
          description: "Redirecting to login page.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate('/AdvocateSignIn');
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
        p={6}
        rounded="md"
        boxShadow="lg"
        maxW={{ base: "90%", md: "75%", lg: "50%" }}
        w="100%"
        mx="auto"
        className="form-container"
      >
        <Heading mb={6} textAlign="center" color="#093239">
          Advocate Signup
        </Heading>
        <form onSubmit={handleSubmit}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <FormControl isRequired>
              <FormLabel htmlFor="name">Full Name</FormLabel>
              <Input
                id="name"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                bg="gray.100"
              />
            </FormControl>

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
              <FormLabel htmlFor="phone">Phone Number</FormLabel>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
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
              {passwordError && (
                <Box mt={2} color="red.500" fontSize="sm">
                  {passwordError}
                </Box>
              )}
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="state">State</FormLabel>
              <Select
                id="state"
                name="state"
                placeholder="Select state"
                value={formData.state}
                onChange={handleChange}
                bg="gray.100"
              >
                <option value="Delhi">Delhi</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                {/* Add other states as needed */}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="experience">Years of Experience</FormLabel>
              <Input
                id="experience"
                name="experience"
                type="number"
                placeholder="Years of Experience"
                value={formData.experience}
                onChange={handleChange}
                bg="gray.100"
              />
            </FormControl>

            <FormControl >
              <FormLabel>Specializations</FormLabel>
              <HStack spacing={2} flexWrap="wrap">
                {formData.specialization.map((spec, index) => (
                  <Tag
                    key={index}
                    variant="solid"
                    colorScheme="blue"
                    borderRadius="full"
                    size="md"
                  >
                    <TagLabel>
                    {spec}</TagLabel>
                    <TagCloseButton onClick={() => handleRemoveSpecialization(index)} />
                  </Tag>
                ))}
              </HStack>
              <HStack mt={2}>
                <Input
                  id="specialization"
                  name="specialization"
                  placeholder="Add Specialization"
                  value={newSpecialization}
                  onChange={(e) => setNewSpecialization(e.target.value)}
                  bg="gray.100"
                />
                <Button
                  type="button"
                  colorScheme="blue"
                  variant="solid"
                  size="sm"
                  onClick={handleAddSpecialization}
                >
                  Add
                </Button>
              </HStack>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>About Me</FormLabel>
              <Textarea
                id="about"
                name="about"
                placeholder="Tell us about yourself"
                value={formData.about}
                onChange={handleChange}
                bg="gray.100"
              />
            </FormControl>
          </SimpleGrid>

          <FormControl isRequired mt={4}>
            <FormLabel htmlFor="address">Address</FormLabel>
            <Textarea
              id="address"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              bg="gray.100"
            />
          </FormControl>

          <Button type="submit" colorScheme="blue" variant="solid" width="full" mt={4}>
            Sign Up
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default AdvocateSignUp;

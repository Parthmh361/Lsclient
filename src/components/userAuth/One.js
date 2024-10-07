import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import {
  Box,
  Container,
  Heading,
  Button,
  VStack,
} from '@chakra-ui/react';
import bgImage from '../../images/img1.jpeg'; // Replace with your background image

const One = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { duration: 1.5, ease: 'power3.out' } });

    timeline
      .fromTo('.user-type-background', { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 1 })
      .from('.user-type-heading', { opacity: 0, y: 30, duration: 0.2 }, '-=0.2')
      .fromTo('.user-type-buttons', { opacity: 0, y: 20, stagger: 0.1, duration: 0.3 }, {opacity:1});
  }, []);

  const handleSelect = (type) => {
    if (type === 'client'){
    gsap.to('.user-type-selection', { opacity: 0, duration: 0.4, onComplete: () => navigate('/ClientSignUp') });
        navigate()
    }
    else{
        gsap.to('.user-type-selection', { opacity: 0, duration: 0.4, onComplete: () => navigate('/AdvocateSignUp') });
    }
    
  };

  return (
    <>
    <Box
      className='user-type-selection'
      position="relative"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
      textAlign="center"
    >
      {/* Blurred Background */}
      <Box
        className='user-type-background'
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        zIndex={-1}
        backgroundImage={`url(${bgImage})`}
        backgroundSize="cover"
        backgroundPosition="center"
        opacity={0} // Start with opacity 0 for animation
        filter="blur(5px)"
      />

      {/* Content */}
      <Container maxW="container.lg" zIndex={1}>
        <VStack spacing={6}>
          <Heading as="h1" size="2xl" className="user-type-heading">
            Are you an Advocate or a Client?
          </Heading>
          <VStack spacing={4} >
            <Button
            className="user-type-buttons"
            width={{lg:'200px',base:"130px"}}

              size="lg"
              bg="teal.500"
              color="white"
              _hover={{ bg: 'teal.400' }}
              onClick={() => handleSelect('advocate')}
            >
              Advocate
            </Button>
            <Button
            width={{lg:'200px',base:"130px"}}
            className="user-type-buttons"
              size="lg"
              bg="teal.500"
              color="white"
              _hover={{ bg: 'teal.400' }}
              onClick={() => handleSelect('client')}
            >
              Client
            </Button>
          </VStack>
        </VStack>
      </Container>
    </Box>
    
    </>
  );
};

export default One;

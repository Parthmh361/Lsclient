import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import img1 from '../images/img2.jpeg';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
} from '@chakra-ui/react';

const Hero = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { duration: 1.5, ease: 'power3.out' } });

    timeline
      .from('.hero-background', { opacity: 0, scale: 1.1 }) 
      .from('.hero-heading', { opacity: 0, y: 30 }, '-=1') 
      .from('.hero-text', { opacity: 0, y: 20 }, '-=1') 
      .fromTo('.hero-button', { opacity: 0, y: 20 }, { opacity: 1 }); 
  }, []);

  const userJourney = () => {
    const timeline = gsap.timeline({
      defaults: { duration: 1 },
      onComplete: () => navigate('/one') // Replace '/next-component' with your target route
    });

    timeline
      .to('.hero', { opacity: 0, backgroundColor: 'white', duration: 2 });
  };

  return (
    <Box
      className='hero'
      position="relative"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
      textAlign="center"
      bg="gray.900"
    >
      <Box
        className='hero-background'
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        bgImage={`url(${img1})`}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        opacity={0.2}
      ></Box>
      <Container maxW="container.lg">
        <VStack spacing={6}>
          <Heading as="h1" size="2xl" className="hero-heading">
            Legal Sahayogi
          </Heading>
          <Text fontSize="xl" className="hero-text">
            Get Ready to Navigate Through Legal Challenges With Confidence
          </Text>
          <Button
            size="lg"
            bg="teal.500"
            color="white"
            className="hero-button"
            _hover={{ bg: 'teal.400' }}
            onClick={userJourney}
          >
            Get Started
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default Hero;

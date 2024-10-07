import React from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Button,
  Link,
  Container,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Hero from './Hero';
import Navbar from './Navbar';



const Landing = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Navbar/>
      <Hero/>
    </>
  );
}

export default Landing;

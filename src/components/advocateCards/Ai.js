import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Input,
  useToast,
  Flex,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import Navbar from '../Navbar';
import { gsap } from 'gsap';

const Ai = () => {
  const toast = useToast();
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState("");
  const gridItemsRef = useRef([]);

  // Function to extract act name from input
  const extractActName = (input) => {
    const regex = /give me resources for "([^"]+)"/;
    const match = input.match(regex);
    return match ? match[1] : input;
  };

  // Function to fetch data from API
  const fetchData = async (searchQuery = "") => {
    const actName = extractActName(searchQuery);
    try {
      const res = await fetch(`http://localhost:5000/api/research?search=${actName}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer token`,
        },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setResult(data);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error fetching data",
        description: "There was an error fetching data.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

 
  const handleSearch = () => {
    fetchData(query);
  };

  
  const animateGridItems = () => {
    gsap.fromTo(
      gridItemsRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 }
    );
  };

  // useEffect hook to trigger animations on component mount
  useEffect(() => {
    animateGridItems();
  }, []);

  return (
    <>
      <Navbar />
      <Box p={4}>
        <Flex
          mb={4}
          alignItems="center"
          justifyContent="center"
          style={{ opacity: 0, y: -50 }}
          ref={(el) => gsap.to(el, { opacity: 1, y: 0, duration: 0.5, delay: 0.5 })}
        >
          <Input
            placeholder="Ask anything .."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            mb={2}
            mr={2}
            width="300px"
          />
          <Button onClick={handleSearch} colorScheme="teal">
            Search
          </Button>
        </Flex>

        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6} mb={8}>
          <GridItem
            ref={(el) => gridItemsRef.current.push(el)}
            style={{ opacity: 0, scale: 0.8 }}
          >
            <Box
              p={4}
              borderWidth={1}
              borderRadius="md"
              textAlign="center"
              height="150px"
              bg="white"
              boxShadow="md"
              transition="all 0.3s"
              _hover={{
                transform: 'scale(1.05)',
                boxShadow: 'xl',
              }}
            >
              <Box as="span" fontSize="2em" color="green.500" mb={2} display="block">
                ✍️
              </Box>
              <Box fontWeight="bold" mt={2}>Document Creation</Box>
              <Box>Create and manage legal documents efficiently.</Box>
            </Box>
          </GridItem>
          <GridItem
            ref={(el) => gridItemsRef.current.push(el)}
            style={{ opacity: 0, scale: 0.8 }}
          >
            <Box
              p={4}
              borderWidth={1}
              borderRadius="md"
              textAlign="center"
              height="150px"
              bg="white"
              boxShadow="md"
              transition="all 0.3s"
              _hover={{
                transform: 'scale(1.05)',
                boxShadow: 'xl',
              }}
            >
              <Box as="span" fontSize="2em" color="blue.500" mb={2} display="block">
                ⚖️
              </Box>
              <Box fontWeight="bold" mt={2}>Legal Advice</Box>
              <Box>Get professional legal advice for your queries.</Box>
            </Box>
          </GridItem>
          <GridItem
            ref={(el) => gridItemsRef.current.push(el)}
            style={{ opacity: 0, scale: 0.8 }}
          >
            <Box
              p={4}
              borderWidth={1}
              borderRadius="md"
              textAlign="center"
              height="150px"
              bg="white"
              boxShadow="md"
              transition="all 0.3s"
              _hover={{
                transform: 'scale(1.05)',
                boxShadow: 'xl',
              }}
            >
              <Box as="span" fontSize="2em" color="red.500" mb={2} display="block">
                🔍
              </Box>
              <Box fontWeight="bold" mt={2}>Smart Research</Box>
              <Box>Perform smart research on legal topics.</Box>
            </Box>
          </GridItem>
        </Grid>

        {/* Search Results Section */}
        {Array.isArray(result) && result.length > 0 ? (
          result.map((res, index) => (
            <Box
              key={index}
              color="red"
              p={4}
              borderWidth={1}
              borderRadius="md"
              mb={2}
              style={{ opacity: 0, y: 20 }}
              ref={(el) => gsap.to(el, { opacity: 1, y: 0, duration: 0.3, delay: index * 0.1 })}
            >
              <Box fontWeight="bold">{res.title}</Box>
              <a href={res.href}>{res.href}</a>
            </Box>
          ))
        ) : (
          <Box></Box>
        )}
      </Box>
    </>
  );
};

export default Ai;

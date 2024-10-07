import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';

const AdvocateDiary = () => {
  const [caseDetails, setCaseDetails] = useState({
    caseNumber: '',
    clientName: '',
    caseDescription: '',
    nextSteps: '',
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaseDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle saving the case details or any other action
    toast({
      title: 'Case Details Saved!',
      description: 'The case details have been saved successfully.',
      status: 'success',
      duration: 5000,
      isClosable: true,
      position: 'bottom',
    });
    // Reset form after submission
    setCaseDetails({
      caseNumber: '',
      clientName: '',
      caseDescription: '',
      nextSteps: '',
    });
  };

  return (
    <Box p={8}>
      <Text fontSize="2xl" mb={4}>
        Advocate Diary
      </Text>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Case Number</FormLabel>
            <Input
              type="text"
              name="caseNumber"
              value={caseDetails.caseNumber}
              onChange={handleChange}
              placeholder="Enter case number"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Client Name</FormLabel>
            <Input
              type="text"
              name="clientName"
              value={caseDetails.clientName}
              onChange={handleChange}
              placeholder="Enter client name"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Case Description</FormLabel>
            <Textarea
              name="caseDescription"
              value={caseDetails.caseDescription}
              onChange={handleChange}
              placeholder="Enter case description"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Next Steps</FormLabel>
            <Textarea
              name="nextSteps"
              value={caseDetails.nextSteps}
              onChange={handleChange}
              placeholder="Enter next steps"
            />
          </FormControl>
          <Flex justify="flex-end">
            <Button type="submit" colorScheme="blue">
              Save Case Details
            </Button>
          </Flex>
        </Stack>
      </form>
    </Box>
  );
};

export default AdvocateDiary;

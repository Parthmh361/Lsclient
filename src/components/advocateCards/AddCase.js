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
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  IconButton,
} from '@chakra-ui/react';
import { FiUpload } from 'react-icons/fi';

const AddCase = () => {
  const [formData, setFormData] = useState({
    caseNumber: '',
    caseTitle: '',
    court: '',
    caseType: '',
    caseStatus: '',
    parties: [],
    documents: [],
    notes: '',
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

  const handleAddParty = () => {
    const newParties = [...formData.parties, ''];
    setFormData({
      ...formData,
      parties: newParties,
    });
  };

  const handlePartyChange = (e, index) => {
    const updatedParties = [...formData.parties];
    updatedParties[index] = e.target.value;
    setFormData({
      ...formData,
      parties: updatedParties,
    });
  };

  const handleRemoveParty = (index) => {
    const updatedParties = formData.parties.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      parties: updatedParties,
    });
  };

  const handleAddDocument = (e) => {
    const newDocuments = [...formData.documents, e.target.files[0]];
    setFormData({
      ...formData,
      documents: newDocuments,
    });
  };

  const handleRemoveDocument = (index) => {
    const updatedDocuments = formData.documents.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      documents: updatedDocuments,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your actual API endpoint
      const res = await fetch("https://lsserver-2.onrender.com/api/addcase", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast({
          title: "Case added.",
          description: "The case has been successfully added.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setFormData({
          caseNumber: '',
          caseTitle: '',
          court: '',
          caseType: '',
          caseStatus: '',
          parties: [],
          documents: [],
          notes: '',
        });
      } else {
        toast({
          title: "An error occurred.",
          description: "Unable to add case.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error adding case:", error);
      toast({
        title: "An error occurred.",
        description: "Unable to add case.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg={cardBgColor} p={6} rounded="md" boxShadow="md">
      <Heading size="md" mb={4}>Add Case</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl id="caseNumber" isRequired>
            <FormLabel>Case Number</FormLabel>
            <Input
              type="text"
              name="caseNumber"
              value={formData.caseNumber}
              onChange={handleChange}
              placeholder="Enter case number"
            />
          </FormControl>

          <FormControl id="caseTitle" isRequired>
            <FormLabel>Case Title</FormLabel>
            <Input
              type="text"
              name="caseTitle"
              value={formData.caseTitle}
              onChange={handleChange}
              placeholder="Enter case title"
            />
          </FormControl>

          <FormControl id="court" isRequired>
            <FormLabel>Court</FormLabel>
            <Input
              type="text"
              name="court"
              value={formData.court}
              onChange={handleChange}
              placeholder="Enter court name"
            />
          </FormControl>

          <FormControl id="caseType" isRequired>
            <FormLabel>Case Type</FormLabel>
            <Input
              type="text"
              name="caseType"
              value={formData.caseType}
              onChange={handleChange}
              placeholder="Enter case type"
            />
          </FormControl>

          <FormControl id="caseStatus" isRequired>
            <FormLabel>Case Status</FormLabel>
            <Input
              type="text"
              name="caseStatus"
              value={formData.caseStatus}
              onChange={handleChange}
              placeholder="Enter case status"
            />
          </FormControl>

          <FormControl id="parties" isRequired>
            <FormLabel>Parties Involved</FormLabel>
            {formData.parties.map((party, index) => (
              <HStack key={index} spacing={2} mb={2}>
                <Input
                  type="text"
                  value={party}
                  onChange={(e) => handlePartyChange(e, index)}
                  placeholder="Enter party name"
                />
                <IconButton
                  icon={<TagCloseButton />}
                  aria-label="Remove party"
                  onClick={() => handleRemoveParty(index)}
                  size="sm"
                />
              </HStack>
            ))}
            <Button
              type="button"
              colorScheme="teal"
              variant="outline"
              size="sm"
              onClick={handleAddParty}
            >
              Add Party
            </Button>
          </FormControl>

          <FormControl id="documents" isRequired>
            <FormLabel>Documents</FormLabel>
            <VStack spacing={2} align="stretch">
              {formData.documents.map((document, index) => (
                <HStack key={index} spacing={2}>
                  <Tag size="md" variant="subtle" colorScheme="teal">
                    <TagLabel>{document.name}</TagLabel>
                    <TagCloseButton onClick={() => handleRemoveDocument(index)} />
                  </Tag>
                </HStack>
              ))}
              <Button
                as="label"
                htmlFor="upload"
                colorScheme="teal"
                variant="outline"
                size="sm"
                leftIcon={<FiUpload />}
                cursor="pointer"
              >
                Upload Document
                <Input
                  type="file"
                  id="upload"
                  accept=".pdf,.doc,.docx,.txt"
                  style={{ display: 'none' }}
                  onChange={handleAddDocument}
                />
              </Button>
            </VStack>
          </FormControl>

          <FormControl id="notes">
            <FormLabel>Notes</FormLabel>
            <Textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter any additional notes about the case"
              size="sm"
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            width="full"
            mt={4}
          >
            Add Case
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddCase;

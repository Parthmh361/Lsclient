import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Heading
} from '@chakra-ui/react';

const ManageClients = () => {
  const [clients, setClients] = useState([]);
  const toast = useToast();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/clients');
      const data = await res.json();
      setClients(data);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast({
        title: "Error fetching clients",
        description: "There was an error fetching the client list.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (clientId) => {
    // Logic for editing a client
  };

  const handleDelete = async (clientId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/clients/${clientId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        toast({
          title: "Client deleted",
          description: "The client has been deleted successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        fetchClients(); // Refresh client list
      } else {
        throw new Error('Failed to delete client');
      }
    } catch (error) {
      console.error('Error deleting client:', error);
      toast({
        title: "Error deleting client",
        description: "There was an error deleting the client.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8} bg="white" boxShadow="lg" rounded="lg">
      <Heading as="h2" size="lg" mb={6}>Manage Clients</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {clients.map(client => (
            <Tr key={client.id}>
              <Td>{client.name}</Td>
              <Td>{client.email}</Td>
              <Td>
                <Button colorScheme="teal" size="sm" mr={2} onClick={() => handleEdit(client.id)}>Edit</Button>
                <Button colorScheme="red" size="sm" onClick={() => handleDelete(client.id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ManageClients;

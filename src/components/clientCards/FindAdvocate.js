import { Box, Button, Card, CardBody, CardFooter, FormControl, Heading, IconButton, Image, Input, Select, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import Navbar from '../Navbar'
import { ChatState } from '../../context/ChatProvider';

const FindAdvocate = () => {
const {User} = ChatState()
const [search,setSearch] = useState("");
const [searchResult, setSearchResult] = useState([])
async function serchAdvocate(e){
    e.preventDefault();
    setSearch(e.target.value);
    try {
        const res = await fetch(`http://localhost:5000/api/findadvocate?search=${search}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${User.token}`,
          },
        });
        const data = await res.json();
        setSearchResult(data);
    }

    catch (error) {
        console.log(error);
    }
   
}
  return (
    <>
    <Navbar/>
    <FormControl display='flex'>
        <Input placeholder='Search Your Case type ...' onChange={(e)=>{serchAdvocate(e);}}/>
    </FormControl>
    <Box display='flex' flexDirection={{base:"column",sm:"row"}} justifyContent='center' mt={10}>
    
    {searchResult.map((adv)=>(
        <Card
        ml={4}
        width={{sm:'70%',sm:'30%'}}
        key={adv._id}
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
      >
        <Image
          objectFit='cover'
          maxW={{ base: '60%', sm: '100px' }}
          src={adv.picture}
          alt={adv.name}
        />
      
        <Stack>
          <CardBody>
            <Heading size='md'>{adv.name}</Heading>
      
            <Text py='2'>
             {adv.about}
            </Text>
          </CardBody>
      
          <CardFooter>
            <Button variant='solid' colorScheme='blue'>
              Connect
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    ))}
    </Box>

    </>
  )
}

export default FindAdvocate

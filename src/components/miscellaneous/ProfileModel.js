import { IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay ,Image,Text} from '@chakra-ui/react'
import { Button } from '@headlessui/react'
import { useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { ViewIcon } from '@chakra-ui/icons'

const ProfileModel = ({user,children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
   {
    children?<span onClick={onOpen}>{children}</span>
    :<IconButton display="flex"  bg="white" color="black" onClick={onOpen} icon={<ViewIcon />}>View Profile</IconButton>
   }
   <Button onClick={onOpen}></Button>

<Modal size="lg" isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader
       fontSize='40px'
       fontFamily='Work sans'
       display='flex'
       justifyContent='center'
    >{user?.username || "Username"}</ModalHeader>
    <ModalCloseButton />
    <ModalBody display='flex' flexDirection='column' alignItems='center' justifyContent='space-between'>
        <Image
        borderRadius='full'
        boxSize='150px'
        src={user?.picture||'pic'}
        alt= {user?.username || "Username"}
        />
        <Text
        fontSize={{base:'28px', md:'30px'}}
        fontFamily='Work sans'
        >
            Email:{user?.email || "Email"}
        </Text>
    </ModalBody>

    <ModalFooter>
      <Button colorScheme='blue' mr={3} onClick={onClose}>
        Close
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
  </>
  )
}

export default ProfileModel

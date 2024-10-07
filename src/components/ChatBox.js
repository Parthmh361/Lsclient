import React from 'react'
import { ChatState } from '../context/ChatProvider'
import { Box } from '@chakra-ui/react';
import SingleChat from './SingleChat';

const ChatBox = ({FetchAgain,setFetchAgain}) => {
 const {SelectedChat} = ChatState();
  return (
    <Box display={{base:SelectedChat? "flex":"none",md:"flex"}} alignItems="center" flexDir="column" p={3} bg="lightgray" w={{base:"100%",md:"68%"}} borderRadius="lg" borderWidth="1px" >
    <SingleChat  FetchAgain = {FetchAgain} setFetchAgain={setFetchAgain} />

    </Box>
  )
}

export default ChatBox

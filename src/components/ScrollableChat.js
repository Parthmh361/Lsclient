import React, { useEffect, useRef } from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { ChatState } from '../context/ChatProvider';
import { Avatar, Box, Tooltip } from '@chakra-ui/react';
import { isLastMessage, isSameSender } from '../Config/ChatLogics';

const ScrollableChat = ({ Messages }) => {
  const { User } = ChatState();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [Messages]);

  return (
    <Box
      maxH="80vh"
      overflowY="auto"
      p={3}
      bg="white"
      borderRadius="lg"
      boxShadow="md"
    >
      {Messages && Messages.map((m, i) => (
        <div
          className='flex'
          key={m._id}
          style={{
            justifyContent: m.sender._id === User._id ? 'flex-end' : 'flex-start',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          {(isSameSender(Messages, m, i, User._id) || isLastMessage(Messages, i, User._id)) && (
            <Tooltip label={m.sender.username} placement="bottom-start" hasArrow>
              <Avatar
                mt="7px"
                mr={1}
                size="sm"
                cursor="pointer"
                name={m.sender.name}
                src={m.sender.picture}
              />
            </Tooltip>
          )}
          <Box
            style={{
              backgroundColor: `${m.sender._id === User._id ? "#BEE3F8" : "#B9F5D0"}`,
              borderRadius: "20px",
              padding: "5px 15px",
              maxWidth: "75%",
              alignSelf: 'center',
              display: 'inline-block',
            }}
          >
            {m.content}
          </Box>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default ScrollableChat;

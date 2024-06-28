
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { AttachFile, Send } from "@mui/icons-material";
import { IconButton, Skeleton, Stack } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import FileMenu from "../components/dialogs/FileMenu";
import AppLayout from "../components/layout/AppLayout";
import MessageComponent from "../components/shared/MessageComponent";
import { InputBox } from "../components/styles/StyledComponents";
import { grayColor, orange } from "../constants/color";
import { NEW_MESSAGE } from "../constants/events";
import { useErrors, useSocketEvents } from "../hooks/hook";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import { getSocket } from "../socket";
import { useInfiniteScrollTop } from "6pp";

const Chat = ({chatId,user}) => {
  const containerRef = useRef(null);
  const socket = getSocket();
  
  const [message,setMessage]= useState("")
  const [messages,setMessages]= useState([])
  const [page,setPage]= useState(1)
  
  const chatDetails = useChatDetailsQuery({chatId,skip:!chatId});

  const oldMessagesChunk = useGetMessagesQuery({chatId,page})

  const {data:oldMessages,setData:setOldMessages} = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  )

  const errors = [
    {isError: chatDetails.isError, error: chatDetails.error},
    {isError: oldMessagesChunk.isError, error: oldMessagesChunk.error},
  ]
  
  const members = chatDetails?.data?.chat?.members;

  const submitHandler = (e)=>{
    e.preventDefault();

    if(!message.trim()) return;

    socket.emit(NEW_MESSAGE,{chatId,members,message})
    setMessage("");

  }

  const newMessagesListener = useCallback(
    (data) => {
      if (data.chatId !== chatId) return;

      setMessages((prev) => [...prev, data.message]);
    },
    [chatId]
  );
  
  const eventHandler = {
    [NEW_MESSAGE]: newMessagesListener,
  };

  useSocketEvents(socket, eventHandler);

  useErrors(errors)

  const allMessages = [...oldMessages,...messages]
  
  
  return chatDetails.isLoading ? (<Skeleton />) : (
    <>
      <Stack
        ref={containerRef}
        boxSizing={'border-box'}
        padding={'1rem'}
        spacing={'1rem'}
        bgcolor={grayColor}
        height={'90%'}
        sx={{
          overflowX:"hidden",
          overflowY:"auto",
        }}
      >

{
  allMessages.map((i)=>(
    <MessageComponent key={i._id} message={i} user={user}/>
  ))
}
      </Stack>
       
        <form style={{
          height:"10%"
        }}
        onSubmit={submitHandler}
        >
          <Stack 
          direction={'row'} 
          height={'100%'}
          padding={'1rem'}
          alignItems={'center'}
          position={'relative'}
          >
            <IconButton
            sx={{
              position:"absolute",
              left:"1.5rem",
              rotate:'30deg'
              
            }}
            >
              <AttachFile/>
            </IconButton>

              <InputBox height={'260p%'} 
              placeholder="Type Messsage Here..."
              value={message}
              onChange={(e)=> setMessage(e.target.value)}
              />
              
              <IconButton
                type="submit"
                sx={{
                  rotate : '-30deg',
                  bgcolor:orange,
                  color:"white",
                  marginLeft:"1rem",
                  padding:"0.5rem",
                  "&:hover":{
                    bgcolor:"error.dark",
                    
                  }
                }}
              >
              <Send />
            </IconButton>

          </Stack>
          <FileMenu />
        </form>
    </>
  )
}

export default AppLayout()(Chat);



/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { IconButton, Skeleton, Stack } from "@mui/material";
import AppLayout from "../components/layout/AppLayout";
import { useRef, useState } from "react";
import { grayColor, orange } from "../constants/color";
import { AttachFile, Send } from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponents";
import FileMenu from "../components/dialogs/FileMenu";
import { sampleMessage } from "../constants/sampleData";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../socket";
import { NEW_MESSAGE } from "../constants/events";
import { useChatDetailsQuery } from "../redux/api/api";

const user = {
  _id:"sdfsdfsdf",
  username:"John Doe",
}
const Chat = ({chatId}) => {
  const containerRef = useRef(null);

  const socket = getSocket();

  const chatDetails = useChatDetailsQuery({chatId,skip:!chatId});

  
  

  const [message,setMessage]= useState("")
  const members = chatDetails?.data?.chat?.members;

  const submitHandler = (e)=>{
    e.preventDefault();

    if(!message.trim()) return;

    socket.emit(NEW_MESSAGE,{chatId,members,message})
    setMessage("");

  }
  
  
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
  sampleMessage.map((i)=>(
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


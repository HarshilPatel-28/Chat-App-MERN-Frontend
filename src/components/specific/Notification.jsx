/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Avatar, Button, Dialog, DialogTitle, ListItem, Stack, Typography } from "@mui/material";
import { memo } from "react";
import { sampleNotifications } from "../../constants/sampleData";

const Notification = () => {
  
  const friendRequestHandler = ({_id,Rejectaccept})=>{
    
  }
  return (
    <Dialog open>
      <Stack p={{xs:"1rem" , sm:"2rem"}} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>
{
  sampleNotifications.length > 0 ? (
    sampleNotifications.map(({sender,_id})=><NotificationItem key={_id} sender={sender} _id={_id} handler={friendRequestHandler} />)
  ) : 
  (<Typography textAlign={'center'}>0 Notification</Typography>)
}
      </Stack>
    </Dialog>
  )
}

const NotificationItem =memo(({sender,_id,handler})=>{
  const {name,avatar}= sender;
  return (
    <ListItem>
        <Stack
            direction={'row'}
            alignItems={'center'}
            spacing={'1rem'}
            width={'100%'}
        >
            <Avatar src={avatar} />
            <Typography
                variant='body1'
                sx={{
                    flexGrow: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width:"100%",

                }}
            >{`${name} sent you a friend request`}</Typography>

            <Stack
              direction={{
                xs:"column",
                sm:"row"
              }}
            >
              <Button onClick={()=>handler({_id,accept:true})}>Accept</Button>
              <Button color="error" onClick={()=>handler({_id,accept:false})}>Reject</Button>
            </Stack>
           
        </Stack>
    </ListItem>
)
});

export default Notification
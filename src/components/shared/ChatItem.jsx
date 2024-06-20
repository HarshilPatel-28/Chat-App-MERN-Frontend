/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"
import { LinkElement } from "../styles/StyledComponents"
import { Box, Stack, Typography } from "@mui/material"
import { memo } from "react"
import AvatarCard from "./AvatarCard"


const ChatItem = ({
    avatar = [],
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handleDeleteChat
}) => {
    return (
        <LinkElement to={`/chat/${_id}`}
        sx={{
            padding:"0"
        }}
            onContextMenu={(e)=> handleDeleteChat(e,_id,groupChat)}
        >
            <div
                style={{

                    display: "flex",
                    gap: "1rem",
                    alignltems: "center",
                    padding: "1rem",
                    backgroundColor: sameSender ? "black" : "unset",
                    color: sameSender ? "white" : "unset",
                    position: "relative",

                }}
            >

                <AvatarCard avatar={avatar} />
                <Stack sx={{
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"center",
                }}>
                    <Typography>{name}</Typography>
                    {
                        newMessageAlert && (
                            <Typography>{newMessageAlert.count} New Messages</Typography>

                        )
                    }
                </Stack>
                {
                    isOnline && (
                        <Box
                            sx={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor: "green",
                                position: "absolute",
                                top: "50%",
                                right: "1rem",
                                transform: "translateY(-50%)"
                            }} />
                    )
                }

            </div>
        </LinkElement >
    )
}

export default memo(ChatItem)
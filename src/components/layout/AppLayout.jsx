/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React from 'react'
import Header from './Header'
import Title from '../shared/Title'
import { Grid } from '@mui/material'
import ChatList from '../specific/ChatList'
import { sampleChats } from '../../constants/sampleData'
import { useParams } from 'react-router-dom'
import Profile from '../specific/Profile'

const AppLayout = () => (WrappedComponents) => {
    return (props) => {
        const params = useParams();
        const chatId = params.chatId;
        
        const handleDeleteChat = (e,_id,groupChat)=>{
            e.preventDefault();
            console.log("Delete Chat ",_id,groupChat);

        }
        return (
            <>
                <Title />
                <Header />
                <Grid container height={"calc(100vh - 4rem)"}>


                    <Grid
                        item
                        sm={4}
                        md={3}
                        height={"100%"}
                        sx={{
                            display: { xs: "none", sm: "block", },


                        }}
                    >
                        <ChatList chats={sampleChats} chatId={chatId}
                        // newMessagesAlert={[
                        //     {
                        //         chatId,
                        //         count:5,
                        //     }
                        // ]}
                        onlineUsers={["1","2"]}
                        handleDeleteChat={handleDeleteChat}
                        />
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={5}
                        lg={6}
                        height={"100%"}
                    >
                        <WrappedComponents{...props} />
                    </Grid>

                    <Grid
                        item

                        md={4}
                        lg={3}

                        height={"100%"}
                        sx={{
                            display: { xs: "none", sm: "block" },
                            padding: "2rem",
                            bgcolor: "rgba(0,0,0,0.85)"
                        }}
                    >
                        <Profile />
                    </Grid>

                </Grid>


            </>

        )
    }
}

export default AppLayout
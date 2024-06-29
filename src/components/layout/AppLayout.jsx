/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React, { useCallback, useEffect, useState } from 'react'
import Header from './Header'
import Title from '../shared/Title'
import { Drawer, Grid, Skeleton } from '@mui/material'
import ChatList from '../specific/ChatList'
import { sampleChats } from '../../constants/sampleData'
import { useNavigate, useParams } from 'react-router-dom'
import Profile from '../specific/Profile'
import { useMyChatsQuery } from '../../redux/api/api'
import { useDispatch, useSelector } from 'react-redux'
import { setIsMobile } from '../../redux/reducers/misc'
import { useErrors, useSocketEvents } from '../../hooks/hook'
import { getSocket } from '../../socket'
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from '../../constants/events'
import { incrementNotification, setNewMessagesAlert } from '../../redux/reducers/chat'
import { getOrSaveFromStorage } from '../../lib/features'

const AppLayout = () => (WrappedComponents) => {
    return (props) => {
        const params = useParams();
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const chatId = params.chatId;

        const socket = getSocket();

        // console.log(socket.id);

        const [onlineUsers, setOnlineUsers] = useState([]);

        const { isMobile } = useSelector((state) => state.misc);
        const { user } = useSelector((state) => state.auth);
        const { newMessagesAlert } = useSelector((state) => state.chat);


        const { isLoading, data, isError, error, refetch } = useMyChatsQuery("")

        useErrors([{ isError, error }])

        useEffect(() => {
            getOrSaveFromStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert });
          }, [newMessagesAlert]);

        // console.log(data);

        const handleDeleteChat = (e, _id, groupChat) => {
            e.preventDefault();
            console.log("Delete Chat ", _id, groupChat);

        }
        const handleMobileClose = () => dispatch(setIsMobile(false));


        const newMessageAlertListener = useCallback(
            (data) => {
                if (data.chatId === chatId) return;
                dispatch(setNewMessagesAlert(data));
            },
            [chatId]
        );
        const newRequestListener = useCallback(() => {
            dispatch(incrementNotification());
        }, [dispatch]);

        const refetchListener = useCallback(() => {
            refetch();
            navigate("/");
        }, [refetch, navigate]);

        const onlineUsersListener = useCallback((data) => {
            setOnlineUsers(data);
        }, []);

        const eventHandlers = {
            [NEW_MESSAGE_ALERT]: newMessageAlertListener,
            [NEW_REQUEST]: newRequestListener,
            [REFETCH_CHATS]: refetchListener,
            [ONLINE_USERS]: onlineUsersListener,
        };

        useSocketEvents(socket, eventHandlers);
        return (
            <>
                <Title />
                <Header />
                {isLoading ? (
                    <Skeleton />
                ) : (
                    <Drawer open={isMobile} onClose={handleMobileClose}>
                        <ChatList
                            w="70vw"
                            chats={data?.chats}
                            chatId={chatId}
                            handleDeleteChat={handleDeleteChat}
                            newMessagesAlert={newMessagesAlert}
                        //   onlineUsers={onlineUsers}
                        />
                    </Drawer>
                )}
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
                        {
                            isLoading ? (<Skeleton />) : (
                                <ChatList chats={data?.chats} chatId={chatId}

                                    onlineUsers={["1", "2"]}
                                    handleDeleteChat={handleDeleteChat}
                                    newMessagesAlert={newMessagesAlert}

                                />
                            )
                        }
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={5}
                        lg={6}
                        height={"100%"}
                    >
                        <WrappedComponents {...props} chatId={chatId} user={user} />
                    </Grid>

                    <Grid
                        item

                        md={4}
                        lg={3}

                        height={"100%"}
                        sx={{
                            display: { xs: "none", sm: "none", md: "block" },
                            padding: "2rem",
                            bgcolor: "rgba(0,0,0,0.85)"
                        }}
                    >
                        <Profile user={user} />
                    </Grid>
                </Grid>


            </>

        )
    }
}

export default AppLayout
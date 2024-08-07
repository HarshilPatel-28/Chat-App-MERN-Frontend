/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Close, Dashboard, ExitToApp, Groups, ManageAccounts, Menu, Message } from "@mui/icons-material"
import { Box, Drawer, Grid, IconButton, Stack, Typography, styled } from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate, useLocation } from "react-router-dom"
import { grayColor, matBlack } from "../../constants/color"
import { adminLogout } from "../../redux/thunks/admin"



const LinkComponent = styled(Link)`
  text-decoration: none;
  border-radius: 2rem;
  padding: 1rem 2rem;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.54);
  }
`;

const adminTabs = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <Dashboard />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <ManageAccounts />,
    },
    {
      name: "Chats",
      path: "/admin/chats",
      icon: <Groups />,
    },
    {
      name: "Messages",
      path: "/admin/messages",
      icon: <Message />,
    },
  ];


const Sidebar = ({w="100%"})=>{
    const location = useLocation();
    const dispatch = useDispatch();

    const logoutHandler =()=>{
        dispatch(adminLogout())  
    }

    return (
        <Stack width={w} direction={'column'} p={"3rem"} spacing={'3rem'}>
            <Typography variant="h5" textTransform={'uppercase'}>Chattu</Typography>
<Stack spacing={'1rem'}>
    {
        adminTabs.map((tab)=>(
            
            <LinkComponent key={tab.path} to={tab.path}
               sx={
                location.pathname === tab.path && {
                  bgcolor: matBlack,
                  color: "white",
                  ":hover": { color: "white" },
                }
              }
            >
            <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
                {tab.icon}
                <Typography>{tab.name}</Typography>
            </Stack>
            </LinkComponent>
            
        ))
    }
    <LinkComponent onClick={logoutHandler}
            >
            <Stack direction={'row'} alignItems={'center'} spacing={'1rem'}>
                <ExitToApp />
                <Typography>Logout</Typography>
            </Stack>
            </LinkComponent>
</Stack>
            
        </Stack>
    )
}




const AdminLayout = ({children}) => {
  const  {isAdmin}  =useSelector(state=>state.auth);

const [isMobile,setIsMobile]=useState(false);

const handleMobile=()=>setIsMobile(!isMobile);
const handleClose=()=>setIsMobile(false);


if(!isAdmin) return <Navigate to={'/admin'}/>

  return (
    <Grid container minHeight={"100vh"}>
        <Box
            sx={{
                display:{xs:"block",md:"none"},
                position:"fixed",
                right:"1rem",
                top:"1rem",
            }}
        >
            <IconButton  onClick={handleMobile}>
                {isMobile?< Close/> : <Menu/>}
            </IconButton>
        </Box>
        <Grid
            item
            md={4}
            lg={3}
            sx={{display:{xs:"none", md:"block"}}}
        >
<Sidebar/>
        </Grid>
        <Grid
            item
            xs={12}
            md={8}
            lg={9}
            sx={{
                bgcolor:grayColor
            }}
        >
            {children}
        </Grid>
<Drawer open={isMobile} onClose={handleClose}>
    <Sidebar w='50vw'/>
</Drawer>
    </Grid>
  )
}

export default AdminLayout
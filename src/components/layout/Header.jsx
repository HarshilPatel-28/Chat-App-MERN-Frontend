/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material"
import { orange } from "../../constants/color"
import { Add, Group, Logout, Menu, Notifications, Search as SearchIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Suspense, lazy, useState } from "react";
import { useDispatch } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import axios from "axios";
import { server } from "../../constants/config";
import toast from "react-hot-toast";


const SearchDialog = lazy(() => import("../specific/Search"));
const NotificatioDialog = lazy(() => import("../specific/Notification"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isMobile, setIsMobile] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [isNewGroup, setIsNewGroup] = useState(false);
    const [isNotification, setIsNotification] = useState(false);

    const handleMobile = () => {
        setIsMobile((prev) => !prev);
    }

    const openSearch = () => {
        setIsSearch((prev) => !prev);

    }

    const openNewGroup = () => {
        setIsNewGroup((prev) => !prev);

    }


    const logoutHandler = async () => {
        try {
          const { data } = await axios.get(`${server}/api/v1/user/logout`, {
            withCredentials: true,
          });
          dispatch(userNotExists());
          toast.success(data.message);
        } catch (error) {
          toast.error(error?.response?.data?.message || "Something went wrong");
        }
      };

    const openNotification = () => {
        setIsNotification((prev) => !prev);

    }

    const navigateToGroup = () => navigate("/groups")


    return (
        <>
            <Box sx={{ flexGrow: 1 }}
                height={"4rem"}
            >
                <AppBar position="static" sx={{
                    bgcolor: orange
                }}>

                    <Toolbar>
                        <Typography
                            variant="h6"
                            sx={{
                                display: { xs: "none", sm: "block" }
                            }}
                        >
                            Chattu
                        </Typography>

                        <Box
                            sx={{
                                display: { xs: "block", sm: "none" }
                            }}
                        >
                            <IconButton color="inherit" onClick={handleMobile}>
                                <Menu />
                            </IconButton>
                        </Box>
                        <Box
                            sx={{
                                flexGrow: 1,
                            }}
                        />
                        <Box>
                            {/* <Tooltip title="Search">

                <IconButton color="inherit" size="large" onClick={openSearchDialog}>
                        <Search />
                        </IconButton>
                </Tooltip> */}





                            <IconBtn icon={<SearchIcon />} onClick={openSearch} title={"Search"} />
                            <IconBtn icon={<Add />} onClick={openNewGroup} title={"New Group"} />
                            <IconBtn icon={<Group />} onClick={navigateToGroup} title={"Manage Group"} />
                            <IconBtn icon={<Notifications />} onClick={openNotification} title={"Notification"} />
                            <IconBtn icon={<Logout />} onClick={logoutHandler} title={"Logout"} />

                        </Box>
                    </Toolbar>
                </AppBar>

            </Box>
            {
                isSearch && (
                    <Suspense fallback={<Backdrop open />}>

                        <SearchDialog />
                    </Suspense>
                )
            }
            {
                isNotification && (
                    <Suspense fallback={<Backdrop open />}>

                        <NotificatioDialog />
                    </Suspense>
                )
            }
            {
                isNewGroup && (
                    <Suspense fallback={<Backdrop open />}>

                        <NewGroupDialog />
                    </Suspense>
                )
            }
        </>
    )
}

const IconBtn = ({ title, icon, onClick }) => {
    return (
        <Tooltip title={title}>

            <IconButton color="inherit" size="large" onClick={onClick}>
                {icon}
            </IconButton>
        </Tooltip>
    )
}

export default Header
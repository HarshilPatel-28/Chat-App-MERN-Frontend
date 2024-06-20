/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import { Backdrop, Box, Button, CircularProgress, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material"
import { Add, Delete, Done, Edit, KeyboardBackspace, Menu } from "@mui/icons-material";
import { bgGradient, matBlack } from "../constants/color";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Suspense, lazy, memo, useState } from "react";
import AvatarCard from "../components/shared/AvatarCard";
import { LinkElement } from "../components/styles/StyledComponents";
import { sampleChats, sampleUsers } from "../constants/sampleData";
import { useEffect } from "react";
import UserItem from "../components/shared/UserItem";


const ConfirmDeleteDialog = lazy(() => import("../components/dialogs/ConfirmDeleteDialog"))
const AddMemberDialog = lazy(() => import("../components/dialogs/AddMemberDialog"))

const isAddMember = false;
const isLoadingRemoveMember = false;

const Groups = () => {
  const navigate = useNavigate();
  const chatId = useSearchParams()[0].get("group")

  const [members, setMembers] = useState(sampleUsers);


  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");

  const navigateBack = () => { navigate("/") }
  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }
  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const updateGroupName = () => {
    setIsEdit(false);
    console.log(groupNameUpdatedValue);
  }

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);

  }

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);

  }

  const openAddMemberHandler = () => {

  }

  const deleteHandler = () => {
    console.log("Delete Handler");
    closeConfirmDeleteHandler();
  }

  const removeMemberHandler = (id) => {
    console.log("Remove Handler ", id);
  }
  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`)
      setGroupNameUpdatedValue(`Group Name ${chatId}`)
    }

    return () => {
      setGroupName("")
      setGroupNameUpdatedValue("")
      setIsEdit(false)
    }

  }, [chatId])

  const IconBtns = <>

    <Box
      sx={{
        display: {
          xs: "block",
          sm: "none",
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }
      }}
    >
      <IconButton onClick={handleMobile}>
        <Menu />
      </IconButton>
    </Box>

    <Tooltip title="back">
      <IconButton
        sx={{
          position: "absolute",
          top: "2rem",
          left: "2rem",
          bgcolor: matBlack,
          color: "white",
          "&:hover": {
            bgcolor: "rgba(0,0,0,0.7)"
          }
        }}
        onClick={navigateBack}
      >
        <KeyboardBackspace />
      </IconButton>

    </Tooltip>
  </>;

  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName}
          // disabled={isLoadingGroupName}
          >
            <Done />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton
            // disabled={isLoadingGroupName}
            onClick={() => setIsEdit(true)}
          >
            <Edit />
          </IconButton>
        </>
      )}
    </Stack>
  );


  const ButtonGroup = (
    <Stack
      direction={{
        xs: "column-reverse",
        sm: "row",
      }}
      spacing={"1rem"}
      p={{
        xs: "0",
        sm: "1rem",
        md: "1rem 4rem",
      }}
    >
      <Button
        size="large"
        color="error"
        startIcon={<Delete />}
        onClick={openConfirmDeleteHandler}
      >
        Delete Group
      </Button>
      <Button
        size="large"
        variant="contained"
        startIcon={<Add />}
        onClick={openAddMemberHandler}
      >
        Add Member
      </Button>
    </Stack>
  );

  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
        // bgcolor={'bisque'}
      >
        <GroupsList myGroups={sampleChats} />

      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtns}

        {groupName && (
          <>
            {GroupName}

            <Typography
              margin={"2rem"}
              alignSelf={"flex-start"}
              variant="body1"
            >
              Members
            </Typography>

            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm: "1rem",
                xs: "0",
                md: "1rem 4rem",
              }}
              spacing={"2rem"}
              height={"50vh"}
              overflow={"auto"}
            >
              {/* Members */}

              {/* {isLoadingRemoveMember ? (
                <CircularProgress />
              ) : (
                members.map((i) => (
                  <UserItem
                    user={i}
                    key={i._id}
                    isAdded
                    styling={{
                      boxShadow: "0 0 0.5rem  rgba(0,0,0,0.2)",
                      padding: "1rem 2rem",
                      borderRadius: "1rem",
                    }}
                    handler={removeMemberHandler}
                  />
                ))
              )} */}

              {isLoadingRemoveMember ? (
                <CircularProgress />
              ) : (
                members.map((i) => (
                  <UserItem
                    user={i}
                    key={i._id}
                    isAdded
                    styling={{
                      boxShadow: "0 0 0.5rem  rgba(0,0,0,0.2)",
                      padding: "1rem 2rem",
                      borderRadius: "1rem",
                    }}
                    handler={removeMemberHandler}
                  />
                ))
              )}
            </Stack>



            {ButtonGroup}
          </>
        )}

      </Grid>
      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog />
        </Suspense>
      )}

      {
        confirmDeleteDialog &&
        <Suspense fallback={<Backdrop open />}>

          <ConfirmDeleteDialog open={confirmDeleteDialog}
            handleClose={closeConfirmDeleteHandler}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      }

      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          }
        }}
        open={isMobileMenuOpen} onClose={handleMobileClose}>
        <GroupsList w="50vw" myGroups={sampleChats} />

      </Drawer>
    </Grid>
  )
}

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack
    width={w}
    sx={{
      // backgroundImag e: bgGradient,
      overflow: "auto",
      backgroundImage:bgGradient,
      height: "100vh",
      

    }}
  >
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography textAlign={"center"} padding="1rem">
        No groups
      </Typography>
    )}
  </Stack>
);
const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <LinkElement
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </LinkElement>
  );
});

export default Groups

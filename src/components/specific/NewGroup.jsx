/* eslint-disable no-unused-vars */
import { Button, Dialog, DialogTitle, Stack, TextField, Typography } from "@mui/material"
import { sampleUsers } from "../../constants/sampleData"
import UserItem from "../shared/UserItem"
import { useInputValidation } from "6pp";
import { useState } from "react";


const NewGroup = () => {

  const groupName = useInputValidation("");

  const [members,setMembers] = useState(sampleUsers);
  const [selectedMembers,setSelectedMembers] = useState([]);

  const selectMemberHandler = (id) => {

    // setMembers((prev)=>
    // prev.map((user)=>
    //   user._id === id ? {...user , isAdded : !user.isAdded}: user
    //  ))
    setSelectedMembers((prev)=>
      prev.includes(id)
    ? prev.filter((currElement)=> currElement !== id)
    : [...prev,id]
    );
   };

  const submitHandler = () => { };
  const closeHandler = () => { };

  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={'2rem'}>
        <DialogTitle textAlign={'center'} variant="h4">New Group</DialogTitle>

        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography>Members</Typography>
        <Stack>
          {
            members.map((i) => (
              <UserItem
                key={i._id}
                user={i}
                handler={selectMemberHandler}
                isAdded={selectedMembers.includes(i._id)}
              // handlerIsLoading={isLoadingSendFriendRequest}
              />
            ))
          }
        </Stack>
        <Stack direction={'row'} justifyContent={'end'} >
          <Button size="large" variant="text" color="error">Cancel</Button>
          <Button size="large" style={{ marginLeft: "0.8rem" }} variant="contained" onClick={submitHandler}>Create</Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroup
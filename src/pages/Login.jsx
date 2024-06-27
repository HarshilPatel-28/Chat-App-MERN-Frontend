/* eslint-disable no-unused-vars */
import { useFileHandler, useInputValidation } from "6pp";
import { CameraAlt } from "@mui/icons-material";
import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { VisuallyHiddenInput } from "../components/styles/StyledComponents";
import { bgGradient } from "../constants/color";
import { usernameValidator } from "../utils/validator";


import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { server } from "../constants/config";
import { userExists } from "../redux/reducers/auth";


const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  // const password = useStrongPassword();
  const password = useInputValidation();

  const avatar = useFileHandler("single");
  const dispatch = useDispatch()

  const handleLogin =async (e) => {
    e.preventDefault();

    const config = {
      withCredentials:true,
        headers:{
          "Content-Type":"application/json",
        },
    };

    try {
      const {data} = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username:username.value,
          password:password.value,
        },
        config
        
      );
      dispatch(userExists(true))
      toast.success(data.message)
    } catch (error) {
      console.log(error);
      
      toast.error(error?.response?.data?.response?.message || "Something Went Wrong")
    }
  }

  const handleSignup =async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );

      dispatch(userExists(true))

      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something Went Wrong")
    } 
  }

  const toggleLogin = () => setIsLogin((prev) => !prev)
  return (
    <div
      style={{
        backgroundImage: bgGradient,
      }}
    >


      <Container component={"main"}

        sx={{
          height: "100vh",
          display: "flex",

          alignItems: "center",
          justifyContent: "center"
        }}
        maxWidth="xs" >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

          }}
        >
          {
            isLogin ?
              (<>

                <Typography variant="h5">Login</Typography>
                <form
                  style={{
                    width: "100%",
                    marginTop: "1rem"
                  }}
                  onSubmit={handleLogin}
                >

                  <TextField
                    required
                    fullWidth
                    label="Username"
                    margin="normal"
                    variant="outlined"
                    value={username.value}
                    onChange={username.changeHandler}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    variant="outlined"
                    value={password.value}
                    onChange={password.changeHandler}
                  />

                  <Button
                    sx={{
                      marginTop: "1rem"
                    }}
                    variant="contained"
                    type="submit"
                    fullWidth

                    color="primary">
                    Login
                  </Button>

                  <Typography textAlign={'center'} m={'1rem'}>OR</Typography>
                  <Button

                    variant="text"
                    type="submit"
                    fullWidth
                    onClick={toggleLogin}
                  >
                    Sign Up Insted
                  </Button>
                </form>

              </>)
              : (<>

                <Typography variant="h5">Sign Up</Typography>
                <form
                  style={{
                    width: "100%",
                    marginTop: "1rem"
                  }}
                  onSubmit={handleSignup}

                >

                  <Stack position={'relative'} width={'10rem'} margin={'auto'}>
                    <Avatar
                      sx={{
                        width: "10rem",
                        height: "10rem",
                        objectFit: "contain"
                      }}
                      src={avatar.preview}
                    />


                    <IconButton
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        color: "white",
                        bgcolor: "rgba(0,0,0,0.5)",
                        ":hover": {
                          bgcolor: "rgba(0,0,0,0.7)"

                        }
                      }}
                      component="label"
                    >
                      <>
                        <CameraAlt />
                        <VisuallyHiddenInput type="file" onChange={avatar.changeHandler} />
                      </>
                    </IconButton>
                  </Stack>
                  {
                    avatar.error && (
                      <Typography
                        m={"1rem auto"}
                        width={"fit-content"}
                        display={'block'}
                        color='error'
                        variant="caption"
                      >
                        {avatar.error}
                      </Typography>
                    )
                  }

                  <TextField
                    required
                    fullWidth
                    label="Name"
                    margin="normal"
                    variant="outlined"
                    value={name.value}
                    onChange={name.changeHandler}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Bio"
                    margin="normal"
                    variant="outlined"
                    value={bio.value}
                    onChange={bio.changeHandler}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Username"
                    margin="normal"
                    variant="outlined"
                    value={username.value}
                    onChange={username.changeHandler}
                  />
                  {
                    username.error && (
                      <Typography color={'error'} variant="caption">
                        {username.error}
                      </Typography>
                    )
                  }
                  <TextField
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    margin="normal"
                    variant="outlined"
                    value={password.value}
                    onChange={password.changeHandler}
                  />
                  {/* {
                  password.error && (
                    <Typography color={'error'} variant="caption">
                      {password.error}
                    </Typography>
                  )
                } */}

                  <Button
                    sx={{
                      marginTop: "1rem"
                    }}
                    variant="contained"
                    type="submit"
                    fullWidth

                    color="primary">
                    Sign Up
                  </Button>

                  <Typography textAlign={'center'} m={'1rem'}>OR</Typography>
                  <Button

                    variant="text"
                    type="submit"
                    fullWidth
                    onClick={toggleLogin}
                  >
                    LogIn Insted
                  </Button>
                </form>

              </>)
          }
        </Paper>

      </Container>
    </div>

  )
}

export default Login

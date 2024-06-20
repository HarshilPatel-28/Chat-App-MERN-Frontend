/* eslint-disable react/prop-types */
import { Avatar, Stack, Typography } from "@mui/material"
import { Face, AlternateEmail, CalendarMonth } from "@mui/icons-material";
import  moment  from "moment";

const Profile = () => {
  return (
    <Stack spacing={'2rem'} direction={'column'} alignItems={'center'}>
        <Avatar 
            sx={{
                width:200,
                height:200,
                objectFit:'contain',
                marginBottom:'1rem',
                border:'5px solid white'

            }}
        />

        <ProfileCard heading={'Bio'} text={'ddcpeoj jcjw ckk wk kkpkom'}/>
        <ProfileCard heading={'Username'} text={'harshil___028'} Icon={<AlternateEmail/>}/>
        <ProfileCard heading={'Name'} text={'Harshil Patel'} Icon={<Face/>}/>
        <ProfileCard heading={'Joined'} text={moment('2024-01-01T00:00:00.000Z').fromNow()} Icon={<CalendarMonth/>}/>
    </Stack>
  )
}

const ProfileCard = ({text,Icon,heading}) => (
    <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={'1rem'}
        color={'white'}
        textAlign={'center'}
    >
        {Icon && Icon}

        <Stack>
            <Typography variant="body1">{text}</Typography>
            <Typography color={'gray'} variant="caption">{heading}</Typography>
        </Stack>

    </Stack>
)

export default Profile
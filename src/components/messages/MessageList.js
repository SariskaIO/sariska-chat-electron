import React, { useEffect, useRef, useState } from 'react'
import MessageItem from "./MessageItem";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { Avatar, Box, Button, Grid, TextField, Tooltip, Zoom } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import { colors } from '../../assets/styles/colors';
import CreateIcon from '@material-ui/icons/Create';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { AvatarGroup } from '@material-ui/lab';
import Pagination from './Pagination';


const useStyles = makeStyles((theme) => ({
    root: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      height: '90vh',
    },
    card: {
      flex: 1,
      width: '80%',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      height: '60vh'
    },
    cardHeader: {
        backgroundColor: `${colors.skyblue}`
    },
    avatarList: {
        display: 'flex',
        flexDirection: 'row'
    },
    cardContent: {
        flex: 1,
        height: '200px',
        overflow: 'auto'
    },
    cardAction: {
        boxShadow: '0px 4px 4px 2px rgba(0,0,0,0.8)',
        zIndex: '9'
    },
    cardForm: {
        display: 'flex',
        alignItems: 'flex-end',
        width: '100%',
    },
    cardTextField: {
        width: '100%',
        padding: '2px'
    },
    enterText: {
        backgroundColor: `${colors.skyblue}`,
        "&:hover": {
            opacity: '0.8',
            cursor: 'pointer'
        }
    },
    box: {
        textAlign: 'left'
    },
    chatLine: {
        display: 'flex'
    },
    text: {
        background: `${colors.gray}`,
        width: 'fit-content',
        padding: '5px',
        borderRadius: '0px 5px 10px',
        marginBottom: '10px',
        maxWidth: '70%',
        marginLeft: '10px'
    },
    userAvatar: {
        height: '29px', 
        width: '29px',
        backgroundColor: `${colors.blue}`
    },

    userAvatar1: {
        height: '26px', 
        width: '26px',
        backgroundColor: `${colors.white}`,
        color: `${colors.blue}`,
    },
    customWidth: {
        maxWidth: 100,
        color: '#fff',
        backgroundColor: '#000',
        fontWeight: 700,
        fontSize: '110%'
    }
  }));
  
const MessageList = ({messages, pushMessage, room, user}) => {
    const classes = useStyles();
    const [text, setText] = useState('');

    const adjustTextMessage = (text) => {
        return text.trim();
    };
    const isMessageEmpty = (text) => {
        return adjustTextMessage(text).length === 0;
    }
    
    const disableButton = isMessageEmpty(text);

    const handleChange = (e) => {
        setText(e.target.value)
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        !disableButton && 
        pushMessage(text);
        !disableButton && setText('');
    }
     
    const scrollRef = useRef(null);

    const scrollToBottom = () => {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' })
      }
     const scrollToTop = () =>{
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    useEffect(()=>{
        scrollToBottom();
    },[text])

    useEffect(()=>{
        window.addEventListener('scroll', handleScroll);

        return ()=>{
            window.removeEventListener('scroll', handleScroll);
        }
    },[])

    const handleScroll= () => {
        console.log('rect', document.body.getBoundingClientRect())
    }

    console.log('messages will be', messages);

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
      <CardHeader
        avatar={
            <div className={classes.avatarList}>
            <Tooltip TransitionComponent={Zoom} title={user.name} arrow classes={{ tooltip: classes.customWidth }}>
                <AvatarGroup max={2}>
                  <Avatar className={classes.userAvatar1}>{user.name}</Avatar>
                </AvatarGroup>
                </Tooltip>
        </div>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        //title={`Room Name: ${room.session_id}, Creator : ${room.created_by}, Created-on: ${room.inserted_at.slice(0,10)}`}
        title=''
        className={classes.cardHeader}
      />
      <CardContent className={classes.cardContent} >
      <Typography variant="body2" color="textSecondary" component="p">
          Hey ! User
        </Typography>
         <Box className={classes.box}>
            {messages.map((message, id)=> {
                return (
                    <MessageItem message={message} id={id} user={user} key={id}/>
                )
            })}
        </Box>
        <Typography ref={scrollRef} style={{height: '18px'}}></Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardAction}>
        <form noValidate autoComplete="off" className={classes.cardForm} onSubmit={handleSubmit}>
        <Grid container spacing={1} alignItems="flex-end" style={{width: '100%', alignItems: 'center'}}>
          <Grid item>
              <Avatar style={{backgroundColor: `${colors.skyblue}`}}>
                <CreateIcon />
            </Avatar>
          </Grid>
          <Grid item style={{flex: 1}}>
          <TextField 
            id="text" 
            label="Enter Text Here" 
            variant="outlined" 
            className={classes.cardTextField}
            onChange={handleChange}
            value={text}
         />  
          </Grid>
          <Grid item>
          <Avatar className={classes.enterText} onClick={handleSubmit} disabled={disableButton}>
                <DoneAllIcon />
            </Avatar> 
          </Grid>
          
        </Grid>
        </form>
      </CardActions>
      </Card>
        </div>
    )
}


export default MessageList;


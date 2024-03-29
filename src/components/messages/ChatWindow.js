import React from 'react'
import MessageItem from "./MessageItem";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { COMPANY_LOGO } from '../../constants';
import MessageList from './MessageList';
import { colors } from '../../assets/styles/colors';



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(3),
      backgroundColor: `${colors.gray}`
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textAlign: 'left'
    },
  }));
  
const ChatWindow = ({messages, user, pushMessage, room}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/* <AppBar position="static">
               <Toolbar>
                 <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                   <img src={COMPANY_LOGO} />
                 </IconButton>
                 <Typography variant="h6" className={classes.title}>
                   Sariska
                 </Typography>
               </Toolbar>
             </AppBar> */}
            <MessageList messages={messages} user={user} pushMessage={pushMessage} room={room}/>
        </div>
    )
}


export default ChatWindow;

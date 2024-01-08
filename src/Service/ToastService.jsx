import * as React from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

  export default function DirectionSnackbar(props) {
    // const [open, setOpen] = React.useState(props.open);
    // const [transition, setTransition] = React.useState(undefined);

  
    // const handleClick = (Transition) => () => {
    //   setTransition(() => Transition);
    //   setOpen(true);
    // };
    console.log(props);
    
    // const handleClose = () => {
    //   setOpen(false);
    // };

    const transition = TransitionLeft;
  return (
    <Box sx={{ width: 300 }}>
      <Snackbar
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={transition}
        message={props.message}
        key={transition ? transition.name : ''}
        autoHideDuration={props.autoHideDuration}
      />
    </Box>
  );
}
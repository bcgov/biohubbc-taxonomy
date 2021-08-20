import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

const useStyles = makeStyles(() => ({
    homeLayoutRoot: {
    width: 'inherit',
    height: '100%',
    display: 'flex',
    flex: '1',
    flexDirection: 'column'
  },
  homeContainer: {
    flex: '1',
    overflow: 'auto'
  }
}));

const HomeLayout: React.FC = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.homeLayoutRoot}>
      <Box className={classes.homeContainer}>{props.children}</Box>
    </Box>
  );
};

export default HomeLayout;

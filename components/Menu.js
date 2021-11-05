// Imports
import React from "react";
import Link from "next/link";
import {
  Box,
  Button,
  AppBar,
  Toolbar,
  makeStyles,
} from "@material-ui/core";

// Styles
const useStyles = makeStyles((theme) => ({
  appBar: {
    background: theme.palette.dark.main,
  },
  logo: {
    width: 120,
    [theme.breakpoints.down("sm")]: {
      width: 80,
    },
  },
}));

// Component
export default function MenuAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Link href="/">
              <Button>
                <img src="/images/logo.png" className={classes.logo} />
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

// Imports
import React from "react";
import {
  Card,
  useTheme,
  Typography,
  makeStyles,
  CardContent,
} from "@material-ui/core";

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    padding: 16,
    width: "100%",
    display: "flex",
    minHeight: 175,
    justifyContent: "space-between",
  },
  image: {
    width: 120,
    marginLeft: 16,
    [theme.breakpoints.down("md")]: {
      width: 80,
    },
    [theme.breakpoints.down("sm")]: {
      width: 140,
    },
    [theme.breakpoints.down("xs")]: {
      width: 80,
    },
  },
}));

// Component
export default function MediaControlCard({ title, subtitle, image }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root}>
      <CardContent style={{ padding: 0 }}>
        <Typography
          variant="subtitle1"
          color="textPrimary"
          style={{ fontSize: 18 }}
        >
          <b>{title}</b>
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" align="justify">
          {subtitle}
        </Typography>
      </CardContent>

      <img className={classes.image} src={image} />
    </Card>
  );
}

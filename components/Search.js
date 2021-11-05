// Imports
import React from "react";
import {
  Paper,
  Select,
  Button,
  Divider,
  MenuItem,
  InputBase,
  makeStyles,
  FormControl,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search"

import Link from "next/link";

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    height: 60,
    display: "flex",
    padding: "2px 4px",
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      fontSize: 18,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
    flex: 1,
  },
  buttonSearch: {
    border: 0,
    height: 48,
    fontSize: 16,
    color: "white",
    borderRadius: 3,
    textTransform: "capitalize",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    background: `linear-gradient(15deg, ${theme.palette.secondaryDark.main} 20%, ${theme.palette.secondary.main} 90%)`,
    [theme.breakpoints.up("sm")]: {
      minWidth: 128,
      padding: "0 30px",
    },
  },
  divider: {
    margin: 4,
    height: 28,
  },
  formControl: {
    margin: theme.spacing(1),
  },
}));

// Component
export default function CustomizedInputBase() {
  const classes = useStyles();

  const [type, setType] = React.useState("desc");
  const [parameter, setParameter] = React.useState("");

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleChangeParameter = (event) => {
    setParameter(event.target.value);
  };

  return (
    <Paper component="form" className={classes.root}>
      <FormControl className={classes.formControl}>
        <Select value={type} disableUnderline onChange={handleChangeType}>
          <MenuItem dense value={"desc"}>
            Descrição
          </MenuItem>
          <MenuItem dense value={"barcode"}>
            Código de Barras
          </MenuItem>
        </Select>
      </FormControl>
      <Divider className={classes.divider} orientation="vertical" />

      <InputBase
        value={parameter}
        className={classes.input}
        onChange={handleChangeParameter}
      />

      <Link
        href={{
          pathname: "/busca",
          query: { q: parameter, type: type },
        }}
        passHref
      >
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          className={classes.buttonSearch}
        >
          <SearchIcon />
        </Button>
      </Link>
    </Paper>
  );
}

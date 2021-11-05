import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

//Imports
import Search from "./Search";
import CardHome from "./CardHome";

const useStyles = makeStyles((theme) => ({
  banner: {
    height: 340,
    background: `linear-gradient(15deg, ${theme.palette.primaryLight.main} 20%, ${theme.palette.primary.main} 90%)`,
  },
  gridCards: {
    width: "100%",
    padding: theme.spacing(3),
  },
  titleHome: {
    fontSize: 26,
    fontWeight: 600,
    marginBottom: theme.spacing(6),
    color: theme.palette.light.main,
  },
}));

// Component
export default function Home() {
  const classes = useStyles();

  return (
    <div>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.banner}
      >
        <Grid item xs={10} sm={8}>
          <Typography
            align="center"
            paragraph
            variant="h4"
            component="h6"
            className={classes.titleHome}
          >
            Encontre os produtos mais baratos da sua região
          </Typography>
          <Search />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        justify="center"
        alignItems="center"
        className={classes.gridCards}
      >
        <Grid item xs={12} md={6}>
          <CardHome
            title="Busca por descrição"
            image="/images/descricao.svg"
            subtitle="Consulta preços de mercadorias por descrição."
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CardHome
            image="/images/codigo.svg"
            title="Busca por código de barras"
            subtitle="Consulta preços de mercadorias por código de barras."
          />
        </Grid>
      </Grid>
    </div>
  );
}

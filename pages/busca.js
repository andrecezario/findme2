// Imports
import React from "react";
import { useRouter } from "next/router";
import {
  Grid,
  Hidden,
  Drawer,
  Typography,
  makeStyles,
} from "@material-ui/core";

// Components
import Menu from "../components/Menu";
import { post } from "../services/api";
import Spinner from "../utils/Spinner";
import Table from "../components/Table";

// Styles
const useStyles = makeStyles((theme) => ({
  titleSearch: {
    fontWeight: 600,
    textTransform: "uppercase",
  },
  title: {
    width: "100%",
    fontWeight: 600,
    textTransform: "capitalize !important",
  },
  text: {
    textAlign: "left",
    textTransform: "capitalize !important",
  },
}));

function getColumns() {
  const classes = useStyles();

  return [
    {
      title: "Descrição",
      field: "dscProduto",
      render: (rowData) => (
        <Typography variant="body2" className={classes.title}>
          {rowData.dscProduto.toLowerCase()}
        </Typography>
      ),
    },
    {
      title: "Valor",
      field: "valMinimoVendido",
      render: (rowData) => (
        <Typography variant="body2" color="textPrimary">
          {rowData.valMinimoVendido === rowData.valMaximoVendido ? (
            <b>
              {rowData.valMinimoVendido.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </b>
          ) : (
            <>
              <Typography variant="caption" color="textPrimary">
                De{" "}
              </Typography>
              <b>
                {rowData.valMinimoVendido.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </b>
              <Typography variant="caption" color="textPrimary">
                {" "}
                à{" "}
              </Typography>
              <b>
                {rowData.valMaximoVendido.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </b>
            </>
          )}
        </Typography>
      ),
    },
    {
      title: "Estabelecimento",
      field: "nomFantasia",
      render: (rowData) => (
        <Typography noWrap variant="body2" className={classes.text}>
          {(rowData.nomFantasia || rowData.nomRazaoSocial).toLowerCase()}
        </Typography>
      ),
    },
    {
      title: "Endereço",
      field: "nomLogradouro",
      render: (rowData) => (
        <Typography variant="body2" className={classes.text}>
          {(
            rowData.nomLogradouro +
            ", " +
            rowData.numImovel +
            " - " +
            rowData.nomBairro +
            " , " +
            rowData.nomMunicipio +
            " - AL , " +
            rowData.numCep
          ).toLowerCase()}
        </Typography>
      ),
    },
  ];
}

export default function Busca() {
  const classes = useStyles();
  const {
    query: { q, type },
  } = useRouter();

  const columns = getColumns();

  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  let data = {
    raio: 5,
    dias: 3,
    latitude: 0,
    longitude: 0,
    descricao: "",
    codigoDeBarras: "",
  };

  const sortResults = () => {
    results.sort(function (a, b) {
      if (a.valMinimoVendido.toFixed(2) > b.valMinimoVendido.toFixed(2)) {
        return 1;
      }
      if (a.valMinimoVendido.toFixed(2) < b.valMinimoVendido.toFixed(2)) {
        return -1;
      }
      return 0;
    });
  };

  const getCoords = async () => {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    return {
      longitude: pos.coords.longitude,
      latitude: pos.coords.latitude,
    };
  };

  React.useEffect(async () => {
    setLoading(true);
    const coords = await getCoords();
    data.latitude = coords.latitude;
    data.longitude = coords.longitude;

    if (type === "desc") {
      data.descricao = q;
    } else if (type === "barcode") {
      data.codigoDeBarras = q;
    }

    const request = async () => {
      const types = {
        desc: "consultarPrecosPorDescricao",
        barcode: "consultarPrecosPorCodigoDeBarras",
      };
      const retorno = await post(types[type], data);
      if (retorno.status === 200) {
        setResults(retorno.data);
        sortResults();
        setLoading(false);
      }
    };

    await request();
  }, []);

  const title = (
    <Hidden xsDown>
      <Typography className={classes.titleSearch} variant="h6" component="h6">
        Resultados da busca para "{q}"
      </Typography>
      <Typography color="textSecondary" variant="body2" paragraph>
        <b>{results.length} encontrados</b>
      </Typography>
    </Hidden>
  );

  return (
    <>
      <Spinner loading={loading} />
      <Menu />
      <Grid
        item
        xs={12}
        container
        spacing={2}
        justify="space-between"
        style={{ padding: 20 }}
      >
        <Grid item xs={12}>
          <Table title={title} columns={columns} data={results} />
        </Grid>
      </Grid>
    </>
  );
}

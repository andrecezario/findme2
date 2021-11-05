import React, { forwardRef } from "react";
import MaterialTable from "material-table";
import Paper from "@material-ui/core/Paper";

import {
  Edit,
  Check,
  Clear,
  Search,
  AddBox,
  Remove,
  SaveAlt,
  LastPage,
  FirstPage,
  ViewColumn,
  FilterList,
  ChevronLeft,
  ChevronRight,
  ArrowDownward,
  DeleteOutline,
} from "@material-ui/icons";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function Table({
  columns = [],
  data = [],
  title = "",
  emptyMessage = "Não existem registros disponíveis.",
  options = {},
}) {
  const props = {
    title,
    columns,
    data,
    icons: {
      ...tableIcons,
    },
    options: {
      draggable: true,
      selection: false,
      searchFieldAlignment: "right",
      searchFieldVariant: "outlined",
      headerStyle: {
        fontWeight: "600",
      },
      ...options,
    },
    localization: {
      pagination: {
        lastTooltip: "Último",
        nextTooltip: "Próximo",
        labelRowsSelect: "Itens",
        firstTooltip: "Primeiro",
        previousTooltip: "Anterior",
        labelDisplayedRows: "{from}-{to} de {count}",
      },
      body: {
        emptyDataSourceMessage: emptyMessage,
        filterRow: {
          filterTooltip: "Filtro",
        },
      },
    },
  };

  return (
    <MaterialTable
      components={{
        Container: (props) => (
          <Paper {...props} variant="outlined" style={{ paddingTop: 16 }} />
        ),
      }}
      {...props}
    />
  );
}

export default Table;

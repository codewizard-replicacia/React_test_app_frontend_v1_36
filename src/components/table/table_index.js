import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

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
  //Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function MuiTable(props) {
  const {
    cols,
    data,
    title = "",
    size,
    actions,
    onRowAdd,
    onRowDelete,
    onRowUpdate,
    tableRef,
    options,
    ...otherProps
  } = props;

  return (
    <MaterialTable
      tableRef={tableRef}
      columns={cols}
      data={data}
      title={title}
      icons={tableIcons}
      actions={actions}
      options={{
        search: false,
        actionsColumnIndex: -1,
        pageSize: 5,
        pageSizeOptions: [5, 10, 20],
        initialPage: 0,
        // showTitle:true,
        // sorting:true,
        // defaultSort:'asc',
        // thirdSortClick:false,
        emptyRowsWhenPaging: false,
        ...options,
      }}
      editable={{
        onRowAdd: onRowAdd,
        onRowUpdate: onRowUpdate,
        onRowDelete: onRowDelete,
      }}
      {...otherProps}
    />
  );
}

MuiTable.propTypes = {
  /** Array of column information of the table */
  cols: PropTypes.array.isRequired,

  /** A promised based function to return the data for the table */
  data: PropTypes.oneOf([PropTypes.func, PropTypes.array]).isRequired,

  /** Title of the table */
  title: PropTypes.string,

  /** Callback function when a row is added in the table */
  onRowAdd: PropTypes.func,

  /** Callback function when a row is updated in the table */
  onRowUpdate: PropTypes.func,

  /** Callback function when a row is deleted in the table */
  onRowDelete: PropTypes.func,

  /** A react reference to be used for the table */
  tableRef: PropTypes.any.isRequired,

  /** An array of actionable items */
  actions: PropTypes.array,
};

export default MuiTable;

import { useState, useEffect, createRef } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { AddBox, Edit, Visibility } from "@material-ui/icons";
import MuiTable from "../../components/table/table_index";
import { BASE_URL, PATH_PRODUCT } from "../../utils/constants";
import { PATH_INVENTORY } from "../../utils/constants";
import makeApiCall from "../../utils/makeApiCall";

function ProductTable() {

  const tableRef = createRef();
  const snackbar = useSnackbar();
  const navigate =  useNavigate();



  const [Inventories, setInventories] = useState({});

  useEffect(() => {
    const fetchInventories = async () => {
      const typesResponse = await makeApiCall(
        `${BASE_URL}${PATH_INVENTORY}`
      );
      const jsonResp = await typesResponse.json();

      if (Array.isArray(jsonResp.value) && jsonResp.value.length > 0) {
        const types = {};
        jsonResp.value.forEach((item) => {
          types[`${item.InventoryId}`] = item.PurchasedDate
        });
        setInventories(types);
      } else {
        snackbar.enqueueSnackbar("No data for Inventories. Please Add Inventories First.", {
          variant: "warning",
        });
	setInventories({});
      }
    };
    fetchInventories();
  }, []);

  const columns = [
    { title: "ProductId", field: "ProductId", editable: "never" },
      { title: "ProductName", field: "ProductName" },
      { title: "ProductDescription", field: "ProductDescription" },
      { title: "ProductImage", field: "ProductImage" },
      { title: "ProductType", field: "ProductType" },
      { title: "Stock", field: "ProductStock", lookup: Inventorys },
  ];
  
  const fetchData = async (query) => {
    return new Promise(async (resolve, reject) => {
      const { page, orderBy, orderDirection, search, pageSize } = query;
      const url = `${BASE_URL}${PATH_PRODUCT}`;
      let temp = url; // Initialize with the base URL
      let filterQuery = ""; // Initialize filter query as an empty string
  
      // Handle sorting
      if (orderBy) {
        temp += `?$orderby=${orderBy.field} ${orderDirection}`;
      }
  
      // Handle searching
      if (search) {
        filterQuery = `$filter=contains($screen.getSearchField().getName(), '${search}')`;
        temp += orderBy ? `&${filterQuery}` : `?${filterQuery}`;
      }
  
      // Handle pagination
      if (page > 0) {
        const skip = page * pageSize;
        temp += orderBy || search ? `&$skip=${skip}` : `?$skip=${skip}`;
      }
  
      const countUrl = search ? `${url}/$count?${filterQuery}` : `${BASE_URL}${PATH_PRODUCT}/$count`;
      let total = null;

      try {
        const countResponse = await makeApiCall(countUrl);
        const e = await countResponse.text();
        total = parseInt(e, 10);
  
        const response = await makeApiCall(temp);
        const { value } = await response.json();
  
        if (value.length === 0) {
          return resolve({
            data: [],
            page: page,
            totalCount: 0,
            error: "Error fetching data"
          });
        } else {
          return resolve({
            data: value,
            page: page,
            totalCount: total,
          });
        }
      } catch (error) {
        snackbar.enqueueSnackbar(`Trips API call Failed! - ${error.message}`, {
          variant: "error",
        });
        console.error("API call failed:", error);
        reject(error);
      }
    });
  };

  return (
    <div className="product-container">
      <MuiTable
        tableRef={tableRef}
        title="Entity_Table"
        cols={columns}
        data={fetchData}
        size={5}
        actions={[
          {
            icon: AddBox,
            tooltip: "Add",
            onClick: () => navigate("/Products/create"),
            isFreeAction: true,
          },
          {
            icon: Visibility,
            tooltip: "View",
            onClick: (event, rowData) =>
            navigate(`/Products/view/${rowData.ProductId}`),
          },
          {
            icon: Edit,
            tooltip: "Edit",
            onClick: (event, rowData) =>
            navigate(`/Products/edit/${rowData.ProductId}`),
          },
        ]}
        onRowDelete={async (oldData) => {
          const resp = await makeApiCall(
            `${BASE_URL}${PATH_PRODUCT}(${oldData.ProductId})`,
            "DELETE"
          );
          if (resp.ok) {
            tableRef.current.onQueryChange();
            snackbar.enqueueSnackbar("Successfully deleted Products", {
              variant: "success",
            });
          } else {
            const jsonData = await resp.json();
            snackbar.enqueueSnackbar(`Failed! - ${jsonData.message}`, {
              variant: "error",
            });
          }
        }}
      />
    </div>
  );
}

export default ProductTable;

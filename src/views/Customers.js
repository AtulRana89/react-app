import React, { useEffect, useState } from "react";
import AgGrid from "../components/AgGridReact/AgGridReact";
// redux
// import { connect } from "react-redux";
// Dispatch
// import { showHideLoding } from "../Redux/Action/Login";
import { GetUsers } from "../ApiActions/User";
// import Model from "../components/Model/model";
// import * as moment from "moment";
import * as XLSX from 'xlsx';


const Customers = (props) => {
    const { showHideLoding } = props;
    const [accessToken, setAccessToken] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [exportData, setExportData] = useState([]);


    //  const [id, setId] = useState("");
    const columnDefs = [

        { headerName: "Id", field: "itemId" },
        { headerName: "Name", field: "name" },
        { headerName: "Collage", field: "collage" },
        { headerName: "Age", field: "age" },
        // { headerName: "Name", field: "firstName" },
        // { headerName: "Email", field: "email" },
        // { headerName: "Created On", field: "insertDate" },
        // { headerName: "Received Bids", field: "recievedBids" },
        // { headerName: "Sent Bids", field: "sentBids" },
        // { headerName: "Device Type", field: "deviceType" },
        // { headerName: "Stripe Integrated", field: "isStripeIntegrated" },
        // { headerName: "Status", field: "status" },
        // {
        //   headerName: "Action",
        //   field: "action",
        //   cellRendererFramework: (params) => (
        //     <span>
        //       <i onClick={() => handleEditClick(params)} class="fas fa-light fa-edit" aria-hidden="true"></i>
        //       <i onClick={() => handleDeleteClick(params)} class="fas fa-trash-alt text-danger" aria-hidden="true"></i>
        //     </span>
        //   )
        // }
    ];
    const perPage = 20;
    // const rowData = [
    //   { name: "Toyota", email: "Celica", type: 35000 },
    //   { name: "Ford", email: "Mondeo", type: 32000 },
    //   { name: "Porsche", email: "Boxter", type: 72000 },
    //   { name: "Toyota", email: "Celica", type: 35000 },
    //   { name: "Ford", email: "Mondeo", type: 32000 },
    //   { name: "Porsche", email: "Boxter", type: 72000 }
    // ];

    const getData = async (params) => {
        setExportData([])
        // showHideLoding(true);
        // alert("startRow :" + params.startRow);
        const offset = 0;
        // const page = params.endRow / perPage;
        // alert("startRow :" + params.startRow);
        // alert("endRow :" + params.endRow);
        await GetUsers(perPage, offset, accessToken)
            .then((response) => {
                // showHideLoding(false);
                if (response.status === 200) {
                    let data = response.data.data.users;
                    params.successCallback(response.data.data.users, response.data.data.totalCount);
                    setExportData(data)
                }
            })
            .catch((err) => {
                // showHideLoding(false);
                params.successCallback([], 0);
            });
    };

    const handleEditClick = (params) => {
        console.log("some API call and state change");
        // alert("some API call and state change" + params.data.firstName);
    };
    const handleDeleteClick = (params) => {
        alert("some API call and state change");
    };
    const selectType = (event) => {
        console.log(event.target.value);
    };
    const exportExl = () => {
        // setIsOpen(true);
        var wb = XLSX.utils.book_new(),
            ws = XLSX.utils.json_to_sheet(exportData);
        XLSX.utils.book_append_sheet(wb, ws, 'mySheet');
        XLSX.writeFile(wb, "myExcel.xlsx")
    };

    const hidePop = () => {
        setIsOpen(false);
    };
    return (
        <div>
            {/* <Model isOpen={isOpen} hidePop={hidePop} /> */}
            <div class="container pb-3">
                <div class="row pt-3">
                    {/* <div class="col-sm-3">
            <input />
          </div> */}
                    <div class="col-sm-2">
                        <div class="form-group">
                            {/* <label for="search">Example select</label> */}
                            {/* <select class="form-control form-control-sm" onChange={(e) => selectType(e)} id="search">
                <option value="all">All</option>
                <option value="user">User</option>
                <option value="influencer">Influencer</option>
              </select> */}
                        </div>
                    </div>
                    <div class="col-sm-2">
                        {/* <button className="ps-2 pe-2 pg-btn btn-color rounded-pill">Search</button>
            <button className="ps-2 pe-2 pg-btn btn-color ms-1 rounded-pill">Reset</button> */}
                    </div>
                    <div class="col-sm-8 text-end">
                        <button className="ps-2 pe-2 pg-btn btn-color" onClick={() => exportExl()}>
                            Export Data
                        </button>
                    </div>
                </div>
            </div>
            <AgGrid columnDefs={columnDefs} getData={getData}></AgGrid>
        </div>
    );
};
export default Customers;

// export default login;
// const mapStateToProps = (state) => {
//   return {
//     loginUserInfo: state.login,
//     token: state.login.token
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     showHideLoding: (data) => dispatch(showHideLoding(data))
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Customers);

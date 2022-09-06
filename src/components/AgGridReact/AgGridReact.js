import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

// import { Nav } from "react-bootstrap";

function AgGrid(props) {
    const { columnDefs, rowData, getData } = props;
    const [gridApi, setGridApi] = useState(null);
    const [currentPage, setCurrentPage] = useState();
    const [totalPage, setTotalPage] = useState();
    const perPage = 10;
    useEffect(() => {
        if (gridApi) {
            const dataSource = {
                getRows: (params) => {
                    getData(params);
                }
            };

            gridApi.setDatasource(dataSource);
        }
    }, [gridApi]);

    const onGridReady = (params) => {
        setGridApi(params.api);
        params.api.sizeColumnsToFit();
    };
    const onPageSizeChanged = (newPageSize) => {
        // var value = document.getElementById("page-size").value;
        // gridApi.paginationSetPageSize(Number(value));
    };

    const onBtFirst = () => {
        // gridApi.paginationGoToFirstPage();
    };

    const onBtLast = () => {
        // gridApi.paginationGoToLastPage();
    };

    const onBtNext = () => {
        // gridApi.paginationGoToNextPage();
    };

    const onBtPrevious = () => {
        // gridApi.paginationGoToPreviousPage();
    };

    const onPaginationChanged = () => {
        console.log("onPaginationPageLoaded");
        if (gridApi) {
            // setCurrentPage(gridApi.paginationGetCurrentPage() + 1);
            // setTotalPage(gridApi.paginationGetTotalPages());
            // alert("qqqq :" + gridApi.paginationGetCurrentPage() + 1);
            // alert("cccc :" + gridApi.paginationGetTotalPages());
        }
    };
    return (
        <div
            className="ag-theme-balham"
        // style={{
        //   height: "200px"
        // }}
        >
            <AgGridReact
                headerHeight={50}
                columnDefs={columnDefs}
                rowData={null}
                rowHeight={50}
                pagination={true}
                rowModelType={"infinite"}
                paginationPageSize={perPage}
                cacheBlockSize={perPage}
                // paginationPageSize={2}
                domLayout="autoHeight"
                suppressPaginationPanel={true}
                // rowModelType="serverSide"
                onGridReady={onGridReady}
                onPaginationChanged={onPaginationChanged}
                overlayNoRowsTemplate={"overlayNoRowsTemplate"}
            ></AgGridReact>
            <div class="container">
                <div class="row pt-3">
                    <div class="col-sm">
                        <select className="p-2 pg-btn btn-color" onChange={() => onPageSizeChanged()} id="page-size">
                            {/* <option value="5">5</option> */}
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div class="col-sm text-right">
                        <button className="p-2 pg-btn btn-color" onClick={onBtPrevious}>
                            &lt;
                        </button>
                        <span className="font-14 m-2 pg-btn p-2 btn-color">
                            {currentPage}/{totalPage}
                        </span>
                        <button className="p-2 pg-btn btn-color" onClick={onBtNext}>
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AgGrid;

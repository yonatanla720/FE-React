import { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import Papa from "papaparse";

type formResponse = {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: string;
  city: string;
  zipCode: string;
  landline: string;
  cellularPhone: string;
  covid19Infected: boolean;
  previousConditions: never[];
  otherConditions: string;
};

const ResultsPage = () => {
  const [results, setResults] = useState<formResponse[]>([]);

  useEffect(() => {
    // Fetch results from the API
    fetch("http://localhost:8080/api/form-response")
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
      });
  }, []);

  const exportToCsv = () => {
    const csv = Papa.unparse(results);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "results.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const columns: GridColDef[] = [
    { field: "firstName", headerName: "First Name", minWidth: 100 },
    { field: "lastName", headerName: "Last Name", minWidth: 100 },
    {
      field: "dateOfBirth",
      headerName: "Date of Birth",
      minWidth: 100,
    },
    { field: "address", headerName: "Address", minWidth: 200 },
    { field: "city", headerName: "City", minWidth: 150 },
    { field: "zipCode", headerName: "Zip Code", minWidth: 100 },
    { field: "landline", headerName: "Landline", minWidth: 150 },
    {
      field: "cellularPhone",
      headerName: "Cellular Phone",
      minWidth: 150,
    },
    {
      field: "covid19Infected",
      headerName: "COVID-19 Infected",
      minWidth: 150,
      align: "center",
    },
    {
      field: "previousConditions",
      headerName: "Previous Conditions",
      minWidth: 250,
    },
    {
      field: "otherConditions",
      headerName: "Other Conditions",
      minWidth: 100,
    },
  ];

  const rows = results.map((result) => ({
    id: result.id,
    firstName: result.firstName,
    lastName: result.lastName,
    dateOfBirth: result.dateOfBirth,
    address: result.address,
    city: result.city,
    zipCode: result.zipCode,
    landline: result.landline,
    cellularPhone: result.cellularPhone,
    covid19Infected: result.covid19Infected ? "Yes" : "No",
    previousConditions: result.previousConditions.join(", "),
    otherConditions: result.otherConditions,
  }));

  return (
    <div style={{ paddingTop: "100px", width: "100%" }}>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <Typography variant="h4" component="h2" flex={1}>
          Results
        </Typography>
        <Button variant="contained" color="primary" onClick={exportToCsv}>
          Export CSV
        </Button>
      </div>

      <DataGrid
        style={{ backgroundColor: "White", width: "100%", display: "flex" }}
        columns={columns}
        rows={rows}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        pageSizeOptions={[10, 25, 50]}
      />
    </div>
  );
};

export default ResultsPage;

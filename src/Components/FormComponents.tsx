/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";

const CITIES_API = "https://countriesnow.space/api/v0.1/countries/cities";
const BACKED_API_URL = "http://localhost:8080/api/form-response";

const CITIES_API_DATA = {
  country: "nigeria",
};

const EMPTY_FORM_DATA = {
  ["firstName"]: "",
  ["lastName"]: "",
  ["dateOfBirth"]: "",
  ["address"]: "",
  ["city"]: "",
  ["zipCode"]: "",
  ["landline"]: "",
  ["cellularPhone"]: "",
  ["covid19Infected"]: false,
  ["previousConditions"]: [],
  ["otherConditions"]: "",
};

function FormComponent() {
  const [formData, setFormData] = useState(structuredClone(EMPTY_FORM_DATA));
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    fetch(CITIES_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(CITIES_API_DATA),
    })
      .then((response) => response.json())
      .then((data) => {
        const sortedCities: string[] = data.data;
        sortedCities.sort();
        setCities(sortedCities);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const form = useRef<HTMLFormElement>(null);

  const handleChange = (e: any) => {
    const { name, type, checked, value } = e.target;
    console.log(value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelect = (e: any) => {
    setFormData((prevData) => ({
      ...prevData,
      city: e.target.textContent,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetch(BACKED_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res: Response) => {
      if (res.ok) {
        alert("Your form has been submitted succesfully");
        form.current?.reset();
        setFormData(structuredClone(EMPTY_FORM_DATA));
      } else {
        alert("Something went wrong, please try again");
      }
    });
  };

  return (
    <Box>
      <h1>Citizen Health Form</h1>
      <form onSubmit={handleSubmit} className="formBody" ref={form}>
        <div style={{ flex: 1 }}>
          <TextField
            color="primary"
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Date of Birth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            style={{ width: "75%" }}
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            fullWidth
          />
          <Autocomplete
            options={cities}
            value={formData.city}
            onChange={handleSelect}
            renderInput={(params) => (
              <TextField
                {...params}
                name="city"
                label="City"
                style={{ width: "40%" }}
              />
            )}
          />
          <TextField
            style={{ width: "25%" }}
            label="Zip Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            style={{ width: "40%" }}
            label="Landline"
            name="landline"
            value={formData.landline}
            onChange={handleChange}
            required
          />
          <TextField
            style={{ width: "40%" }}
            size="medium"
            label="Cellular Phone"
            name="cellularPhone"
            value={formData.cellularPhone}
            onChange={handleChange}
            required
          />
          <Box>
            <FormControl fullWidth>
              <InputLabel>Previous Conditions</InputLabel>
              <Select
                size="small"
                name="previousConditions"
                value={formData.previousConditions}
                onChange={handleChange}
                multiple
              >
                <MenuItem value="Diabetes">Diabetes</MenuItem>
                <MenuItem value="Cardio-Vascular problems">
                  Cardio-Vascular problems
                </MenuItem>
                <MenuItem value="Allergies">Allergies</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Other Conditions"
              name="otherConditions"
              value={formData.otherConditions}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <FormControlLabel
              style={{ color: "black" }}
              control={
                <Checkbox
                  name="covid19Infected"
                  checked={formData.covid19Infected}
                  onChange={handleChange}
                />
              }
              label="Have you been infected by COVID-19 before?"
            />
          </Box>
          <Box>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </div>
      </form>
    </Box>
  );
}

export default FormComponent;

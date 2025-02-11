import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import UniqueVisitorCard from "./PoolPerformance";
import { useState } from "react";

const POOLS = {
  "1": {
    name: "WETH-USD-1w",
    address: "0x31f7da25361ad99ca4daa4e8709624660f324f48",
    start: 1631541600,
    end: 1688998703,
  },
  "2": {
    name: "WBTC-USD-1w",
    address: "0x13d5387389ac1a3b72391d88b03b893a945b17cd",
    start: 1631541600,
    end: 1717353143,
  },
  "3": {
    name: "WBTC-ETH-1w",
    address: "0xb0105f829d50841b949c274636c2d173a78db7e0",
    start: 1631541600,
    end: 1669025951,
  },
};

export default function DashboardDefault() {
  // Separate states for each chart
  const [selectedPoolPerformance, setSelectedPoolPerformance] = useState("1");
  const [userAddress, setUserAddress] = useState(""); // Store user address

  const handleAddressSave = () => {
    console.log("✅ Saved User Address:", userAddress);
    setUserAddress(userAddress); // Update only after clicking Save
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* ========= Pool Performance ========= */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <ButtonGroup color="primary" aria-label="Pools">
          {Object.entries(POOLS).map(([id, pool]) => (
            <Button
              key={id}
              onClick={() => setSelectedPoolPerformance(id)}
              variant={selectedPoolPerformance === id ? "contained" : "outlined"}
            >
              {pool.name}
            </Button>
          ))}
        </ButtonGroup>
      </Grid>

      <Grid item>
        <Typography variant="h5">Pool Performance</Typography>
      </Grid>

      <Grid item xs={12} md={7} lg={12}>
        <UniqueVisitorCard selectedPool={selectedPoolPerformance} userAddress = {""}/>
      </Grid>

      {/* ========= User Portfolio Value ========= */}
      <Grid item>
        <Typography variant="h5">User Portfolio Value</Typography>
      </Grid>

      {/* ========= TextField + Save Button ========= */}
      <Grid item xs={12} md={7} lg={12} sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <TextField
          label="Enter User Address"
          variant="outlined"
          fullWidth
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddressSave}>
          Plot
        </Button>
      </Grid>

      <Grid item xs={12} md={7} lg={12}>
        <UniqueVisitorCard selectedPool={null} userAddress ={userAddress} />
      </Grid>
    </Grid>
  );
}



// material-ui
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

// project import
import MainCard from '../../components/MainCard';
import IncomeAreaChart from './IncomeAreaChart';

// ==============================|| DEFAULT - UNIQUE VISITOR ||============================== //

export default function UniqueVisitorCard({ selectedPool ,userAddress}) {
  return (
    <>
      <Grid container alignItems="center" justifyContent="space-between">
      </Grid>
      <MainCard content={false} sx={{ mt: 1.5 ,width: "100%"}}>
        <Box sx={{ pt: 1, pr: 2 }}>
          <IncomeAreaChart selectedPool = {selectedPool} userAddress = {userAddress}/>
        </Box>
      </MainCard>
    </>
  );
}

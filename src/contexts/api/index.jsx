export const fetchPoolPerformanceData = async (selectedPool) => {
  if (!selectedPool) {
    console.error("❌ No pool selected");
    return { points: [], series: [] };
  }

  const POOLS = {
    "1": {
      name: "WETH-USD-1w",
      address: "0x31f7da25361ad99ca4daa4e8709624660f324f48",
      start: 1631541600,
      end: 1688998703
    },
    "2": {
      name: "WBTC-USD-1w",
      address: "0x13d5387389ac1a3b72391d88b03b893a945b17cd",
      start: 1631541600,
      end: 1717353143
    },
    "3": {
      name: "WBTC-ETH-1w",
      address: "0xb0105f829d50841b949c274636c2d173a78db7e0",
      start: 1631541600,
      end: 1669025951
    }
  };

  const selectedAddress = POOLS[selectedPool]?.address;
  const startPool = POOLS[selectedPool]?.start;
  const endPool = POOLS[selectedPool]?.end;
  if (!selectedAddress) {
    console.error("❌ Invalid pool ID:", selectedPool);
    return { points: [], series: [] };
  }

  const API_URL = `https://radiant-fjord-87733-0278092327b3.herokuapp.com/api/smartalpha/pools/${selectedAddress}/pool-performance-chart/${startPool}/${endPool}`;
    try {
      //console.log("📡 Fetching pool performance data from:", API_URL);
  
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      //console.log("✅ Raw API Response for pool performance:", responseData);
  
      // Ensure `data` exists and is an array
      if (!responseData || !responseData.data || !Array.isArray(responseData.data)) {
        console.error("❌ Unexpected API response format", responseData);
        return { points: [], series: [] };
      }
  
      // Extract time points and numerical series
      const points = responseData.data.map((entry) => entry.point);
      const series = [
        {
          name: "Junior without SA",
          data: responseData.data.map((entry) => parseFloat(entry.juniorWithoutSA) || 0),
        },
        {
          name: "Junior with SA",
          data: responseData.data.map((entry) => parseFloat(entry.juniorWithSA) || 0),
        },
        {
          name: "Senior without SA",
          data: responseData.data.map((entry) => parseFloat(entry.seniorWithoutSA) || 0),
        },
        {
          name: "Senior with SA",
          data: responseData.data.map((entry) => parseFloat(entry.seniorWithSA) || 0),
        },
        {
          name: "Token Price",
          data: responseData.data.map((entry) => parseFloat(entry.underlyingPrice) || 0),
        },
      ];
  
      const parsedData = { points, series };
      //console.log("✅ Parsed API Data:", parsedData);
      return parsedData;
    } catch (error) {
      console.error("❌ API Fetch Error:", error);
      return { points: [], series: [] };
    }
  };
  
  export const fetchUserPortfolioValue = async (userAddress) => {
    if (!userAddress) {
      console.error("❌ No user address provided");
      return { points: [], series: [] };
    }
  
    const API_URL = `https://radiant-fjord-87733-0278092327b3.herokuapp.com/api/smartalpha/users/${userAddress}/portfolio-value`;
  
    try {
      console.log("📡 Fetching User Portfolio Value from:", API_URL);
  
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      console.log("✅ Raw API user portfolio Response:", responseData);
  
      // Ensure responseData has required fields
      if (!responseData || typeof responseData !== "object") {
        console.error("❌ Unexpected API response format", responseData);
        return { points: [], series: [] };
      }
  
      // Extract time point and portfolio values
   const points = responseData.data.map((entry) => entry.point);
      const series = [
        {
          name: "Junior Value",
          data: responseData.data.map((entry) => parseFloat(entry.juniorValue) || 0),
        },
        {
          name: "Senior Value",
          data: responseData.data.map((entry) => parseFloat(entry.seniorValue) || 0),
        },
        {
          name: "Entry Queue Value",
          data: responseData.data.map((entry) => parseFloat(entry.entryQueueValue) || 0),
        },
        {
          name: "Exit Queue Value",
          data: responseData.data.map((entry) => parseFloat(entry.exitQueueValue) || 0),
        },
      ];
  
      const parsedData = { points, series };
      console.log("✅ Parsed API Data:", parsedData);
      return parsedData;
    } catch (error) {
      console.error("❌ API Fetch Error:", error);
      return { points: [], series: [] };
    }
  };
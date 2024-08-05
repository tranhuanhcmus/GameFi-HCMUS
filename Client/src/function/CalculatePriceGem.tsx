// Function to fetch ETH to USD conversion rate
const fetchEthToUsdcRate = async () => {
  try {
    const response = await fetch(
      "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD",
    );
    const data = await response.json();
    return data.USD; // Assuming the API returns the USD rate
  } catch (error) {
    console.error("Error fetching conversion rate:", error);
    return null; // Handle errors appropriately
  }
};

// Updated function to calculate price in USDC
export async function calculatePriceInUSDC(priceInGems: number) {
  const ETH_TO_GEMS_CONVERSION_RATE = 76000; // 1 ETH = 76,000 gems

  const ethToUsdcRate = await fetchEthToUsdcRate();
  if (ethToUsdcRate === null) {
    console.error("Failed to fetch ETH to USDC conversion rate.");
    return "0"; // Handle the error case as needed
  }

  // Convert price in gems to price in ETH
  const priceInETH = priceInGems / ETH_TO_GEMS_CONVERSION_RATE;

  // Convert price in ETH to price in USDC
  const priceInUSDC = priceInETH * ethToUsdcRate;

  return priceInUSDC.toFixed(2); // Return as a string with 2 decimal places
}

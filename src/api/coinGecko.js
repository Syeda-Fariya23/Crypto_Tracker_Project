const BASE_URL = "https://api.coingecko.com/api/v3";

export const fetchCryptos = async () => {
  const usdResponse = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  );
  const inrResponse=await fetch(
    `${BASE_URL}/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false`
   );

  if (!usdResponse.ok||!inrResponse.ok) {
    throw new Error("Failed to fetch cryptos");
  }
  const usdData=await usdResponse.json()
  const inrData=await inrResponse.json()

  return usdData.map((coin,index)=>({
    ...coin,
    inr_price:inrData[index].current_price,
    inr_market_cap:inrData[index].market_cap,
    inr_volume:inrData[index].total_volume,
  })) 
};

export const fetchCoinData = async (id) => {
  const response = await fetch(
    `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch coin data");
  }
  return response.json();
};

export const fetchChartData = async (id) => {
  const response = await fetch(
    `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=7`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch chart data");
  }
  return response.json();
};
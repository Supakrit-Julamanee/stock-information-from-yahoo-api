'use server';

export const fetchStock = async (symbol: string) => {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=max&interval=1mo`;

  const response = await fetch(url);
  

  console.log(response)

  if (!response.ok) {
    throw new Error('error');
  }

  const data = await response.json();
  return data;
};

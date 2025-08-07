import { testYahooFinanceAPI, fetchSP500Data } from "../groups/s-and-p-500/actions";

export default async function TestSP500Page() {
  let apiTestResult = "Testing...";
  let dataTestResult = "Testing...";
  
  try {
    const apiTest = await testYahooFinanceAPI();
    apiTestResult = apiTest ? "✅ Yahoo Finance API is working" : "❌ Yahoo Finance API failed";
    
    const data = await fetchSP500Data();
    dataTestResult = `✅ Fetched ${data.length} stocks successfully`;
  } catch (error) {
    apiTestResult = "❌ Error occurred during testing";
    dataTestResult = `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">S&P 500 API Test</h1>
      
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Yahoo Finance API Test</h2>
          <p className="text-gray-700">{apiTestResult}</p>
        </div>
        
        <div className="p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">S&P 500 Data Fetch Test</h2>
          <p className="text-gray-700">{dataTestResult}</p>
        </div>
      </div>
      
      <div className="mt-6">
        <a 
          href="/groups/s-and-p-500" 
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to S&P 500 Page
        </a>
      </div>
    </div>
  );
}

// client/src/components/ShipmentAnalyzer.tsx
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchShipment, analyzeShipment } from '../store/shipmentSlice';

const ShipmentAnalyzer: React.FC = () => {
  const [shipmentId, setShipmentId] = useState('');
  const dispatch = useAppDispatch();
  const { shipment, analysisResult, loading, error } = useAppSelector(state => state.shipment);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (shipmentId.trim()) {
      const resultAction = await dispatch(fetchShipment(shipmentId));
      
      if (fetchShipment.fulfilled.match(resultAction) && resultAction.payload) {
        // If we successfully fetched shipment data, analyze it
        dispatch(analyzeShipment(resultAction.payload));
      }
    }
  };

  // Function to render the analysis as formatted HTML
  const renderAnalysis = () => {
    if (!analysisResult?.analysis) return null;
    
    // Replace markdown-style headers and lists with HTML
    const formattedAnalysis = analysisResult.analysis
      .replace(/##\s(.*)/g, '<h2 class="text-xl font-semibold mt-4 mb-2">$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/(\d+)\.\s(.*)/g, '<div class="my-1">$1. $2</div>');
    
    return <div dangerouslySetInnerHTML={{ __html: formattedAnalysis }} />;
  };

  // Function to get color based on delay risk
  const getRiskColor = (risk: string) => {
    switch (risk?.toLowerCase()) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      default:
        return 'text-green-600';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">AI-Powered Shipment Analyzer</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="shipmentId" className="block text-sm font-medium text-gray-700 mb-1">
            Enter Shipment ID:
          </label>
          <div className="flex">
            <input
              id="shipmentId"
              type="text"
              value={shipmentId}
              onChange={(e) => setShipmentId(e.target.value)}
              className="flex-1 rounded-l-md border border-gray-300 shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter shipment ID (e.g., 123)"
            />
            <button
              type="submit"
              disabled={loading || !shipmentId.trim()}
              className="bg-blue-600 text-white font-medium py-2 px-4 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              {loading ? 'Loading...' : 'Analyze'}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {shipment && (
        <div className="mb-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium text-lg mb-2">Shipment Details</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-gray-600 text-sm">ID:</span>
              <div className="font-medium">{shipment.id}</div>
            </div>
            <div>
              <span className="text-gray-600 text-sm">Status:</span>
              <div className="font-medium">{shipment.status}</div>
            </div>
            <div>
              <span className="text-gray-600 text-sm">Location:</span>
              <div className="font-medium">{shipment.location}</div>
            </div>
            <div>
              <span className="text-gray-600 text-sm">ETA:</span>
              <div className="font-medium">{shipment.eta}</div>
            </div>
          </div>
        </div>
      )}

      {loading && <div className="text-center py-4">Analyzing shipment data...</div>}

      {analysisResult && (
        <div className="border rounded-md overflow-hidden">
          <div className="bg-gray-100 p-3 border-b">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">AI Analysis Results</h3>
              {analysisResult.delayRisk && (
                <div className={`font-medium ${getRiskColor(analysisResult.delayRisk)}`}>
                  {analysisResult.delayRisk.toUpperCase()} RISK
                </div>
              )}
            </div>
          </div>
          
          <div className="p-4">
            {analysisResult.weatherData && (
              <div className="mb-4 p-3 bg-blue-50 rounded-md">
                <h4 className="text-sm font-medium text-blue-800 mb-1">Current Weather</h4>
                <div className="flex items-center">
                  <div className="mr-3">
                    {analysisResult.weatherData.current.condition.icon && (
                      <img 
                        src={analysisResult.weatherData.current.condition.icon} 
                        alt={analysisResult.weatherData.current.condition.text}
                        className="w-10 h-10"
                      />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{analysisResult.weatherData.current.condition.text}</div>
                    <div className="text-sm text-gray-600">
                      {analysisResult.weatherData.current.temp_f}°F, Wind: {analysisResult.weatherData.current.wind_mph} mph
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="prose prose-sm max-w-none">
              {renderAnalysis()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShipmentAnalyzer;
// client/src/components/RouteOptimizer.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface DeliveryLocation {
  id: string;
  name: string;
  address: string;
  timeWindow?: string;
  priority?: number;
}

const RouteOptimizer: React.FC = () => {
  const [startingLocation, setStartingLocation] = useState('');
  const [locations, setLocations] = useState<DeliveryLocation[]>([
    { id: '1', name: '', address: '', timeWindow: '', priority: 0 }
  ]);
  const [constraints, setConstraints] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle location changes
  const handleLocationChange = (index: number, field: keyof DeliveryLocation, value: string | number) => {
    const updatedLocations = [...locations];
    updatedLocations[index] = {
      ...updatedLocations[index],
      [field]: value
    };
    setLocations(updatedLocations);
  };

  // Add new location
  const addLocation = () => {
    setLocations([
      ...locations,
      { id: String(locations.length + 1), name: '', address: '', timeWindow: '', priority: 0 }
    ]);
  };

  // Remove a location
  const removeLocation = (index: number) => {
    if (locations.length > 1) {
      const updatedLocations = [...locations];
      updatedLocations.splice(index, 1);
      // Update IDs to be sequential
      const renumbered = updatedLocations.map((loc, idx) => ({
        ...loc,
        id: String(idx + 1)
      }));
      setLocations(renumbered);
    }
  };

  // Submit for optimization
  const handleOptimizeRoute = async () => {
    if (!startingLocation.trim() || locations.some(loc => !loc.name || !loc.address)) {
      setError('Please complete all required fields');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/api/route/optimize', {
        startingLocation,
        deliveryLocations: locations,
        constraints
      });
      
      if (response.data.success) {
        setAnalysis(response.data.analysis);
      } else {
        setError('Route optimization failed');
      }
    } catch (err) {
      console.error('Error optimizing route:', err);
      setError('Failed to optimize route');
    } finally {
      setLoading(false);
    }
  };

  // Function to render the analysis as formatted HTML
  const renderAnalysis = () => {
    if (!analysis) return null;
    
    // Replace markdown-style formatting with HTML
    const formattedAnalysis = analysis
      .replace(/##\s(.*)/g, '<h2 class="text-xl font-semibold mt-4 mb-2">$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/- (.*)/g, '<li class="ml-4">$1</li>')
      .replace(/<li class="ml-4">(.*?)<\/li>/g, (match) => 
        match.includes('<li class="ml-4">') ? match : `<ul class="list-disc mb-2">${match}</ul>`
      );
    
    return <div dangerouslySetInnerHTML={{ __html: formattedAnalysis }} />;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-semibold mb-4">AI Route Optimization (Powered by Claude)</h2>
      
      <div className="mb-4">
        <label htmlFor="startingLocation" className="block text-sm font-medium text-gray-700 mb-1">
          Starting Warehouse/Depot Location:
        </label>
        <input
          id="startingLocation"
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={startingLocation}
          onChange={(e) => setStartingLocation(e.target.value)}
          placeholder="123 Main St, Anytown, CA 12345"
        />
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">Delivery Locations:</h3>
          <button
            type="button"
            onClick={addLocation}
            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
          >
            + Add Location
          </button>
        </div>
        
        {locations.map((location, index) => (
          <div key={index} className="p-3 border border-gray-200 rounded-md mb-3">
            <div className="flex justify-between">
              <h4 className="font-medium">Location {index + 1}</h4>
              {locations.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLocation(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name:
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={location.name}
                  onChange={(e) => handleLocationChange(index, 'name', e.target.value)}
                  placeholder="Acme Corp"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address:
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={location.address}
                  onChange={(e) => handleLocationChange(index, 'address', e.target.value)}
                  placeholder="456 Oak St, Anytown, CA 12345"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time Window (optional):
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={location.timeWindow || ''}
                  onChange={(e) => handleLocationChange(index, 'timeWindow', e.target.value)}
                  placeholder="9AM-12PM"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority (0-10):
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={location.priority || 0}
                  onChange={(e) => handleLocationChange(index, 'priority', parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mb-4">
        <label htmlFor="constraints" className="block text-sm font-medium text-gray-700 mb-1">
          Constraints & Considerations:
        </label>
        <textarea
          id="constraints"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={constraints}
          onChange={(e) => setConstraints(e.target.value)}
          placeholder="Driver availability: 8AM-5PM, 30 minute lunch break required, avoid downtown during rush hour 4-6PM, etc."
        />
      </div>
      
      <button
        onClick={handleOptimizeRoute}
        disabled={loading || !startingLocation.trim()}
        className="bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
      >
        {loading ? 'Optimizing...' : 'Optimize Route with Claude'}
      </button>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {analysis && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="font-medium text-lg mb-3">Route Optimization Results</h3>
          <div className="prose prose-sm max-w-none">
            {renderAnalysis()}
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteOptimizer;
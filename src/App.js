import { useState } from 'react';

const airports = [
  "BGI", "CDG", "DEL", "DOH", "DSM", "EWR", "EYW", "HND", "ICN",
  "JFK", "LGA", "LHR", "ORD", "SAN", "SFO", "SIN", "TLV", "BUD"
]

const routes = [
  ["DSM", "ORD"],
  ["ORD", "BGI"],
  ["BGI", "LGA"],
  ["SIN", "CDG"],
  ["CDG", "SIN"],
  ["CDG", "BUD"],
  ["DEL", "DOH"],
  ["DEL", "CDG"],
  ["TLV", "DEL"],
  ["EWR", "HND"],
  ["HND", "ICN"],
  ["HND", "JFK"],
  ["ICN", "JFK"],
  ["JFK", "LGA"],
  ["EYW", "LHR"],
  ["LHR", "SFO"],
  ["SFO", "SAN"],
  ["SFO", "DSM"],
  ["SAN", "EYW"]
];

const App = () => {
  const [shortestPath, setShortestPath] = useState([]);           // List of airports on the path
  const [distance, setDistance] = useState(0);                    // Number of airports on path
  const [startingAirport, setStart] = useState("DSM");            // Departure airport
  const [destinationAirport, setDestination] = useState("LGA");   // Arrival airport

  const handleStart = (event) => {
    setStart(event.target.value);
  };

  const handleDestination = (event) => {
    setDestination(event.target.value);
  };

  const findPath = () => {
    const path = findShortestPath(startingAirport, destinationAirport);
    setShortestPath(path);
    setDistance(path.length - 1); // -1 because starting airport is not included in the path
  };
  
  // Finding the shortest path based on Graph traversal algorithm - Breadth-First Search (BFS):
  // guarantees finding the shortest path between two vertices.
  // Idea: Start with one vertex and add all its adjacent vertices to the queue.
  // Then, while the queue is not empty, take vertices from it and go around their adjacent vertices.
  function findShortestPath(start, end) {
    const queue = [[start]];
    const visited = new Set();

    while (queue.length) {
      const path = queue.shift();
      const currentAirport = path[path.length - 1];

      if (currentAirport === end) {
        return path;
      }

      if (!visited.has(currentAirport)) {
        visited.add(currentAirport);

        for (const route of routes) {
          if (route[0] === currentAirport) {
            queue.push([...path, route[1]]);
          }
        }
      }
    }

    return [];
  }

  return (
    <div>
      <h2>Airports</h2>
    From: <select value={startingAirport} size="5" onChange={handleStart}>
                {airports.map((airport) => (
            <option key={airport} value={airport}>{airport}</option>
          ))}
    </select>

    To: <select value={destinationAirport} size="5" onChange={handleDestination}>
                {airports.map((airport) => (
            <option key={airport} value={airport}>{airport}</option>
          ))}
    </select>

    <button onClick={findPath}>Find Path</button>

      <div>
        <h2>Path from {startingAirport} to {destinationAirport}:</h2>
        <ul>
          {shortestPath.map((airport) => (
            <li key={airport}>{airport}</li>
          ))}
        </ul>
        <p>Number of transfers: {distance === -1 ? "No path" : distance}</p>
      </div>
    </div>
  );
}

export default App;


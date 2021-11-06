import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Bar } from 'react-chartjs-2';


function getLabels(data) {
  let labels = [];

  data.forEach((time) => {
    labels.push(time.x);
  });

  return labels;
}

function App() {

  const [graphData, setGraphData] = React.useState(null);
  const [totalShakes, setTotalShakes] = React.useState(null);
  const [amountEarned, setAmountEarned] = React.useState(null);

  let labels = [];
  React.useEffect(() => {
    fetch("/api/shakes")
      .then((res) => res.json())
      .then((data) => {
        labels = getLabels(data.graphData);
        setGraphData(data.graphData)
        setTotalShakes(data.totalShakes)
        setAmountEarned(data.amountEarned)
      });
  }, []);

  const barData = {
    labels: labels,
    datasets: [
      {
        label: 'Shakes',
        data: graphData,
        borderWidth: 1,
        backgroundColor: ["#009FFF"],
      },
    ],
    responsive: true,
  };

  return ( 
    <div className="App">
      <div>Total shakes: {totalShakes}</div>
      <div>Total earned from shakes: {amountEarned} BTC</div>
      <Bar data={barData}  />
    </div>
  );
}

export default App;
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

  const [data, setData] = React.useState(null);

  let labels = [];
  React.useEffect(() => {
    fetch("/api/shakes")
      .then((res) => res.json())
      .then((data) => {
        labels = getLabels(data);
        setData(data)
      });
  }, []);

  const barData = {
    labels: labels,
    datasets: [
      {
        label: 'Shakes',
        data: data,
        borderWidth: 1,
        backgroundColor: ["#009FFF"],
      },
    ],
    responsive: true,
  };

  return ( 
    <div className="App">
      <Bar data={barData}  />
    </div>
  );
}

export default App;
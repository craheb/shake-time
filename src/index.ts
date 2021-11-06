import express from "express";
import BarGraph from './models/BarGraph'

const PORT = process.env.PORT || 8080;

const app = express();

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Boom!" );
} );

app.get("/api/shakes", (req, res) => {
  const barGraph = new BarGraph();

  barGraph.getGraphData().then((data) => {
    res.json({
      graphData: data.graphData, 
      amountEarned: data.amountEarned, 
      totalShakes: data.totalShakes
    });
  });
});

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server listening on ${PORT}`);
});
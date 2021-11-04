// This class handles returning data for the bar graph
import ShakepayAPI from './../services/ShakepayAPI';

interface GraphData {
  x: string,
  y: number,
}

export default class BarGraph {

  // covert associative array to graph data
  getGraphData() {
    const data: Promise<GraphData[]> = new Promise((resolve, reject) => {
      let graphData: Array<GraphData> = [];
      let total_shakes = 0;

      // TODO: find a better way to DI this
      const api = new ShakepayAPI();
      api.getShakeTimeData().then((data) => {

        Object.keys(data).forEach(key => {
          // chartJS
          graphData.push({x: key, y: data[key]});

          // TODO: provide this to frontend to display
          total_shakes += data[key];
        });

        resolve(graphData);
      });
    });

    return data;
  }
}

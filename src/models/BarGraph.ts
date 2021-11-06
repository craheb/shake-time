// This class handles returning data for the bar graph
import ShakepayAPI from './../services/ShakepayAPI';

interface GraphData {
  x: string,
  y: number,
}

interface PageData {
    graphData: GraphData[],
    amountEarned: number,
    totalShakes: number,
}

export default class BarGraph {

  // covert associative array to graph data
  getGraphData() {
    const data: Promise<PageData> = new Promise((resolve, reject) => {
      let graphData: Array<GraphData> = [];

      // TODO: find a better way to DI this
      const api = new ShakepayAPI();
      api.getShakeTimeData().then((data) => {

        Object.keys(data.chartData).forEach(key => {
          // chartJS
          graphData.push({x: key, y: data.chartData[key]});
        });

        resolve({graphData, amountEarned: data.amountEarned, totalShakes: data.totalShakes});
      });
    });

    return data;
  }
}

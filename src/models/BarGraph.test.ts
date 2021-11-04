import BarGraph from "./BarGraph";

const mockGetShakeTimeData = jest.fn().mockImplementation(() => {
  return new Promise((resolve, reject) => {
    let chartData: any = [];
    chartData['00:00'] = 0;
    chartData['00:30'] = 10;
    resolve(chartData);
  });
});

jest.mock('./../services/ShakepayAPI', () => {
  return jest.fn().mockImplementation(() => {
    return {getShakeTimeData: mockGetShakeTimeData};
  });
});

describe("test Bargraph data", () => {
  it("parse data correctly", () => {
    const barGraph = new BarGraph();
    barGraph.getGraphData().then(data => {
      expect(data).toEqual([{x: '00:00', y: 0}, {x: '00:30', y: 10}])
    });
  });

  // TODO: write more test scenarios
  it("parse data correctly when no data present", () => {});
  
});
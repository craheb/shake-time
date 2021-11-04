"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShakepayAPI = void 0;
// This class will currently pull data from a CSV provided.
// Ideally a rest API would be hit to get this data on the fly
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const csv = __importStar(require("fast-csv"));
class ShakepayAPI {
    constructor() {
        this.fileName = "transactions_summary.csv";
    }
    getShakeTimeData() {
        let records = this.getRecords();
        this.initChartData();
    }
    // TODO: pull chart data specific things into own class/model
    initChartData() {
        var time = new Date();
        time.setHours(0, 0, 0, 0);
        let chartData;
        chartData.push({ x: '12:00 AM', y: 0 });
        console.log(time);
        // chartData[time.getHours().toString() + ' ' + time.getMinutes()] = 0;
        // // clean this up to actually use time, not ints
        // while(time.getHours()) {
        // }
        // .setMinutes(theAdd.getMinutes() + 30)
    }
    // Get records from file
    getRecords() {
        let records;
        fs.createReadStream(path.resolve(__dirname, '../../data', this.fileName))
            .pipe(csv.parse({ headers: true }))
            .on('error', error => console.error(error))
            .on('data', row => {
            records.push(row);
        })
            .on('end', (rowCount) => console.log(`Parsed ${rowCount} rows`));
        return records;
    }
}
exports.ShakepayAPI = ShakepayAPI;
//# sourceMappingURL=ShakepayAPI.js.map
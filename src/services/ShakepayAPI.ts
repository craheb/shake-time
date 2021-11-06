// This class will currently pull data from a CSV provided.
// Ideally a rest API would be hit to get this data on the fly
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';

interface ShakepayTransaction {
  'Transaction Type': string,
  'Date': string,
  'Amount Debited': string,
  'Debit Currency': string,
  'Amount Credited': string,
  'Credit Currency': string,
  'Buy / Sell Rate': string,
  'Direction': string,
  'Spot Rate': string,
  'Source / Destination': string,
  'Blockchain Transaction ID': string,
}

interface ShakepayData {
  trans: ShakepayTransaction[],
  amountEarned: number,
  totalShakes: number,
}

export default class ShakepayAPI {

  fileName = "transactions_summary.csv";

  // get number of shakes per half hour in associative array
  async getShakeTimeData() : Promise<any>
  {
    return this.getAllTransactions('shakingsats').then( (data) => {
      let chartData = this.initTransactionData();
      let amountEarned = data.amountEarned;
      let totalShakes = data.totalShakes;
      data.trans.forEach(transaction => {

        let date = new Date(Date.parse(transaction.Date.replace('+00', '+00:00')));
        let minutes;

        if (date.getMinutes() >= 0 && date.getMinutes() <= 29) {
          minutes = '00';
        } else {
          minutes = '30';
        }

        let key: any = ('0' + date.getHours()).slice(-2) + ":" + minutes;

        chartData[key]++;
      });

      return {chartData, amountEarned, totalShakes};
    });
  }

  initTransactionData() : Array<number>
  {
    let chartData = [];

    // initial start time
    var date = new Date();
    date.setHours(0, 0, 0, 0);

    // jenky way of getting all time slots, this will need to change if we decide to change interval
    for (let i = 0; i < 48; i++) {
      let key: any = ('0' + date.getHours()).slice(-2) + ":" + ('0' + date.getMinutes()).slice(-2);
      chartData[key] = 0;

      date.setMinutes(date.getMinutes() + 30);
    }

    return chartData;
  }

  // Get records from file
  getAllTransactions(transactionFilter = '') : Promise<ShakepayData>
  {
    // TODO: check if file exists first
    const transactions: Promise<ShakepayData> = new Promise((resolve, reject) => {
      let trans: Array<ShakepayTransaction> = [];
      let amountEarned = 0;
      let totalShakes = 0;

      fs.createReadStream(path.resolve(__dirname, '../../data', this.fileName))
        .pipe(csv.parse({ headers: true }))
        .on('error', error => {
          // TODO: better error handling
          console.error(error)
        })
        .on('data', row => {
          if (transactionFilter) {
            if (transactionFilter === row['Transaction Type']) {
              trans.push(row);

              // get amount of bitcoin earn from shaking
              amountEarned += parseFloat(row['Amount Credited']);
              totalShakes++;
            }
          } else {
            trans.push(row);
          }
          
        })
        .on('end', (rowCount: number) => {
          resolve({trans, totalShakes, amountEarned: +amountEarned.toFixed(8)});
        });
      });
    return transactions;
  }
}


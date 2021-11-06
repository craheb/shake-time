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

export default class ShakepayAPI {

  fileName = "transactions_summary.csv";

  // get number of shakes per half hour in associative array
  async getShakeTimeData() : Promise<any>
  {
    return this.getAllTransactions('shakingsats').then( (transactions) => {
      let chartData = this.initTransactionData();
      transactions.forEach(transaction => {

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

      return chartData;
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
  getAllTransactions(transactionFilter = '') : Promise<ShakepayTransaction[]>
  {
    // TODO: check if file exists first
    const transactions: Promise<ShakepayTransaction[]> = new Promise((resolve, reject) => {
      let trans: Array<ShakepayTransaction> = [];
      let amount_earned = 0;

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
              amount_earned += parseFloat(row['Amount Credited']);
            }
          } else {
            trans.push(row);
          }
          
        })
        .on('end', (rowCount: number) => {
          // TODO: get amount earned out and display to front end
          console.log(`Total BTC earned from shaking ${amount_earned.toFixed(8)}`);
          resolve(trans);
        });
      });
    return transactions;
  }
}


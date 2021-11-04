This app lets you view the time of day you shake most in form a bar graph.

An export of your transactions is needed and act as the api.

We do not store your transaction data, we only parse it. Do not share your transactions file or commit to git.

# Setup
1. Clone repo
2. Download transaction history from Shakepay
3. Place `transactions_summary.csv` in the `/data` directory
4. In root:
    1. run `npm install`
    2. run `npm run start:dev` to start the backend
5. In client: 
    1. run `npm install`
    2. run `npm run start` to start the frontend
6. Hit http://localhost:3000/

## Testing
Unit tests

In Root, run `npm run tests`

Cypress tests

In Client, run  `npx cypress run` or `npx cypress open`

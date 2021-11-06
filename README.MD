This app lets you view the time of day you shake most in form a bar graph.
![Screen Shot 2021-11-06 at 12 20 10 AM](https://user-images.githubusercontent.com/2626278/140597471-6bac77e9-2c36-4a55-962f-8055b38d4945.png)


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

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ShakepayAPI_1 = require("./services/ShakepayAPI");
const PORT = process.env.PORT || 8080;
const app = (0, express_1.default)();
// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});
app.get("/api", (req, res) => {
    const shakepayAPI = new ShakepayAPI_1.ShakepayAPI();
    shakepayAPI.getShakeTimeData();
    console.log('wtf');
    res.json({ message: "could get data from here" });
});
app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server listening on ${PORT}`);
});
//# sourceMappingURL=index.js.map
import jsonServer from "json-server";
import pieSets from "./db/pie-sets.json";
import pieSetDetail from "./db/pie-set-detail.json";
import customizePieSet from "./db/customize-pie-set.json";
import pieSetConstituents from "./db/pie-set-constituents.json";
import piePerformance from "./db/pie-set-performance.json";
import pieReturns from "./db/pie-set-returns.json";
import customizeKingPie from "./db/customize-king-pie.json";
import referral from "./db/referral.json";
import walletBalances from "./db/wallet-balances.json";
import walletOverallAssets from "./db/wallet-overall-assets.json";
import walletAssetsUsd from "./db/wallet-assets-usd.json";
import walletAssetsCoin from "./db/wallet-assets-coin.json";
import marketCoinList from "./db/market-coin-list.json";
import pairsList from "./db/excahnge-pairs-list.json";

const server = jsonServer.create();
const dashboardRouter = jsonServer.router("./db/dashboard.json");
const piefolioRouter = jsonServer.router("./db/piefolio.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

/* Manual delay */
server.use(function (req, res, next) {
  setTimeout(next, 1200);
});

/* Auth */
server.post("/auth/pre-login", (_, res) => {
  return res.send({
    isTwoFactorAuth: true,
  });
});
server.post("/auth/login", (_, res) => {
  return res.send({
    tokens: {
      access: "xxxx",
    },
    username: "tarunkarmakar",
    firstName: "Tarun",
    lastName: "Karmakar",
    email: "tarunkarmakar@senpie.com",
    isEmailVerified: true,
    isPhoneVerified: true,
  });
});
server.post("/auth/register", (_, res) => {
  return res.send({
    message: "Please check your email...",
  });
});
server.post("/auth/otp-call", (_, res) => {
  return res.send({
    message: "",
  });
});
server.post("/auth/register/verify-otp", (_, res) => {
  return res.send({
    tokens: {
      access: "xxxx",
    },
    username: "tarunkarmakar",
    email: "tarunkarmakar@senpie.com",
    isEmailVerified: true,
    isPhoneVerified: true,
  });
});
server.post("/auth/reset-password/send-otp", (_, res) => {
  return res.send({});
});
server.post("/auth/reset-password/reset", (_, res) => {
  return res.send({});
});

/* Dashboard */
server.use("/dashboard", dashboardRouter);

/* Piefolio */
server.get("/piefolio/king-pie/customize", (_, res) =>
  res.send(customizeKingPie)
);
server.post("/piefolio/king-pie/add-funds", (_, res) => res.send({}));
server.post("/piefolio/king-pie/sell-funds", (_, res) => res.send({}));
server.post("/piefolio/king-pie/book-profit", (_, res) => res.send({}));
server.use("/piefolio", piefolioRouter);

/* PieSets */
server.get("/pie-sets", (_, res) => res.send(pieSets));
server.get("/pie-sets/:id", (_, res) => res.send(pieSetDetail));
server.get("/pie-sets/constituents/:id", (_, res) =>
  res.send(pieSetConstituents)
);
server.get("/pie-sets/performance-graph/:id", (_, res) =>
  res.send(piePerformance)
);
server.get("/pie-sets/returns/:id", (_, res) => res.send(pieReturns));
server.get("/pie-sets/customize/:id", (_, res) => res.send(customizePieSet));

/* Referral */
server.get("/referral", (_, res) => res.send(referral));

/* Wallet */
server.get("/wallet/balances", (_, res) => res.send(walletBalances));
server.get("/wallet/overall-assets", (_, res) => res.send(walletOverallAssets));
server.get("/wallet/wallet-assets/usd", (_, res) => res.send(walletAssetsUsd));
server.get("/wallet/wallet-assets/coin", (_, res) =>
  res.send(walletAssetsCoin)
);

/* Market */
server.get("/market/coin-list", (_, res) => res.send(marketCoinList));

/* Exchange */
server.get("/exchange/pairs-list", (_, res) => res.send(pairsList));

server.listen(8000, () => {
  console.log("JSON Server is running on 8000");
});

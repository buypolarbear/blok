import axios from "axios";

// -- MARKET API ------------------------------------------------------------------ //
// https://coinmarketcap.com/api/
const marketApi = axios.create({
  baseURL: "https://api.coinmarketcap.com/v1/ticker",
  timeout: 1000
});

export const apiGetExchangeRate = (currency: string) =>
  marketApi.get(`?convert=${currency}&limit=50`);

// --- BTC API --------------------------------------------------------------------------- //
// https://blockchain.info/api/blockchain_api
const btcApi = axios.create({ baseURL: "https://blockchain.info", timeout: 10000 });

/**
 * Fetch single bitcoin address data
 * @param address
 */
export const apiGetBtcAddress = (address: string) => btcApi.get(`/rawaddr/${address}`);

/**
 * Fetch multiple BTC addresses data
 * @param addresses
 */
export const apiGetBtcAddresses = (addresses: string) =>
  btcApi.get(`/multiaddr?active=${addresses}`);

// --- ETH API --------------------------------------------------------------------------- //
// https://etherscan.io/apis
const ethApiKey = `&apikey=685EHER84WHHDE119XGAQ33DC14HZ2TSY6`;
const ethApi = axios.create({
  baseURL: `https://api.etherscan.io`,
  timeout: 10000
});

/**
 * Get ETH address balance
 * @param address
 */
export const apiGetEthAddress = (address: string) =>
  ethApi.get(`/api?module=account&action=balance&address=${address}&tag=latest${ethApiKey}`);

/**
 * Get multiple ETH addresses data
 * @param addresses
 */
export const apiGetEthAddresses = (addresses: string) =>
  ethApi.get(`/api?module=account&action=balancemulti&address=${addresses}&tag=latest${ethApiKey}`);

// --- LTC API --------------------------------------------------------------------------- //
// https://chainz.cryptoid.info/api.dws
// const ltcApiKey = "754f51d0021c";

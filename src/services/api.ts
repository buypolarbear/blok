import axios from "axios";

// --- BTC API --- //
const btcApi = axios.create({ baseURL: "https://blockchain.info", timeout: 10000 });

/**
 * Fetch single bitcoin address data
 * @param address
 */
export const apiGetBtcAddress = (address: string) => btcApi.get(`/rawaddr/${address}`);

/**
 * Fetch multiple bitcoin addresses data
 * @param addresses
 */
export const apiGetBtcAddresses = (addresses: string) =>
  btcApi.get(`/multiaddr?active=${addresses}`);

// --- ETH API --- //
const ethApi = axios.create({ baseURL: "https://api.etherscan.io", timeout: 10000 });
// const ethApiKey = `&apikey=685EHER84WHHDE119XGAQ33DC14HZ2TSY6`;

/**
 * Get ETH address balance
 * @param address
 */
export const apiGetEthAddressBalance = (address: string) =>
  ethApi.get(`/api?module=account&action=balance&address=${address}`);

/**
 * Get ETH address transactions
 * @param address
 */
export const apiGetEthAddressTransactions = (address: string) =>
  ethApi.get(`/api?module=account&action=txlist&offset=50&address=${address}`);

/**
 * Fetch single ETH address data
 * @param address
 */
export const apiGetEthAddress = (address: string) =>
  Promise.all([apiGetEthAddressBalance(address), apiGetEthAddressTransactions(address)]);

// -- LTC API -- //
// const ltcApiKey = "754f51d0021c";

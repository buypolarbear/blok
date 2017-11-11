import axios from "axios";

// --- BTC API --- //
const btcApi = axios.create({ baseURL: "https://blockchain.info", timeout: 10000 });

/**
 * Fetch single bitcoin address data
 * @param address
 */
export const apiGetBtcAddress = (publicAddress: string) => btcApi.get(`/rawaddr/${publicAddress}`);

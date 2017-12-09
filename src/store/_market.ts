import { observable, action } from "mobx";
import { AsyncStorage } from "react-native";
import { TICKER, EXCHANGE } from "../services/enums";
import { apiGetExchangeRate } from "../services/api";
import { getPrice } from "../services/utilities";
import { Market } from "../services/interfaces";

class MarketStore implements Market.MarketStore {
  // --- store --- //
  @observable exchange = EXCHANGE.USD;
  @observable btcPrice = 0;
  @observable ethPrice = 0;
  @observable ltcPrice = 0;
  @observable xrpPrice = 0;
  @observable dashPrice = 0;
  @observable steemPrice = 0;

  // --- actions --- //
  @action setBtcPrice = (price: number) => (this.btcPrice = price);
  @action setEthPrice = (price: number) => (this.ethPrice = price);
  @action setLtcPrice = (price: number) => (this.ltcPrice = price);
  @action setXrpPrice = (price: number) => (this.xrpPrice = price);
  @action setDashPrice = (price: number) => (this.dashPrice = price);
  @action setSteemPrice = (price: number) => (this.steemPrice = price);
  @action setExchange = (exchange: EXCHANGE) => (this.exchange = exchange);

  // --- methods --- //
  getMarketPrices = async () => {
    try {
      const { data } = await apiGetExchangeRate(this.exchange);
      this.setBtcPrice(Number(getPrice(data, this.exchange, TICKER.BTC)));
      this.setEthPrice(Number(getPrice(data, this.exchange, TICKER.ETH)));
      this.setLtcPrice(Number(getPrice(data, this.exchange, TICKER.LTC)));
      this.setXrpPrice(Number(getPrice(data, this.exchange, TICKER.XRP)));
      this.setDashPrice(Number(getPrice(data, this.exchange, TICKER.DASH)));
      this.setSteemPrice(Number(getPrice(data, this.exchange, TICKER.STEEM)));
    } catch (e) {
      console.warn(e);
      throw new Error("Unable to refresh market prices");
    }
  };

  getFromDevice = async () => {
    const data = await AsyncStorage.getItem("@blok:MarketStore");
    return JSON.parse(data) || null;
  };

  setOnDevice = async () =>
    await AsyncStorage.setItem(
      "@blok:MarketStore",
      JSON.stringify({
        exchange: this.exchange,
        btcPrice: this.btcPrice,
        ethPrice: this.ethPrice,
        ltcPrice: this.ltcPrice,
        xrpPrice: this.xrpPrice,
        dashPrice: this.dashPrice,
        steemPrice: this.steemPrice
      })
    );
}

export default MarketStore;

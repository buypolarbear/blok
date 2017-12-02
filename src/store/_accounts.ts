import { observable, action } from "mobx";
import { Alert, AsyncStorage } from "react-native";
import { TICKER, EXCHANGE } from "../services/enums";
import { alertError, getPrice } from "../services/utilities";
import { Accounts } from "../services/interfaces";
import { apiGetExchangeRate } from "../services/api";

class AccountsStore implements Accounts.AccountsStore {
  // -- constructor -- //
  router: Accounts.AccountsStore["router"];
  btc: Accounts.AccountsStore["btc"];
  eth: Accounts.AccountsStore["eth"];

  constructor(
    router: Accounts.AccountsStore["router"],
    btc: Accounts.AccountsStore["btc"],
    eth: Accounts.AccountsStore["eth"]
  ) {
    this.router = router;
    this.btc = btc;
    this.eth = eth;
  }

  // --- store --- //
  @observable fetching = false;
  @observable exchange = EXCHANGE.USD;
  @observable btcPrice = 0;
  @observable ethPrice = 0;
  @observable ltcPrice = 0;
  @observable dashPrice = 0;
  @observable xrpPrice = 0;
  @observable steemPrice = 0;

  // --- actions --- //
  @action setFetching = (state: boolean) => (this.fetching = state);
  @action updateBtcPrice = (price: number) => (this.btcPrice = price);
  @action updateEthPrice = (price: number) => (this.ethPrice = price);
  @action updateLtcPrice = (price: number) => (this.ltcPrice = price);
  @action updateXrpPrice = (price: number) => (this.xrpPrice = price);
  @action updateDashPrice = (price: number) => (this.dashPrice = price);
  @action updateSteemPrice = (price: number) => (this.steemPrice = price);

  // --- methods --- //
  getAccountsFromMemory = async () => {
    try {
      this.setFetching(true);
      await this.btc.getStoreFromMemory();
      await this.eth.getStoreFromMemory();
      const data = await this.getFromDevice();
      this.updateBtcPrice(data.btcPrice);
      this.updateEthPrice(data.ethPrice);
      this.updateLtcPrice(data.ltcPrice);
      this.updateXrpPrice(data.updateXrpPrice);
      this.updateDashPrice(data.dashPrice);
      this.updateSteemPrice(data.steemPrice);
      await this.updatePrices();
      this.setFetching(false);
    } catch (e) {
      this.setFetching(false);
      console.warn(e);
      alertError(e.message);
    }
  };

  updatePrices = async () => {
    const now = Date.now();
    const data = await this.getFromDevice();
    if (!data || now - data.lastPriceUpdate >= 300000) {
      try {
        const { data: markets } = await apiGetExchangeRate(this.exchange);
        this.updateBtcPrice(Number(getPrice(markets, this.exchange, TICKER.BTC)));
        this.updateEthPrice(Number(getPrice(markets, this.exchange, TICKER.ETH)));
        this.updateLtcPrice(Number(getPrice(markets, this.exchange, TICKER.LTC)));
        this.updateXrpPrice(Number(getPrice(markets, this.exchange, TICKER.XRP)));
        this.updateDashPrice(Number(getPrice(markets, this.exchange, TICKER.DASH)));
        this.updateSteemPrice(Number(getPrice(markets, this.exchange, TICKER.STEEM)));
        await this.setOnDevice(
          now,
          this.btcPrice,
          this.ethPrice,
          this.ltcPrice,
          this.xrpPrice,
          this.dashPrice,
          this.steemPrice
        );
      } catch (e) {
        console.warn(e);
        alertError(e.message);
      }
    }
  };

  addAccount = async (type: TICKER | null, name: string, address: string) => {
    try {
      this.setFetching(true);
      switch (type) {
        case TICKER.BTC:
          await this.btc.addAccount(name, address);
          break;
        case TICKER.ETH:
          await this.eth.addAccount(name, address);
          break;
        default:
          throw new Error("Invalid account type");
      }
      this.setFetching(false);
      this.router.push("/dashboard/accounts");
    } catch (e) {
      this.setFetching(false);
      console.warn(e);
      alertError(e.message);
    }
  };

  confirmDeleteAccount = (callback: (address: string) => void, account: Accounts.Account) =>
    Alert.alert("Confirmation", `Are you sure you want to delete "${account.name}"?`, [
      { text: "Cancel", onPress: () => null },
      { text: "Delete", onPress: () => callback(account.address), style: "destructive" }
    ]);

  deleteAccount = async (account: Accounts.Account) => {
    try {
      switch (account.type) {
        case TICKER.BTC:
          return this.confirmDeleteAccount(this.btc.deleteAccount, account);
        case TICKER.ETH:
          return this.confirmDeleteAccount(this.eth.deleteAccount, account);
        default:
          throw new Error("Invalid account type");
      }
    } catch (e) {
      console.warn(e);
      alertError(e.message);
    }
  };

  setOnDevice = async (
    lastPriceUpdate: number,
    btcPrice: number,
    ethPrice: number,
    ltcPrice: number,
    xrpPrice: number,
    dashPrice: number,
    steemPrice: number
  ) => {
    const data = JSON.stringify({
      lastPriceUpdate,
      btcPrice,
      ethPrice,
      ltcPrice,
      xrpPrice,
      dashPrice,
      steemPrice
    });
    await AsyncStorage.setItem("@blok:AccountsStore", data);
  };

  getFromDevice = async () => {
    const data = await AsyncStorage.getItem("@blok:AccountsStore");
    return JSON.parse(data) || null;
  };
}

export default AccountsStore;

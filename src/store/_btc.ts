import { observable, action } from "mobx";
import { AsyncStorage } from "react-native";
import { apiGetBtcAddress } from "../services/api";
import { TICKER } from "../services/enums";
import { Bitcoin } from "../services/interfaces";

class BtcStore implements Bitcoin.BitcoinStore {
  // --- store --- //
  @observable accounts = [];
  addresses = [];

  // --- actions --- //
  @action updateAccount = account => this.accounts.push(account);
  @action updateAddress = address => this.addresses.push(address);
  @action removeAccount = index => this.accounts.splice(index, 1);
  @action removeAddress = index => this.addresses.splice(index, 1);
  @action hydrateAccounts = accounts => (this.accounts = accounts);
  @action hydrateAddresses = addresses => (this.addresses = addresses);

  // --- methods --- //
  public getStoreFromMemory = async () => {
    const data = await AsyncStorage.getItem("@blok:BtcStore");
    const json = JSON.parse(data) || null;
    if (json && json.addresses && json.accounts) {
      this.hydrateAccounts(json.accounts);
      this.hydrateAddresses(json.addresses);
    }
  };

  public addAccount = async (name, address) => {
    if (this.addresses.includes(address)) {
      throw new Error(`BTC address already exists ${address}`);
    } else {
      const { data } = await apiGetBtcAddress(address);
      this.updateAccount({
        name,
        address,
        type: TICKER.BTC,
        balance: data.final_balance / 100000000,
        sent: data.total_sent / 100000000,
        received: data.total_received / 100000000
      });
      this.updateAddress(address);
      await AsyncStorage.setItem(
        "@blok:BtcStore",
        JSON.stringify({
          accounts: this.accounts,
          addresses: this.addresses
        })
      );
    }
  };

  deleteAccount = async address => {
    const index = this.addresses.indexOf(address);
    if (index > -1) {
      this.removeAccount(index);
      this.removeAddress(index);
      await AsyncStorage.setItem(
        "@blok:BtcStore",
        JSON.stringify({
          accounts: this.accounts,
          addresses: this.addresses
        })
      );
    } else {
      throw new Error("Account specified for deletion doesn't exist");
    }
  };
}

export default BtcStore;

import { observable, action } from "mobx";
import { AsyncStorage } from "react-native";
import { apiGetBtcAddress } from "../services/api";
import { TICKER } from "../services/enums";
import { Bitcoin } from "../services/interfaces";

class BtcStore implements Bitcoin.BitcoinStore {
  // --- store --- //
  @observable accounts: Bitcoin.BitcoinAccount[] = [];
  addresses: string[] = [];

  // --- actions --- //
  @action updateAccount = (account: Bitcoin.BitcoinAccount) => this.accounts.push(account);
  @action updateAddress = (address: string) => this.addresses.push(address);
  @action removeAccount = (index: number) => this.accounts.splice(index, 1);
  @action removeAddress = (index: number) => this.addresses.splice(index, 1);
  @action hydrateAccounts = (accounts: Bitcoin.BitcoinAccount[]) => (this.accounts = accounts);
  @action hydrateAddresses = (addresses: string[]) => (this.addresses = addresses);

  // --- methods --- //
  public getStoreFromMemory = async () => {
    const data = await AsyncStorage.getItem("@blok:BtcStore");
    const json = JSON.parse(data) || null;
    if (json && json.addresses && json.accounts) {
      this.hydrateAccounts(json.accounts);
      this.hydrateAddresses(json.addresses);
    }
  };

  public addAccount = async (name: string, address: string) => {
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

  deleteAccount = async (address: string) => {
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

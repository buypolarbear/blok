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
  getStoreFromMemory = async () => {
    const data = await this.getFromDevice();
    if (data && data.addresses && data.accounts) {
      this.hydrateAccounts(data.accounts);
      this.hydrateAddresses(data.addresses);
    }
  };

  addAccount = async (name: string, address: string) => {
    if (this.addresses.includes(address)) {
      throw new Error(`BTC address already exists ${address}`);
    } else {
      const { data } = await apiGetBtcAddress(address);
      this.updateAccount({
        name,
        address,
        type: TICKER.BTC,
        balance: Number(data.final_balance) / 100000000,
        sent: Number(data.total_sent) / 100000000,
        received: Number(data.total_received) / 100000000
      });
      this.updateAddress(address);
      await this.setOnDevice(this.accounts, this.addresses);
    }
  };

  deleteAccount = async (address: string) => {
    const index = this.addresses.indexOf(address);
    if (index > -1) {
      this.removeAccount(index);
      this.removeAddress(index);
      await this.setOnDevice(this.accounts, this.addresses);
    } else {
      throw new Error("Account specified for deletion doesn't exist");
    }
  };

  setOnDevice = async (accounts: Bitcoin.BitcoinAccount[], addresses: string[]) => {
    const data = JSON.stringify({ accounts, addresses });
    await AsyncStorage.setItem("@blok:BtcStore", data);
  };

  getFromDevice = async () => {
    const data = await AsyncStorage.getItem("@blok:BtcStore");
    return JSON.parse(data) || null;
  };
}

export default BtcStore;

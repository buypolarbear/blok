import { observable, action } from "mobx";
import { AsyncStorage } from "react-native";
import { apiGetBtcAddress, apiGetBtcAddresses } from "../services/api";
import { TICKER } from "../services/enums";
import { Bitcoin } from "../services/interfaces";

class BtcStore implements Bitcoin.BitcoinStore {
  // --- store --- //
  @observable accounts: Bitcoin.BitcoinAccount[] = [];
  addresses: string[] = [];

  // --- actions --- //
  @action updateAccounts = (account: Bitcoin.BitcoinAccount) => this.accounts.push(account);
  @action
  updateAccount = (index: number, balance: number, received: number, sent: number) => {
    this.accounts[index].balance = balance;
    this.accounts[index].sent = sent;
    this.accounts[index].received = received;
  };
  @action updateAddresses = (address: string) => this.addresses.push(address);
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

  refreshAccounts = async () => {
    const store = await this.getFromDevice();
    const now = Date.now();
    const lastUpdate = store.lastUpdate;
    if (!!this.accounts.length && (!store || now - lastUpdate >= 300000)) {
      try {
        const addresses = this.addresses.join("&");
        const { data } = await apiGetBtcAddresses(addresses);
        data.addresses.map((address: any) => {
          const filter = (element: any) => element.address === address.address;
          const index = this.accounts.findIndex(filter);
          this.updateAccount(
            index,
            Number(address.final_balance) / 100000000,
            Number(address.total_received) / 100000000,
            Number(address.total_sent) / 100000000
          );
        });
        await this.setOnDevice(this.accounts, this.addresses, now);
      } catch (e) {
        console.warn(e);
        throw new Error("Can't update Bitcoin accounts");
      }
    }
  };

  addAccount = async (name: string, address: string) => {
    if (this.addresses.includes(address)) {
      throw new Error(`BTC address already exists ${address}`);
    } else {
      const { data } = await apiGetBtcAddress(address);
      this.updateAccounts({
        name,
        address,
        type: TICKER.BTC,
        balance: Number(data.final_balance) / 100000000,
        sent: Number(data.total_sent) / 100000000,
        received: Number(data.total_received) / 100000000
      });
      this.updateAddresses(address);
      const store = await this.getFromDevice();
      await this.setOnDevice(this.accounts, this.addresses, store.lastUpdate || Date.now());
    }
  };

  deleteAccount = async (address: string) => {
    const index = this.addresses.indexOf(address);
    if (index > -1) {
      this.removeAccount(index);
      this.removeAddress(index);
      const store = await this.getFromDevice();
      await this.setOnDevice(this.accounts, this.addresses, store.lastUpdate || Date.now());
    } else {
      throw new Error("Account specified for deletion doesn't exist");
    }
  };

  setOnDevice = async (
    accounts: Bitcoin.BitcoinAccount[],
    addresses: string[],
    lastUpdate: number
  ) => {
    const data = JSON.stringify({ accounts, addresses, lastUpdate });
    await AsyncStorage.setItem("@blok:BtcStore", data);
  };

  getFromDevice = async () => {
    const data = await AsyncStorage.getItem("@blok:BtcStore");
    return JSON.parse(data) || null;
  };
}

export default BtcStore;

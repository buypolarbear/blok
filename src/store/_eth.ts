import { observable, action } from "mobx";
import { AsyncStorage } from "react-native";
import { apiGetEthAddress, apiGetEthAddresses } from "../services/api";
import { TICKER } from "../services/enums";
import { Ethereum } from "../services/interfaces";

class EthStore implements Ethereum.EthereumStore {
  // --- store --- //
  @observable accounts: Ethereum.EthereumAccount[] = [];
  addresses: string[] = [];

  // --- actions --- //
  @action updateAccounts = (account: Ethereum.EthereumAccount) => this.accounts.push(account);
  @action
  updateAccount = (index: number, balance: number) => {
    this.accounts[index].balance = balance;
  };
  @action updateAddresses = (address: string) => this.addresses.push(address);
  @action removeAccount = (index: number) => this.accounts.splice(index, 1);
  @action removeAddress = (index: number) => this.addresses.splice(index, 1);
  @action hydrateAccounts = (accounts: Ethereum.EthereumAccount[]) => (this.accounts = accounts);
  @action hydrateAddresses = (addresses: string[]) => (this.addresses = addresses);

  // --- methods --- //
  syncDataFromDevice = async () => {
    const data = await this.getFromDevice();
    if (data && data.addresses && data.accounts) {
      this.hydrateAccounts(data.accounts);
      this.hydrateAddresses(data.addresses);
    }
  };

  refreshAccounts = async () => {
    if (!!this.accounts.length) {
      try {
        const addresses = this.addresses.join(",");
        const { data } = await apiGetEthAddresses(addresses);
        if (Number(data.status) !== 1)
          throw new Error(`Unable to synchronise ETH addresses: ${data.message}`);
        else {
          data.result.map((address: any) => {
            const filter = (element: any) => element.address === address.account;
            const index = this.accounts.findIndex(filter);
            this.updateAccount(index, Number(address.balance) / 1000000000000000000);
          });
          await this.setOnDevice();
        }
      } catch (e) {
        console.warn(e);
        throw new Error("Can't synchronise Ethereum accounts");
      }
    }
  };

  addAccount = async (name: string, address: string) => {
    if (this.addresses.includes(address)) {
      throw new Error(`ETH address already exists ${address}`);
    } else {
      const { data } = await apiGetEthAddress(address);
      if (Number(data.status) !== 1)
        throw new Error(`ETH address has undefined balance: ${data.message}`);
      else {
        this.updateAccounts({
          name,
          address,
          type: TICKER.ETH,
          balance: Number(data.result) / 1000000000000000000
        });
        this.updateAddresses(address);
        await this.setOnDevice();
      }
    }
  };

  deleteAccount = async (address: string) => {
    const index = this.addresses.indexOf(address);
    if (index > -1) {
      this.removeAccount(index);
      this.removeAddress(index);
      await this.setOnDevice();
    } else {
      throw new Error("Account specified for deletion doesn't exist");
    }
  };

  setOnDevice = async () =>
    await AsyncStorage.setItem(
      "@blok:EthStore",
      JSON.stringify({ accounts: this.accounts, addresses: this.addresses })
    );

  getFromDevice = async () => {
    const data = await AsyncStorage.getItem("@blok:EthStore");
    return JSON.parse(data) || null;
  };
}

export default EthStore;

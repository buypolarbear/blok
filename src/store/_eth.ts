import { observable, action } from "mobx";
import { AsyncStorage } from "react-native";
import { apiGetEthAddress } from "../services/api";
import { TICKER } from "../services/enums";
import { Ethereum } from "../services/interfaces";

class EthStore implements Ethereum.EthereumStore {
  // --- store --- //
  @observable accounts: Ethereum.EthereumAccount[] = [];
  addresses: string[] = [];

  // --- actions --- //
  @action updateAccount = (account: Ethereum.EthereumAccount) => this.accounts.push(account);
  @action updateAddress = (address: string) => this.addresses.push(address);
  @action removeAccount = (index: number) => this.accounts.splice(index, 1);
  @action removeAddress = (index: number) => this.addresses.splice(index, 1);
  @action hydrateAccounts = (accounts: Ethereum.EthereumAccount[]) => (this.accounts = accounts);
  @action hydrateAddresses = (addresses: string[]) => (this.addresses = addresses);

  // --- methods --- //
  public getStoreFromMemory = async () => {
    const data = await AsyncStorage.getItem("@blok:EthStore");
    const json = JSON.parse(data) || null;
    if (json && json.addresses && json.accounts) {
      this.hydrateAccounts(json.accounts);
      this.hydrateAddresses(json.addresses);
    }
  };

  public addAccount = async (name: string, address: string) => {
    if (this.addresses.includes(address)) {
      throw new Error(`ETH address already exists ${address}`);
    } else {
      const { data } = await apiGetEthAddress(address);
      if (Number(data.status) !== 1)
        throw new Error(`ETH address has undefined balance: ${data.message}`);
      else {
        this.updateAccount({
          name,
          address,
          type: TICKER.ETH,
          balance: Number(data.result) / 1000000000000000000
        });
        this.updateAddress(address);
        await AsyncStorage.setItem(
          "@blok:EthStore",
          JSON.stringify({
            accounts: this.accounts,
            addresses: this.addresses
          })
        );
      }
    }
  };

  deleteAccount = async (address: string) => {
    const index = this.addresses.indexOf(address);
    if (index > -1) {
      this.removeAccount(index);
      this.removeAddress(index);
      await AsyncStorage.setItem(
        "@blok:EthStore",
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

export default EthStore;

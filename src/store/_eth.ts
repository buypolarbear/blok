import { observable, action } from "mobx";
import { AsyncStorage } from "react-native";
import { apiGetEthAddress } from "../services/api";
import { TICKER } from "../services/enums";

export interface EthAccountInterface {
  name: string;
  type: TICKER.ETH;
  address: string;
  balance: number;
  txs: any[];
}

export interface EthStoreInterface {
  accounts: EthAccountInterface[];
  addresses: string[];
  addAccount: (account: EthAccountInterface) => void;
  addAddress: (address: string) => void;
  hydrateAccounts: (accounts: EthAccountInterface[]) => void;
  hydrateAddresses: (addresses: string[]) => void;
  getEthStoreFromMemory: () => void;
  addEthAccount: (name: string, address: string) => void;
}

class EthStore implements EthStoreInterface {
  // --- store --- //
  @observable accounts = [];
  addresses = [];

  // --- actions --- //
  @action addAccount = account => this.accounts.push(account);
  @action addAddress = address => this.addresses.push(address);
  @action hydrateAccounts = accounts => (this.accounts = accounts);
  @action hydrateAddresses = addresses => (this.addresses = addresses);

  // --- methods --- //
  public getEthStoreFromMemory = async () => {
    const data = await AsyncStorage.getItem("@blok:EthStore");
    const json = JSON.parse(data) || null;
    if (json.addresses && json.accounts) {
      this.hydrateAccounts(json.accounts);
      this.hydrateAddresses(json.addresses);
    }
  };

  public addEthAccount = async (name, address) => {
    if (this.addresses.includes(address)) {
      throw new Error(`ETH Address already exists ${address}`);
    } else {
      const data = await apiGetEthAddress(address);
      const balance: any = data[0].data;
      const transactions: any = data[1].data;
      if (Number(balance.status) !== 1) throw new Error(`ETH Add Balance: ${balance.message}`);
      else if (Number(transactions.status) !== 1)
        throw new Error(`ETH Add transactions: ${transactions.message}`);
      else {
        this.addAccount({
          name,
          address,
          type: TICKER.ETH,
          balance: Number(balance.result) / 1000000000000000000,
          txs: transactions.result
        });
        this.addAddress(address);
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
}

export default EthStore;

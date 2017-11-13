import { observable, action } from "mobx";
import { AsyncStorage } from "react-native";
import { apiGetBtcAddress } from "../services/api";
import { TICKER } from "../services/enums";

export interface BtcAccountInterface {
  name: string;
  type: TICKER.BTC;
  address: string;
  balance: number;
  sent: number;
  received: number;
  txs: Object[];
}

export interface BtcStoreInterface {
  accounts: BtcAccountInterface[];
  addresses: string[];
  addAccount: (account: BtcAccountInterface) => void;
  addAddress: (address: string) => void;
  removeAccount: (index: number) => void;
  removeAddress: (index: number) => void;
  hydrateAccounts: (accounts: BtcAccountInterface[]) => void;
  hydrateAddresses: (addresses: string[]) => void;
  getBtcStoreFromMemory: () => void;
  addBtcAccount: (name: string, address: string) => void;
  deleteBtcAccount: (address: string) => void;
}

class BtcStore implements BtcStoreInterface {
  // --- store --- //
  @observable accounts = [];
  addresses = [];

  // --- actions --- //
  @action addAccount = account => this.accounts.push(account);
  @action addAddress = address => this.addresses.push(address);
  @action removeAccount = index => this.accounts.splice(index, 1);
  @action removeAddress = index => this.addresses.splice(index, 1);
  @action hydrateAccounts = accounts => (this.accounts = accounts);
  @action hydrateAddresses = addresses => (this.addresses = addresses);

  // --- methods --- //
  public getBtcStoreFromMemory = async () => {
    const data = await AsyncStorage.getItem("@blok:BtcStore");
    const json = JSON.parse(data) || null;
    if (json.addresses && json.accounts) {
      this.hydrateAccounts(json.accounts);
      this.hydrateAddresses(json.addresses);
    }
  };

  public addBtcAccount = async (name, address) => {
    if (this.addresses.includes(address)) {
      throw new Error(`BTC Address already exists ${address}`);
    } else {
      const { data } = await apiGetBtcAddress(address);
      this.addAccount({
        name,
        address,
        type: TICKER.BTC,
        balance: data.final_balance / 100000000,
        sent: data.total_sent / 100000000,
        received: data.total_received / 100000000,
        txs: data.txs
      });
      this.addAddress(address);
      await AsyncStorage.setItem(
        "@blok:BtcStore",
        JSON.stringify({
          accounts: this.accounts,
          addresses: this.addresses
        })
      );
    }
  };

  deleteBtcAccount = async (address: string) => {
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
      throw new Error("Can't find account to delete");
    }
  };
}

export default BtcStore;

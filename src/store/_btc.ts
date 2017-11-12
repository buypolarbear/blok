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
  fetching: boolean;
  addresses: string[];
  addAccount: (account: string) => void;
  addAddress: (address: string) => void;
  hydrateAccounts: (accounts: BtcAccountInterface[]) => void;
  hydrateAddresses: (addresses: string[]) => void;
  getBtcStoreFromMemory: () => void;
  addBtcAccount: (name: string, address: string) => void;
}

class BtcStore {
  // --- store --- //
  @observable accounts: BtcAccountInterface[] = [];
  @observable fetching: boolean = false;
  addresses: string[] = [];

  // --- actions --- //
  @action addAccount = (account: BtcAccountInterface) => this.accounts.push(account);
  @action addAddress = (address: string) => this.addresses.push(address);
  @action hydrateAccounts = (accounts: BtcAccountInterface[]) => (this.accounts = accounts);
  @action hydrateAddresses = (addresses: string[]) => (this.addresses = addresses);
  @action setFetching = (state: boolean) => (this.fetching = state);

  // --- methods --- //
  getBtcStoreFromMemory = async () => {
    this.setFetching(true);
    const data = await AsyncStorage.getItem("@blok:BtcStore");
    const json = JSON.parse(data) || null;
    if (json.addresses && json.accounts) {
      this.hydrateAccounts(json.accounts);
      this.hydrateAddresses(json.addresses);
    }
    this.setFetching(false);
  };

  addBtcAccount = async (name: string, address: string) => {
    try {
      if (this.addresses.includes(address)) {
        console.error("BTC Address already exists");
      } else {
        this.setFetching(true);
        const { data } = await apiGetBtcAddress(address);
        this.addAccount({
          name,
          type: TICKER.BTC,
          address: data.address,
          balance: data.final_balance,
          sent: data.total_sent,
          received: data.total_received,
          txs: data.txs
        });
        this.addAddress(data.address);
        await AsyncStorage.setItem(
          "@blok:BtcStore",
          JSON.stringify({
            accounts: this.accounts,
            address: this.addresses
          })
        );
        this.setFetching(false);
      }
    } catch (e) {
      this.setFetching(false);
      console.error(e);
    }
  };
}

export default BtcStore;

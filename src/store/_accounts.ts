import { observable, action } from "mobx";
import { apiGetBtcAddress, apiGetBtcAddresses } from "../services/api";
import { TICKER } from "../services/enums";
import { RouterInterface } from "../store/_router";
import { storeAccounts, retrieveAccounts } from "../services/utilities";

export interface AccountInterface {
  type: TICKER;
  publicAddress: string;
  balance: number;
  name: string;
  sent: number;
  received: number;
  txs: Object[];
}

export interface AccountsInterface {
  accounts: AccountInterface[];
  saveBtcAddress: (x: string) => void;
  saveAddress: (x: TICKER, y: string, z: string) => Function;
  getStoredAccounts: () => void;
}

class AccountsStore {
  // --- constructor --- //
  routerStore: RouterInterface;
  constructor(router: RouterInterface) {
    this.routerStore = router;
  }

  // --- store --- //
  @observable accounts: AccountInterface[] = [];
  @observable fetching: boolean = false;

  // --- actions --- //
  @action addAccount = (account: AccountInterface) => this.accounts.push(account);
  @action populateAccounts = (accounts: AccountInterface[]) => (this.accounts = accounts);
  @action setFetching = (state: boolean) => (this.fetching = state);
  @action setAccount = (index: number, data: AccountInterface) => (this.accounts[index] = data);

  // --- methods --- //
  updateBtcAccounts = async () => {
    // TODO this here doesn't work due to async thing
    try {
      this.setFetching(true);
      const btcAccounts = this.filterByType(TICKER.BTC);
      let queryString = "";
      for (const btcAccount of btcAccounts) {
        queryString += `${btcAccount.publicAddress}|`;
      }
      const { data } = await apiGetBtcAddresses(queryString);
      const newAddresses = data.addresses;
      for (const newAddress of newAddresses) {
        const index = this.accounts.findIndex(
          account => account.type === TICKER.BTC && account.publicAddress === newAddress.address
        );
        this.setAccount(index, {
          name: this.accounts[index].name,
          publicAddress: this.accounts[index].publicAddress,
          type: TICKER.BTC,
          balance: newAddress.final_balance / 100000000,
          sent: newAddress.total_sent / 100000000,
          received: newAddress.total_received / 100000000,
          txs: newAddress.txs
        });
      }
      storeAccounts(this.accounts);
      this.setFetching(false);
    } catch (error) {
      this.setFetching(false);
      console.error;
    }
  };

  getStoredAccounts = async () => {
    try {
      this.setFetching(true);
      const storedAccounts = await retrieveAccounts();
      const accounts = !!JSON.parse(storedAccounts) ? JSON.parse(storedAccounts) : [];
      this.populateAccounts(accounts);
      this.setFetching(false);
      this.updateBtcAccounts();
    } catch (error) {
      this.setFetching(false);
      console.error(error);
    }
  };

  saveBtcAddress = async (publicAddress: string, name: string) => {
    try {
      if (this.filterByPublicAddress(TICKER.BTC, publicAddress).length > 0) {
        console.error("Account already exists");
      } else {
        this.setFetching(true);
        const { data } = await apiGetBtcAddress(publicAddress);
        this.addAccount({
          name,
          publicAddress,
          type: TICKER.BTC,
          balance: data.final_balance / 100000000,
          sent: data.total_sent / 100000000,
          received: data.total_received / 100000000,
          txs: data.txs
        });
        storeAccounts(this.accounts);
        this.setFetching(false);
        this.routerStore.push("/dashboard/accounts");
      }
    } catch (error) {
      this.setFetching(false);
      console.error(error);
    }
  };

  filterByType = (type: TICKER) => {
    const filtered = this.accounts.filter(account => account.type === type);
    return filtered;
  };

  filterByPublicAddress = (type: TICKER, publicAddress: string) => {
    const filtered = this.accounts.filter(
      account => account.publicAddress === publicAddress && account.type === type
    );
    return filtered;
  };

  saveAddress = (type: TICKER, publicAddress: string, name: string) => {
    switch (type) {
      case TICKER.BTC:
        return this.saveBtcAddress(publicAddress, name);
      default:
        return console.error("Invalid account type");
    }
  };
}

export default AccountsStore;

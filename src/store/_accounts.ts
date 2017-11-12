import { observable, action } from "mobx";
import { apiGetBtcAddress } from "../services/api";
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
  txs: any[];
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

  // --- actions --- //
  @action addAccount = (account: AccountInterface) => this.accounts.push(account);

  @action populateAccounts = (accounts: AccountInterface[]) => (this.accounts = accounts);

  // --- methods --- //
  getStoredAccounts = async () => {
    try {
      const storedAccounts = await retrieveAccounts();
      const accounts = !!JSON.parse(storedAccounts) ? JSON.parse(storedAccounts) : [];
      this.populateAccounts(accounts);
    } catch (error) {
      console.error(error);
    }
  };

  saveBtcAddress = async (publicAddress: string, name: string) => {
    try {
      const { data } = await apiGetBtcAddress(publicAddress);
      const newAccount = {
        name,
        publicAddress,
        type: TICKER.BTC,
        balance: data.final_balance / 100000000,
        sent: data.total_sent / 100000000,
        received: data.total_received / 100000000,
        txs: data.txs
      };
      this.accountExists(TICKER.BTC, publicAddress)
        ? console.error("Account already exists")
        : this.addAccount(newAccount);
      storeAccounts(this.accounts);
      this.routerStore.push("/dashboard/accounts");
    } catch (error) {
      console.error(error);
    }
  };

  accountExists = (type: TICKER, publicAddress: string): boolean => {
    const filtered = this.accounts.filter(
      account => account.publicAddress === publicAddress && account.type === type
    );
    return !!filtered.length;
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

import { observable, action } from "mobx";
import { apiGetBtcAddress } from "../services/api";
import { TICKER } from "../services/enums";
import { RouterInterface } from "../store/_router";

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
  getBtcAddress: (x: string) => void;
  getAddress: (x: TICKER, y: string, z: string) => Function;
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

  // --- methods --- //
  getBtcAddress = async (publicAddress: string, name: string) => {
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

  getAddress = (type: TICKER, publicAddress: string, name: string) => {
    switch (type) {
      case TICKER.BTC:
        return this.getBtcAddress(publicAddress, name);
      default:
        return console.error("Invalid account type");
    }
  };
}

export default AccountsStore;

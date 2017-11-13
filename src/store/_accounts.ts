import { observable, action } from "mobx";
import { RouterStoreInterface } from "./_router";
import { BtcStoreInterface } from "./_btc";
import { EthStoreInterface } from "./_eth";
import { TICKER } from "../services/enums";

export interface AccountsStoreInterface {
  addAccount: (type: TICKER, name: string, address: string) => void;
  setFetching: (state: boolean) => void;
}

class AccountsStore implements AccountsStoreInterface {
  // -- constructor -- //
  private router: RouterStoreInterface;
  private btc: BtcStoreInterface;
  private eth: EthStoreInterface;

  constructor(router: RouterStoreInterface, btc: BtcStoreInterface, eth: EthStoreInterface) {
    this.router = router;
    this.btc = btc;
    this.eth = eth;
  }

  // --- store --- //
  @observable fetching = false;

  // --- actions --- //
  @action setFetching = state => (this.fetching = state);

  // --- methods --- //
  public addAccount = async (type, name, address) => {
    try {
      this.setFetching(true);
      switch (type) {
        case TICKER.BTC:
          await this.btc.addBtcAccount(name, address);
          break;
        case TICKER.ETH:
          await this.eth.addEthAccount(name, address);
          break;
        default:
          throw new Error("INVALID ACCOUNT TYPE");
      }
      this.setFetching(false);
      this.router.push("/dashboard/accounts");
    } catch (error) {
      this.setFetching(false);
      console.error(error);
    }
  };
}

export default AccountsStore;

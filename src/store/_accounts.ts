import { observable, action } from "mobx";
import { RouterStoreInterface } from "./_router";
import { BtcStoreInterface } from "./_btc";

class AccountsStore {
  // -- constructor -- //
  private router: RouterStoreInterface;
  private btc: BtcStoreInterface;

  constructor(router: RouterStoreInterface, btc: BtcStoreInterface) {
    this.router = router;
    this.btc = btc;
  }
  // --- store --- //
  // --- actions --- //
  // --- methods --- //
}

export default AccountsStore;

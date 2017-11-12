import { observable, action } from "mobx";
import { RouterInterface } from "./_router";
import { BtcStoreInterface } from "./_btc";

class AccountsStore {
  // -- constructor -- //
  router: RouterInterface;
  btc: BtcStoreInterface;

  constructor(router, btc) {
    this.router = router;
    this.btc = btc;
  }
  // --- store --- //
  // --- actions --- //
  // --- methods --- //
}

export default AccountsStore;

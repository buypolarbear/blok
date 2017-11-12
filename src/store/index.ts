import RouterStore from "./_router";
import BtcStore from "./_btc";
import AccountsStore from "./_accounts";

const router = new RouterStore();
const btc = new BtcStore();
const accounts = new AccountsStore(router);

export default {
  router,
  accounts,
  btc
};

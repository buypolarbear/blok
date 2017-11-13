import RouterStore from "./_router";
import BtcStore from "./_btc";
import EthStore from "./_eth";
import AccountsStore from "./_accounts";

const router = new RouterStore();
const btc = new BtcStore();
const eth = new EthStore();
const accounts = new AccountsStore(router, btc, eth);

export default {
  router,
  accounts,
  btc,
  eth
};

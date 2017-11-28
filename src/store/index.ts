import RouterStore from "./_router";
import BtcStore from "./_btc";
import EthStore from "./_eth";
import AccountsStore from "./_accounts";
import CameraStore from "./_camera";

const router = new RouterStore();
const camera = new CameraStore();
const btc = new BtcStore();
const eth = new EthStore();
const accounts = new AccountsStore(router, btc, eth);

export default {
  router,
  accounts,
  camera,
  btc,
  eth
};

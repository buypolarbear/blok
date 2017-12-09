import RouterStore from "./_router";
import BtcStore from "./_btc";
import EthStore from "./_eth";
import AccountsStore from "./_accounts";
import CameraStore from "./_camera";
import MarketStore from "./_market";

const router = new RouterStore();
const camera = new CameraStore();
const btc = new BtcStore();
const eth = new EthStore();
const market = new MarketStore();
const accounts = new AccountsStore(router, market, btc, eth);

export default {
  router,
  accounts,
  market,
  camera,
  btc,
  eth
};

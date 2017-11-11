import RouterStore from "./_router";
import AccountsStore from "./_accounts";

const router = new RouterStore();
const accounts = new AccountsStore(router);

export default {
  router,
  accounts
};

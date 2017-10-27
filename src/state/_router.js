/* @flow */
import { observable, action } from "mobx";
import createHistory from "history/createMemoryHistory";

class RouterState {
  // -- store --------------------------------------------------------------- //
  routerHistory = createHistory();
  history = this.routerHistory;
  @observable location = this.history.location;

  // -- actions ------------------------------------------------------------- //
  @action
  updateRouter = (history: Object) => {
    this.history = history;
    this.location = history.location;
  };

  // -- methods ------------------------------------------------------------- //
  push = (location: string, state: Object) => {
    this.routerHistory.push(location, state);
    this.updateRouter(this.routerHistory);
  };

  replace = (location: string) => {
    this.routerHistory.replace(location);
    this.updateRouter(this.routerHistory);
  };

  go = (n: number) => {
    this.routerHistory.go(n);
    this.updateRouter(this.routerHistory);
  };

  goBack = () => {
    this.routerHistory.goBack();
    this.updateRouter(this.routerHistory);
  };

  goForward = () => {
    this.routerHistory.goForward();
    this.updateRouter(this.routerHistory);
  };
}

export default RouterState;

import { observable, action } from "mobx";
import * as history from "history";
import createHistory from "history/createMemoryHistory";

export interface LocationInterface extends history.Location {}

export interface RouterInterface {
  history: history.History;
  location: history.Location;
  push: (location: string, state?: Object) => void;
  replace: (location: string) => void;
  go: (n: number) => void;
  goBack: () => void;
  goForward: () => void;
}

class RouterStore {
  // -- store --------------------------------------------------------------- //
  routerHistory = createHistory({ initialEntries: ["/dashboard/accounts"] });
  history: any = this.routerHistory;
  @observable location = this.history.location;

  // -- actions ------------------------------------------------------------- //
  @action
  updateRouter = (history: { location: Object }) => {
    this.history = history;
    this.location = history.location;
  };

  // -- methods ------------------------------------------------------------- //
  push = (location: string, state?: Object) => {
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

export default RouterStore;

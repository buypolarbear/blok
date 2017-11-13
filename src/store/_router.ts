import { observable, action } from "mobx";
import * as history from "history";
import createHistory from "history/createMemoryHistory";

// --- create memory history --- //
const memoryHistory = createHistory({ initialEntries: ["/dashboard/accounts"] });

export interface RouterStoreInterface {
  history: history.History;
  location: history.Location;
  updateLocation: () => void;
  push: (pathname: string, state?: Object) => void;
  replace: (pathname: string) => void;
  go: (number: number) => void;
  goBack: () => void;
  goForward: () => void;
}

class RouterStore implements RouterStoreInterface {
  // --- store --- //
  history = memoryHistory;
  @observable location = this.history.location;

  // --- actions --- //
  @action updateLocation = () => (this.location = this.history.location);

  // --- methods --- //
  public push = (pathname, state) => {
    this.history.push(pathname, state);
    this.updateLocation();
  };

  public replace = pathname => {
    this.history.replace(pathname);
    this.updateLocation();
  };

  public go = number => {
    this.history.go(number);
    this.updateLocation();
  };

  public goBack = () => {
    this.history.goBack();
    this.updateLocation();
  };

  public goForward = () => {
    this.history.goForward();
    this.updateLocation();
  };
}

export default RouterStore;

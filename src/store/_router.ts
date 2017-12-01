import { observable, action } from "mobx";
import createHistory from "history/createMemoryHistory";
import { Router } from "../services/interfaces";

// --- create memory history --- //
const memoryHistory = createHistory({ initialEntries: ["/dashboard/accounts"] });

class RouterStore implements Router.RouterStore {
  // --- store --- //
  history = memoryHistory;
  @observable location = this.history.location;

  // --- actions --- //
  @action updateLocation = () => (this.location = this.history.location);

  // --- methods --- //
  push = (pathname: string, state: any) => {
    this.history.push(pathname, state);
    this.updateLocation();
  };

  replace = (pathname: string) => {
    this.history.replace(pathname);
    this.updateLocation();
  };

  go = (number: number) => {
    this.history.go(number);
    this.updateLocation();
  };

  goBack = () => {
    this.history.goBack();
    this.updateLocation();
  };

  goForward = () => {
    this.history.goForward();
    this.updateLocation();
  };
}

export default RouterStore;

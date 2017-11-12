import { observable, action } from "mobx";
import * as history from "history";
import createHistory from "history/createMemoryHistory";

export interface RouterStoreInterface {
  history: history.History;
  push: (pathname: string, state?: Object) => void;
  replace: (pathname: string) => void;
  go: (number: number) => void;
  goBack: () => void;
  goForward: () => void;
  pathname: string;
  state: any;
  location: history.Location;
}

const memoryHistory = createHistory({ initialEntries: ["/dashboard/accounts"] });

class RouterStore implements RouterStoreInterface {
  // --- store --- //
  @observable history = memoryHistory;

  // --- actions --- //
  @action public push = (pathname, state) => this.history.push(pathname, state);
  @action public replace = pathname => this.history.replace(pathname);
  @action public go = number => this.history.go(number);
  @action public goBack = () => this.history.goBack();
  @action public goForward = () => this.history.goForward();

  // --- methofs --- //
  public get pathname() {
    return this.history.location.pathname;
  }

  public get state() {
    return this.history.location.state;
  }

  public get location() {
    return this.history.location;
  }
}

export default RouterStore;

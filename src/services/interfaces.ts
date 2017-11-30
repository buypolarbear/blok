import { TICKER } from "./enums";
import * as HISTORY from "history";

// --- Accounts --- //
export declare namespace Accounts {
  interface Account {
    name: string;
    type: TICKER.BTC;
    address: string;
    balance: number;
  }
  interface AccountsStore {
    router: Router.RouterStore;
    btc: Bitcoin.BitcoinStore;
    eth: Ethereum.EthereumStore;
    fetching: boolean;
    addAccount: (type: TICKER, name: string, address: string) => void;
    deleteAccount: (account: any) => void;
    setFetching: (state: boolean) => void;
    getAccountsFromMemory: () => void;
    confirmDeleteAccount: (callback: Function, account: any) => void;
  }
  interface SubAccountsStore {
    addresses: string[];
    hydrateAddresses: (addresses: string[]) => void;
    getStoreFromMemory: () => void;
    deleteAccount: (address: string) => void;
    addAccount: (name: string, address: string) => void;
    updateAddress: (address: string) => void;
    removeAccount: (index: number) => void;
    removeAddress: (index: number) => void;
  }
}

// --- Bitcoin --- //
export declare namespace Bitcoin {
  interface BitcoinAccount extends Accounts.Account {
    sent: number;
    received: number;
  }
  interface BitcoinStore extends Accounts.SubAccountsStore {
    accounts: BitcoinAccount[];
    updateAccount: (account: BitcoinAccount) => void;
    hydrateAccounts: (accounts: BitcoinAccount[]) => void;
  }
}

// --- Ethereum --- //
export declare namespace Ethereum {
  interface EthereumAccount extends Accounts.Account {}
  interface EthereumStore extends Accounts.SubAccountsStore {
    accounts: EthereumAccount[];
    updateAccount: (account: EthereumAccount) => void;
    hydrateAccounts: (accounts: EthereumAccount[]) => void;
  }
}

// --- Router --- //
export declare namespace Router {
  interface MemoryHistory extends HISTORY.MemoryHistory {}
  interface Location extends HISTORY.Location {}
  interface RouterStore {
    history: MemoryHistory;
    location: Location;
    updateLocation: () => void;
    push: (pathname: string, state?: Object) => void;
    replace: (pathname: string) => void;
    go: (number: number) => void;
    goBack: () => void;
    goForward: () => void;
  }
}

// --- Camera --- //
export declare namespace Camera {
  interface CameraStore {
    show: boolean;
    barcode: string;
    toggleCamera: (state: boolean) => void;
    setBarcode: (barcode: string) => void;
    reset: () => void;
  }
}

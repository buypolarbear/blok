import { TICKER, EXCHANGE } from "./enums";
import * as HISTORY from "history";

// --- Accounts --- //
export declare namespace Accounts {
  interface Account {
    type: TICKER;
    name: string;
    address: string;
    balance: number;
  }
  interface AccountsStore {
    router: Router.RouterStore;
    btc: Bitcoin.BitcoinStore;
    eth: Ethereum.EthereumStore;
    fetching: boolean;
    exchange: EXCHANGE;
    btcPrice: number;
    ethPrice: number;
    ltcPrice: number;
    dashPrice: number;
    xrpPrice: number;
    steemPrice: number;
    updateBtcPrice: (price: number) => void;
    updateEthPrice: (price: number) => void;
    updateLtcPrice: (price: number) => void;
    updateXrpPrice: (price: number) => void;
    updateDashPrice: (price: number) => void;
    updateSteemPrice: (price: number) => void;
    updatePrices: () => void;
    addAccount: (type: TICKER | null, name: string, address: string) => void;
    deleteAccount: (account: any) => void;
    setFetching: (state: boolean) => void;
    getAccountsFromMemory: () => void;
    confirmDeleteAccount: (callback: (address: string) => void, account: any) => void;
    setOnDevice: (lastPriceUpdate: number) => Promise<any>;
    getFromDevice: () => Promise<any>;
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
    getFromDevice: () => Object | null;
  }
}

// --- Bitcoin --- //
export declare namespace Bitcoin {
  interface BitcoinAccount extends Accounts.Account {
    type: TICKER.BTC;
    sent: number;
    received: number;
  }
  interface BitcoinStore extends Accounts.SubAccountsStore {
    accounts: BitcoinAccount[];
    updateAccount: (account: BitcoinAccount) => void;
    hydrateAccounts: (accounts: BitcoinAccount[]) => void;
    setOnDevice: (accounts: BitcoinAccount[], addresses: string[]) => void;
  }
}

// --- Ethereum --- //
export declare namespace Ethereum {
  interface EthereumAccount extends Accounts.Account {
    type: TICKER.ETH;
  }
  interface EthereumStore extends Accounts.SubAccountsStore {
    accounts: EthereumAccount[];
    updateAccount: (account: EthereumAccount) => void;
    hydrateAccounts: (accounts: EthereumAccount[]) => void;
    setOnDevice: (accounts: EthereumAccount[], addresses: string[]) => void;
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

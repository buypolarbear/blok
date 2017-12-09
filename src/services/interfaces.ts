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
    market: Market.MarketStore;
    btc: Bitcoin.BitcoinStore;
    eth: Ethereum.EthereumStore;
    fetching: boolean;
    addAccount: (type: TICKER | null, name: string, address: string) => void;
    deleteAccount: (account: any) => void;
    setFetching: (state: boolean) => void;
    bootstrap: () => void;
    syncDataFromDevice: () => void;
    refreshData: () => void;
    confirmDeleteAccount: (callback: (address: string) => void, account: any) => void;
    setRefreshDelay: () => Promise<void>;
    getRefreshDelay: () => Promise<number | null>;
  }
  interface SubAccountsStore {
    addresses: string[];
    hydrateAddresses: (addresses: string[]) => void;
    syncDataFromDevice: () => void;
    deleteAccount: (address: string) => void;
    addAccount: (name: string, address: string) => void;
    updateAddresses: (address: string) => void;
    removeAccount: (index: number) => void;
    removeAddress: (index: number) => void;
    getFromDevice: () => Promise<void>;
    setOnDevice: () => Promise<void>;
    refreshAccounts: () => Promise<void>;
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
    updateAccounts: (account: BitcoinAccount) => void;
    updateAccount: (index: number, balance: number, received: number, sent: number) => void;
    hydrateAccounts: (accounts: BitcoinAccount[]) => void;
  }
}

// --- Ethereum --- //
export declare namespace Ethereum {
  interface EthereumAccount extends Accounts.Account {
    type: TICKER.ETH;
  }
  interface EthereumStore extends Accounts.SubAccountsStore {
    accounts: EthereumAccount[];
    updateAccounts: (account: EthereumAccount) => void;
    updateAccount: (index: number, balance: number) => void;
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

// --- Market --- //
export declare namespace Market {
  interface MarketStore {
    exchange: EXCHANGE;
    btcPrice: number;
    ethPrice: number;
    ltcPrice: number;
    xrpPrice: number;
    dashPrice: number;
    steemPrice: number;
    setBtcPrice: (price: number) => void;
    setEthPrice: (price: number) => void;
    setLtcPrice: (price: number) => void;
    setXrpPrice: (price: number) => void;
    setDashPrice: (price: number) => void;
    setSteemPrice: (price: number) => void;
    setExchange: (exchange: EXCHANGE) => void;
    getMarketPrices: () => Promise<void>;
    getFromDevice: () => Promise<void>;
    setOnDevice: () => Promise<void>;
  }
}

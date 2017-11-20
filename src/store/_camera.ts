import { observable, action } from "mobx";

export interface CameraStoreInterface {
  show: boolean;
  barcode: string;
  toggleCamera: (state: boolean) => void;
  setBarcode: (barcode: string) => void;
  reset: () => void;
}

class CameraStore implements CameraStoreInterface {
  // --- store --- //
  @observable show = false;
  @observable barcode = null;

  // --- actions --- //
  @action toggleCamera = state => (this.show = state);

  @action
  setBarcode = barcode => {
    this.barcode = barcode;
    this.show = false;
  };

  @action reset = () => (this.barcode = null);

  // --- methods --- //
}

export default CameraStore;

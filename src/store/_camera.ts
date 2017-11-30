import { observable, action } from "mobx";
import { Camera } from "../services/interfaces";

class CameraStore implements Camera.CameraStore {
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

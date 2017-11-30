import { observable, action } from "mobx";
import { Camera } from "../services/interfaces";

class CameraStore implements Camera.CameraStore {
  // --- store --- //
  @observable show = false;
  @observable barcode = "";

  // --- actions --- //
  @action toggleCamera = (state: boolean) => (this.show = state);

  @action
  setBarcode = (barcode: string) => {
    this.barcode = barcode;
    this.show = false;
  };

  @action reset = () => (this.barcode = "");

  // --- methods --- //
}

export default CameraStore;

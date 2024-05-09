import Model from "./model.js";
import View from "./view.js";

class Controller {
  constructor() {
    this.model = new Model(this);
    this.view = new View(this);
  }

  initialize() {
    console.log("JS Running");
    this.model.testModel();
    this.view.testView();
  }
}

let controller = new Controller();
window.addEventListener("load", controller.initialize());

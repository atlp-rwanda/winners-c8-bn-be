class Response {
  constructor(_status = 100) {
    this._status = _status;
  }
  status(_status) {
    this._status = _status;
    return this;
  }
  json(object) {
    return { body: object, status: this._status };
  }
  send(object) {
    return { body: object, status: this._status };
  }
  sendFile(file) {
    return file;
  }
  setProperty(property, value) {
    this[property] = value;
    return this;
  }
}
class Request {
  body = {};
  setProperty(property, value) {
    this[property] = value;
    return this;
  }
  setRequestObject(object) {
    for (let key in object) {
      this.setProperty(key, object[key]);
    }
  }
}
/**
 * @class FakeControllerCall
 * @description FakeControllerCall is a class that simulates a controller call.
 * @param {function} controllerCall - The controller call to be simulated.
 * @param {object} request - The request object to be passed to the controller call.
 * @param {object} response - The response object to be passed to the controller call.
 */
export default class FakeControllerCall {
  constructor(controller, requestObject) {
    this.controller = controller;
    this.request = new Request();
    this.response = new Response();
    this.response.status(200).send({ message: "success" });
    this.request.setRequestObject(requestObject);
  }
  sendRequest() {
    return this.controller(this.request, this.response);
  }
}

function FakePromise() {
}

FakePromise.prototype.then = function (f) {
  this.realSuccessCallback = f;
  return this;
};

FakePromise.prototype.fail = function (f) {
  this.realFailureCallback = f;
  return this;
};

FakePromise.prototype.resolve = function (payload) {
  return this.realSuccessCallback(payload);
};

FakePromise.prototype.reject = function (payload) {
  return this.realFailureCallback(payload);
};

export default FakePromise;

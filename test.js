var _fn = function () {
  console.log(1);
};

(function () {
  var _fn = function () {
      console.log(2);
  };
  console.log('thiss', this._fn, _fn)
  var fn1 = function () {
    console.log('11', this._fn)
      this._fn.apply(this);
  };

  var obj = {
      _fn: function () {
          console.log(3);
      },
      fn2: fn1.bind({
          _fn: function () {
              console.log(4);
          },
      }),
      fn3: fn1,
  };

  var fn4 = obj.fn3;
  var fn5 = obj.fn2;

  fn1();
  obj.fn2();
  obj.fn3();
  fn4();
  this.fn5();
})();

/*
 * 业务登入登出扩展逻辑
 */
// eslint-disable-next-line no-undef
define(function () {
  return {
    bizLogout: function () {
      console.log('此处为业务登出代码');
    },
    bizLogin: function (psw) {
      console.log('此处为业务登入代码', psw);
    }
  };
});

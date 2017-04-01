"use strict";

var money = function money(n) {
  return ('' + n).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

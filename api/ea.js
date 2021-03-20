const date = new Date();
const moment = require("moment");

const today = date.getDate();
const yesterday = date.setDate(today - 1);

console.log(today, yesterday);
console.log(date);
console.log(moment().format());

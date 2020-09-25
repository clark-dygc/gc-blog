export function isLeapYear(year) {
  if (year % 100 === 0) {
    return year % 400 === 0;
  }
  return year % 4 === 0;
}

const _31 = [1, 3, 5, 7, 8, 10, 12]
const _30 = [4, 6, 9, 11];

export function getDayPerMonth(year, month) {
  if (_31.indexOf(month) !== -1) {
    return 31;
  }
  if (_30.indexOf(month) !== -1) {
    return 30;
  }
  const isLeap = isLeapYear(year);
  return isLeap ? 29 : 28;
}

export function validateMail(mail) {
  const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+.([A-Za-z]{2,4})$/;
  return reg.test(mail);
}

export function validatePhone(phone) {
  const reg = /^1[3|4|5|7|8][0-9]{9}$/;
  return reg.test(phone);
}

//// 时间 格式化成 2018-12-12 12:12:00
export function timestampToTime(timestamp, dayMinSecFlag) {
  const date = new Date(timestamp);
  const Y = date.getFullYear() + "-";
  const M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  const D =
    date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
  const h =
    date.getHours() < 10 ? "0" + date.getHours() + ":" : date.getHours() + ":";
  const m =
    date.getMinutes() < 10
      ? "0" + date.getMinutes() + ":"
      : date.getMinutes() + ":";
  const s =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  if (!dayMinSecFlag) {
    return Y + M + D;
  }
  return Y + M + D + h + m + s;
}

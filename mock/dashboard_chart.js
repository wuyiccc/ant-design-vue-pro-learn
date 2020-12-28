/**
 * @author wuyiccc
 * @date 2020/12/28 20:43
 * 岂曰无衣, 与子同袍
 */
function chart(method) {
  let res = [];
  switch (method) {
    case "GET":
      res = [20, 40, 70, 10, 30];
      break;
    default:
      res = null;
  }
  return res;
}

module.exports = chart;

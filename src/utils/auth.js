/**
 * @author wuyiccc
 * @date 2020/12/27 20:31
 * 岂曰无衣, 与子同袍
 */

export function getCurrentAuthority() {
  return ["admin"];
}
// 检查当前登录用户current是否在指定的authority权限数组里面
export function check(authority) {
  const current = getCurrentAuthority();
  return current.some(item => authority.includes(item));
}

export function isLogin() {
  const current = getCurrentAuthority();
  return current && current[0] !== "guest";
}

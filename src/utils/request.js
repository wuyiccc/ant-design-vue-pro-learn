/**
 * @author wuyiccc
 * @date 2020/12/28 22:05
 * 岂曰无衣, 与子同袍
 */
import axios from "axios";
import { notification } from "ant-design-vue";

function request(options) {
  return axios(options)
    .then(res => {
      return res;
    })
    .catch(error => {
      const {
        response: { status, statusText }
      } = error;
      notification.error({ message: status, description: statusText });
      return Promise.reject(error);
    });
}

export default request;

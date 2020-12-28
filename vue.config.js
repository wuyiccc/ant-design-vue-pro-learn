/**
 * @author wuyiccc
 * @date 2020/12/26 22:33
 * 岂曰无衣, 与子同袍
 */
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        bypass: function(req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          } else if (process.env.MOCK !== "none"){ // 如果package.json中的 "serve:no-mock"配置设置为none，就不走mock环境
            console.log("### req path");
            console.log(req.path);
            const name = req.path
              .split("/api/")[1]
              .split("/")
              .join("_");
            console.log("####name");
            console.log(name);
            const mock = require(`./mock/${name}`);
            const result = mock(req.method);
            console.log("#### result");
            console.log(result);
            delete require.cache[require.resolve(`./mock/${name}`)]; // 删除请求的缓存
            return res.send(result);
          }
        }
      }
    }
  }
};

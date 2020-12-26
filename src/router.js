/**
 * @author wuyiccc
 * @date 2020/12/27 0:17
 * 岂曰无衣, 与子同袍
 */
import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import RenderRouterView from "./components/RenderRouterView.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/user",
      component: RenderRouterView,
      children: [
        {
          path: "/user/login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/user/Login.vue")
        },
        {
          path: "/user/register",
          name: "register",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/user/Register.vue")
        }
      ]
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});

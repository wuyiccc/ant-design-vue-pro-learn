/**
 * @author wuyiccc
 * @date 2020/12/27 0:17
 * 岂曰无衣, 与子同袍
 */
import Vue from "vue";
import Router from "vue-router";
import NotFound from "./views/404";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    // 用户登录注册路由
    {
      path: "/user",
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/UserLayout"),
      children: [
        {
          path: "/user",
          redirect: "/user/login"
        },
        {
          path: "/user/login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/user/Login")
        },
        {
          path: "/user/register",
          name: "register",
          component: () =>
            import(/* webpackChunkName: "user" */ "./views/user/Register")
        }
      ]
    },
    // 核心页面路由
    {
      path: "/",
      component: () =>
        import(/* webpackChunkName: "layout" */ "./layouts/BasicLayout"),
      children: [
        // 根路由重定向
        {
          path: "/",
          redirect: "/dashboard/analysis"
        },
        // dashboard
        {
          path: "/dashboard",
          name: "dashboard",
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/dashboard/analysis",
              name: "analysis",
              component: () =>
                import(
                  /* webpackChunkName: "dashboard" */ "./views/Dashboard/Analysis"
                )
            }
          ]
        },
        // form
        {
          path: "/form",
          name: "form",
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/form/basic-form",
              name: "basicform",
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/Forms/BasicForm")
            },
            {
              path: "/form/step-form",
              name: "stepform",
              component: () =>
                import(/* webpackChunkName: "form" */ "./views/Forms/StepForm"),
              children: [
                {
                  path: "/form/step-form",
                  redirect: "/form/step-form/info"
                },
                {
                  path: "/form/step-form/info",
                  name: "info",
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ "./views/Forms/StepForm/Step1"
                    )
                },
                {
                  path: "/form/step-form/confirm",
                  name: "confirm",
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ "./views/Forms/StepForm/Step2"
                    )
                },
                {
                  path: "/form/step-form/result",
                  name: "result",
                  component: () =>
                    import(
                      /* webpackChunkName: "form" */ "./views/Forms/StepForm/Step3"
                    )
                }
              ]
            }
          ]
        }
      ]
    },
    // 错误页面
    {
      path: "*",
      name: "404",
      component: NotFound
    }
  ]
});

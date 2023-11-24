import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

import BigLayout from '@/big-layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/close-contact/index/close'
  }
]

// 异步路由
export const asyncRoutes = [
  /**
   * 大屏相关 16:9 lc
   */
  // {
  //   path: '/normal-screen/immigration-page',
  //   component: () => import('@/normal-screen/immigration-page/index'),
  //   meta: { title: '境外输入', icon: 'el-icon-s-help' }
  // },
  {
    path: '/normal-screen/overseas-input-page',
    component: () => import('@/normal-screen/overseas-input-page'),
    meta: { title: '境外输入', icon: 'el-icon-s-help' }
  },
  /**
   * 大屏相关 16:9 旧
   */
  {
    path: '/big',
    component: BigLayout,
    redirect: '/big/index',
    meta: { title: '数据大屏', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        component: () => import('@/big/shiliu-page/cockpit-page'),
        meta: { title: '驾驶舱', icon: 'table' }
      },
      {
        path: 'early-warning',
        component: () => import('@/big/shiliu-page/early-warning-page'),
        meta: { title: '预警信息', icon: 'table' }
      },
      {
        path: 'guangdong',
        component: () => import('@/big/shiliu-page/guangdong-page'),
        meta: { title: '广东疫情', icon: 'table' }
      },
      {
        path: 'guangdong-import',
        component: () => import('@/big/shiliu-page/guangdong-import-page'),
        meta: { title: '广东疫情-外省输入', icon: 'table' }
      },
      {
        path: 'guangdong-bendi',
        component: () => import('@/big/shiliu-page/guangdong-local-page'),
        meta: { title: '广东疫情-本地', icon: 'table' }
      },
      {
        path: 'hongkong',
        component: () => import('@/big/shiliu-page/hongkong-page'),
        meta: { title: '香港疫情', icon: 'table' }
      },
      {
        path: 'syndrome',
        component: () => import('@/big/shiliu-page/syndrome-page'),
        meta: { title: '症候群', icon: 'table' }
      },
      {
        path: 'aggregation',
        component: () => import('@/big/shiliu-page/aggregation-page'),
        meta: { title: '聚集性', icon: 'table' }
      },

      {
        path: 'crowd-warning',
        component: () => import('@/big/shiliu-page/crowd-warning-page'),
        meta: { title: '人群预警', icon: 'table' }
      },
      {
        path: 'input-forecast',
        meta: { title: '输入预测', icon: 'table' },
        component: () => import('@/big/shiliu-page/input-forecast-page'),
        redirect: '/input-forecast/home',
        children: [
          {
            path: 'home',
            component: () =>
              import('@/big/shiliu-page/input-forecast-page/home'),
            meta: {
              title: '首页',
              icon: 'table',
              // 顶部栏插槽
              headerSlot: () =>
                import(
                  '@/big/shiliu-page/input-forecast-page/components/HeaderSlot'
                )
            }
          },
          {
            path: 'diversion',
            component: () => import('@/big/shiliu-page/diversion-page'),
            meta: {
              title: '人员分流',
              icon: 'table',
              // 顶部栏插槽
              headerSlot: () =>
                import(
                  '@/big/shiliu-page/input-forecast-page/components/HeaderSlot'
                )
            }
          },
          {
            path: 'isolation',
            component: () => import('@/big/shiliu-page/isolation-page'),
            meta: {
              title: '隔离策略',
              icon: 'table',
              // 顶部栏插槽
              headerSlot: () =>
                import(
                  '@/big/shiliu-page/input-forecast-page/components/HeaderSlot'
                )
            }
          },
          // TODO 引入静态html
          {
            path: 'http://119.254.145.18:20002/DiseaseControl/#/',
            meta: { title: '模型预测', icon: 'table' }
          }
        ]
      }
    ]
  },
  /**
   * 大屏 3 : 1
   */
  {
    path: '/scale-big',
    component: () => import('@/big-layout/ratio-layout'),
    redirect: '/scale-big/index',
    meta: { title: '新数据大屏-3:1', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        component: () => import('@/big/scale-big-page'),
        meta: { title: '驾驶舱', icon: 'table' }
      },
      {
        path: 'multipoint',
        component: () => import('@/big/scale-big-page/multipoint-page'),
        meta: { title: '多点预测', icon: 'table' },
        hidden: true
      },
      // 演示页面1
      {
        path: 'new-multipoint',
        component: () =>
          import('@/big/scale-big-page/new-multipoint-page/demo2.vue'),
        meta: { title: '多点预测', icon: 'table' }
      },
      // 演示页面2
      {
        path: 'new-multipoint-1',
        component: () =>
          import('@/big/scale-big-page/new-multipoint-page/demo1.vue'),
        meta: { title: '多点预测', icon: 'table' },
        hidden: true
      },
      {
        path: 'input-forecast',
        component: () => import('@/big/scale-big-page/input-forecast-page'),
        meta: {
          title: '输入预测',
          icon: 'table', // 顶部栏插槽
          headerSlot: () =>
            import(
              '@/big/scale-big-page/input-forecast-page/components/HeaderSlot'
            )
        }
      },
      {
        path: 'yuce1',
        component: () => import('@/big/scale-big-page/yuce-page'),
        meta: {
          title: '个案扩散预测',
          icon: 'table',
          headerSlot: () =>
            import('@/big/scale-big-page/yuce-page/components/HeaderSlot')
        }
      },
      {
        path: 'yuce2',
        component: () => import('@/big/scale-big-page/yuce2-page'),
        meta: {
          title: '个案扩散预测-2',
          icon: 'table',
          headerSlot: () =>
            import('@/big/scale-big-page/yuce2-page/components/HeaderSlot')
        }
      },
      {
        path: 'guangdong',
        component: () => import('@/big/scale-big-page/guangdong-page'),
        meta: { title: '广东省', icon: 'table' },
        hidden: true
      },
      {
        path: 'guangdong-zt',
        component: () => import('@/big/scale-big-page/guangdong-zt-page'),
        meta: { title: '广东省(zt)', icon: 'table' },
        hidden: true
      }
    ]
    // hidden: true
  },
  // 图片演示
  {
    path: '/all-page',
    component: () => import('@/big/scale-big-page/all-page'),
    meta: { title: '演示', icon: 'el-icon-s-help' }
  },
  // 兼容3:1 16：9 TODO 暂未兼容
  {
    path: '/flex-page',
    component: () => import('@/big-layout/flex-layout.vue'),
    meta: { title: '比例伸缩', icon: 'el-icon-s-help' },
    redirect: '/flex-page/multipoint',
    hidden: true,
    children: [
      {
        path: 'multipoint',
        component: () => import('@/big/flex-page/multipoint-page'),
        meta: { title: '多点预测', icon: 'table' }
      },
      // 多点demo1, 重点人群+
      {
        path: 'multipoint-1',
        component: () => import('@/big/flex-page/multipoint-demo2-page/demo1'),
        meta: { title: '多点预测', icon: 'table' },
        hidden: true
      },
      // 多点demo2
      {
        path: 'multipoint-2',
        component: () => import('@/big/flex-page/multipoint-demo2-page/demo2'),
        meta: { title: '多点预测', icon: 'table' },
        hidden: true
      },
      // 多点demo3
      {
        path: 'multipoint-3',
        component: () => import('@/big/flex-page/multipoint-demo3-page'),
        meta: { title: '多点预测', icon: 'table' },
        hidden: true
      }
    ]
  },

  /**
   * 业务系统相关
   */
  // 系统切换页面
  {
    path: '/sys/change',
    component: () => import('@/views/sys-page'),
    meta: { title: '多病种切换', icon: 'table' },
    hidden: true
  },

  // 个案追踪
  {
    path: '/case-track-page',
    component: Layout,
    redirect: '/case-track-page/index',
    meta: { title: '个案追踪', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        meta: { icon: 'table' },
        redirect: '/case-track-page/index/trace-list',
        component: () => import('@/views/case-track-page/index'),
        children: [
          {
            path: 'trace-list',
            component: () => import('@/views/case-track-page/trace-list'),
            meta: { title: '追踪患者数据列表', icon: 'table' }
          },
          {
            path: 'track-page/index/:idNumber',
            component: () => import('@/views/case-track-page/track-page/index'),
            meta: { title: '诊疗轨迹追踪（死亡）', icon: 'dashboard' },
            hidden: true
          },
          {
            path: 'nodie-track-page/index/:idNumber',
            component: () =>
              import('@/views/case-track-page/nodie-track-page/index'),
            meta: { title: '诊疗轨迹追踪（存活）', icon: 'dashboard' },
            hidden: true
          }
        ]
      }
    ]
  },
  // 重点人群监测
  {
    path: '/important-people-page',
    component: Layout,
    meta: { title: '风险预警', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/important-people-page/index'),
        meta: { title: '重点人群监测', icon: 'dashboard' }
      }
    ]
  },
  // 密接管理
  {
    path: '/close-contact',
    component: Layout,
    redirect: '/close-contact/index',
    meta: { title: '密切信息管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        meta: { icon: 'table' },
        redirect: '/close-contact/index/close',
        component: () => import('@/views/close-contact-page/index'),
        children: [
          {
            path: 'close',
            component: () => import('@/views/close-contact-page/close'),
            meta: { title: '密接数据列表', icon: 'table' }
          },
          {
            path: 'details/:name',
            component: () =>
              import('@/views/close-contact-page/details-page/index'),
            meta: { title: '密接详情', icon: 'table' },
            hidden: true
          }
        ]
      }
    ]
  },
  // 数据管理
  {
    path: '/epidemic-data',
    component: Layout,
    redirect: '/epidemic-data/index',
    meta: { title: '疫情数据管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/epidemic-data-page/index'),
        meta: { title: '风评报告', icon: 'table' }
      },
      {
        path: 'data-manage',
        component: () => import('@/views/data-manage-page/index'),
        meta: { title: '数据管理', icon: 'el-icon-s-help' }
      }
    ]
  },

  /**
   * demo 目录
   */
  {
    path: '/demo',
    component: BigLayout,
    meta: { title: 'demo相关', icon: 'el-icon-s-help' },
    hidden: true,
    children: [
      // 富文本
      {
        path: '/tinymce',
        component: () => import('@/views/demo-page/tinymce-page'),
        meta: { title: '富文本', icon: 'dashboard' }
      },
      // 活动热力图
      {
        path: '/active-diagram',
        component: () => import('@/views/demo-page/active-diagram-page'),
        meta: { title: '活动热力图', icon: 'dashboard' }
      },
      // 密接图谱
      {
        path: '/contact-map',
        component: () => import('@/views/demo-page/contact-map-page'),
        meta: { title: '密接图谱', icon: 'dashboard' }
      },
      // 重点检测人群
      {
        path: '/key-test',
        component: () => import('@/views/demo-page/key-test-page'),
        meta: { title: '重点检测人群', icon: 'dashboard' }
      },
      // mapbox 离线地图
      {
        path: '/mapbox',
        component: () => import('@/big/demo-page/mapbox-page'),
        meta: { title: '离线地图', icon: 'dashboard' }
      },
      // 动效图表组件
      {
        path: '/animation-chart',
        component: () => import('@/big/demo-page/animation-chart-page'),
        meta: { title: '动效图表组件', icon: 'dashboard' }
      }
    ]
    // hidden: true
  },

  // 单页面调试
  {
    path: '/test',
    component: () => import('@/test/index'),
    hidden: true
  },
  {
    path: '/hongkong',
    component: () => import('@/big/scale-big-page/input-forecast-page/components/Hongkong'),
    hidden: true
  },
  {
    path: '/Diversion2',
    component: () => import('@/big/scale-big-page/input-forecast-page/components/Diversion2'),
    hidden: true
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

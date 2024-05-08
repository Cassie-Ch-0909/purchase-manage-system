import { createRouter, createWebHistory } from "vue-router";
import Layout from "../views/layout/Index.vue";
import Login from "../views/login/Login.vue";
import Home from "../views/home/Home.vue"

// 产品管理
const Product = ()=>import('../views/product/Index.vue')
const ProductList = ()=>import('../views/product/list/List.vue')
const ProductCategory = ()=>import('../views/product/category/Category.vue')

// 订单
const Order = ()=>import('../views/order/Index.vue')
const OrderList = ()=>import('../views/order/list/List.vue')
const OrderCollect= ()=>import('../views/order/collect/Collect.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "layout",
      component: Layout,
      // layout右侧Header下方的内容
      children:[
        // 首页
        {
          path:'/',
          name:'home',
          component:Home
        },
        // 产品管理
        {
          path:'/product',
          name:'product',
          component:Product,
          children:[
            {
              path:'productList',
              name:'productList',
              component:ProductList
            },
            {
              path:'category',
              name:'category',
              component:ProductCategory
            }
          ]
        },
        // 订单管理
        {
          path:'/order',
          name:'order',
          component:Order,
          children:[
            {
              path:'orderList',
              name:'orderList',
              component:OrderList
            },
            {
              path:'collect',
              name:'collect',
              component:OrderCollect
            }
          ]
        },
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
});

export default router;

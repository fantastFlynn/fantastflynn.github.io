import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const webpackContext = require.context('../views/', true, /\.vue/);
// console.log( webpackContext );
const viewFiles = webpackContext.keys();
// console.log( viewFiles );
const pageList = viewFiles.filter((viewPath)=>{
  let flName = viewPath.split('/').pop();
  return /^[^A-Z]/.test( flName );
})
// console.log( pageList );
const routeList = pageList.map((viewPath)=>{
  return {
    path: viewPath.slice(1, -4),
    component: async()=>{
      // console.log(' -- ', viewPath);
      let cpnt = webpackContext(viewPath);
      document.title = cpnt.title || 'vue-main';
      return cpnt.default;
    },
  };
})


const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  ...routeList,
  
  {
    path: '/catalog',
    component: ()=>import('remote_vue_applications/catalog.vue'),
  },
  {
    path: '/mindMap/list',
    component: ()=>import('remote_vue_applications/mindMap/list.vue'),
  },
  {
    path: '/mindMap/detail',
    component: ()=>import('remote_vue_applications/mindMap/detail.vue'),
  },
];
console.log(' route list: ',  routeList, routes );

const router = new VueRouter({
  routes
})

export default router;

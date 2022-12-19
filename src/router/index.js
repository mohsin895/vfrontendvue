import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout'),
    redirect: {path: 'home'},
    children: [
      {
        path: '/home',
        name: 'layout.home',
        component: () => import('@/views/HomeView.vue')
      },
     {
        path: '/otherOption',
        name: 'layout.otherOption',
        component: () => import('@/views/cms/dropdown/otherOption.vue')
      },
      {
        path: '/case-application',
        name: 'layout.application',
        component: () => import('@/views/Application.vue')
      },
      {
        path: '/case-tracking',
        name: 'layout.tracking',
        component: () => import('@/views/Tracking.vue')
      },
     
      {
        path: '/case-slip',
        name: 'layout.caseSlip',
        component: () => import('@/views/CaseSlip.vue')
      },
      {
        path: '/nomminator-add',
        name: 'layout.NomminatorAdd',
        component: () => import('@/views/NomminatorAdd.vue')
      },
      
      
      {
        path: '/workingCourt-Counter',
        name: 'layout.workingCourt',
        component: () => import('@/views/workingCourt.vue')
      },
      {
        path: '/ourServices',
        name: 'layout.ourServices',
        component: () => import('@/views/ourServices.vue')
      },
      {
        path: '/service/:dataId/fouzdari',
        name: 'layout.fouzdariService',
        component: () => import('@/views/cms/FouzdariService.vue')
      },
      {
        path: '/service/:dataId/dewyani',
        name: 'layout.dewyaniService',
        component: () => import('@/views/cms/DewyaniService.vue')
      },
      // CMS pages start
      
      // sidebar all option router
      {
        path: '/all-form',
        name: 'layout.form',
        component: () => import('@/views/cms/dropdown/form.vue')
      },
      {
        path: '/all-law',
        name: 'layout.allLaw',
        component: () => import('@/views/cms/dropdown/AllLaw.vue')
      },
      
      {
        path: '/all-gadget',
        name: 'layout.gadget',
        component: () => import('@/views/cms/dropdown/gadget.vue')
      },
      {
        path: '/feeAll',
        name: 'layout.feeAll',
        component: () => import('@/views/cms/dropdown/feeAll.vue')
      },
      
      {
        path: '/all-NoticeBoard',
        name: 'layout.NoticeBoard',
        component: () => import('@/views/cms/dropdown/NoticeBoard.vue')
      },
      {
        path: '/question-answer',
        name: 'layout.questionAnswer',
        component: () => import('@/views/cms/QuestionAnswer.vue')
      },
      //newsboard link hare
      {
        path: '/All-newsBoard',
        name: 'layout.newsBoard',
        component: () => import('@/views//cms/newsBoard.vue')
      },
      //meadia rounter link hare
      {
        path: '/:dataId/media/',
        name: 'layout.media',
        component: () => import('@/views/Media.vue')
      },
      // CMS pages end

      {
        path: '/union-member',
        name: 'unionMember',
        component: () => import('@/views/UnionMember.vue')
      },
    ]
  },
  
  {
    path: '*',
    name: 'all',
    component: () => import('@/layout/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

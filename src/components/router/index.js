// import Vue fromouter'
// import ArticleFrame from '@/components/blog/ArticleFrame'
// import Blank from '@/components/Blank'
// import About from '@/components/About'
// import Category from '@/components/Category'
// import Portal from '@/components/Portal'
// import Archive from '@/components/Archive'
// import Tags from '@/components/Tags'
// import C1 from '@/components/base/C1'
// import C2 from '@/components/base/C2'

// Vue.use(VueRouter)

// const Category = () => import('../Category.vue');
const routes = [
    {path: '/', redirect: '/detail'},
    {
        path: '/detail/:articleId', components: {
            category: () => import('../Category.vue'),
            articleFrame: () => import('../blog/ArticleFrame.vue')
        }, props: {
            category: false,
            articleFrame: true
        }
    },
    {
        path: '/about', components: {
            blank: () => import('../Blank.vue'),
            about: () => import('../About.vue')
        }
    },
    {
        path: '/blogPortal', components: {
            portal: () => import('../Portal.vue'),
            blank: () => import('../Blank.vue')
        }
    }
    ,
    {
        path: '/archive', components: {
            archive: () => import('../Archive.vue'),
            blank: () => import('../Blank.vue')
        }
    },
    {
        path: '/tags', components: {
            tags: () => import('../Tags.vue'),
            blank: () => import('../Blank.vue')
        }
    },
    {
        path: '/edit/:articleId', components: {
            edit: () => import('../Edit.vue'),
            blank: () => import('../Blank.vue')
        }, props: {
            edit: true
        }
    }
]
export default new VueRouter({
    //  路由变化时，滚动到顶部
    routes, scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0}
    }
})

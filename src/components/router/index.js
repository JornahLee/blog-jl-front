// import Vue fromouter'
// import ArticleFrame from '@/components/blog/ArticleFrame'
// import Blank from '@/components/Blank'
// import About from '@/components/About'
// import Category from '@/components/Category'
// import articleList from '@/components/articleList'
// import Archive from '@/components/Archive'
// import Tags from '@/components/Tags'
// import C1 from '@/components/base/C1'
// import C2 from '@/components/base/C2'

// Vue.use(VueRouter)

// const Category = () => import('../Category.vue');
const routes = [
    {path: '/', redirect: '/index'},
    {
        path: '/index', components: {
            index: () => import('../Index.vue'),
            blank: () => import('../Blank'),
            userInfo: () => import('../UserInfo.vue')
        }
    },
    {
        path: '/detail/:articleId/:headLineStr?', components: {
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
        path: '/articleList/:type/:value?/page/:pageNum?', components: {
            articleList: () => import('../ArticleList.vue'),
            articleNav: () => import('../ArticleNav.vue'),
            blank: () => import('../Blank.vue')
        }, props: {
            articleList: true
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
            blank: () => import('../Blank.vue'),
            // editLeftSide: () => import('../admin/EditLeftSide.vue')
            editLeftSide: () => import('../admin/EditLeftSideV2.vue')
        }, props: {
            edit: true
        }
    },
    {
        path: '/music', components: {
            music: () => import('../Music.vue'),
            blank: () => import('../Blank.vue'),
        }
    },
    {
        path: '/login', components: {
            login: () => import('../Login.vue'),
            blank: () => import('../Blank.vue'),
        }
    },
    {
        path: '/tool', components: {
            tool: () => import('../tool/Tool.vue')
        }
    }
]
const vueRouter = new VueRouter({
    //  路由变化时，滚动到顶部
    routes, scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0}
    }
})
const vueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return vueRouterPush.call(this, to).catch(err => err)
}
export default vueRouter;

import Vue from 'vue'
import VueRouter from 'vue-router'
import ArticleFrame from '@/components/blog/ArticleFrame'
import Blank from '@/components/Blank'
import About from '@/components/About'
import Category from '@/components/Category'
import Portal from '@/components/Portal'
import Archive from '@/components/Archive'
import Tags from '@/components/Tags'
import C1 from '@/components/base/C1'
import C2 from '@/components/base/C2'

Vue.use(VueRouter)


const routes = [
    {path: '/', redirect: '/detail'},
    {
        path: '/detail/:articleId', components: {
            category: Category,
            articleFrame: ArticleFrame
        }, props: {
            category: false,
            articleFrame: true
        }
    },
    {
        path: '/about', components: {
            blank: Blank,
            about: About
        }
    },
    {
        path: '/blogPortal', components: {
            portal: Portal,
            blank: Blank
        }
    }
    ,
    {
        path: '/archive', components: {
            archive: Archive,
            blank: Blank
        }
    },
    {
        path: '/tags', components: {
            tags: Tags,
            blank: Blank
        }
    },
    {
        path: '/c1', components: {
            c1: C1
        }
    },
    {
        path: '/c2', components: {
            c2: C2
        }
    }
]
const router = new VueRouter({
    //  路由变化时，滚动到顶部
    routes, scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0}
    }
})
export default router

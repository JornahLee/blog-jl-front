import Vue from 'vue'
import VueRouter from 'vue-router'
import ArticleFrame from '@/components/blog/ArticleFrame'
import Category from '@/components/Category'
import C1 from '@/components/base/C1'
import C2 from '@/components/base/C2'

Vue.use(VueRouter)


const routes = [
    {path: '/', redirect: '/test'},
    {
        path: '/detail', components: {
            category: Category,
            articleFrame: ArticleFrame
        }
    },
    {
        path: '/test', components: {
            c1: C1,
            c2: C2
        }
    }
]
const router = new VueRouter({routes})
export default router

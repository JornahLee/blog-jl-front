import myAxios from './myAxios'

export default {
    getArticleById: function (id) {
        //todo
    },
    articleUrlBy: function (id) {

    },
    getOwnerInfo() {
        let url = '/blog/user/info'
        return myAxios.get(url);
    },
    getIndexStatsInfo(){
        let url = '/blog/article/stats/info'
        return myAxios.get(url);
    },
    getRecommendList(size) {
        let url = '/blog/article/list/recommended'
        let params = {size: size}
        return myAxios.get(url, {params})
    }


};

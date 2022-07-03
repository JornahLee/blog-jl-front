import myAxios from './myAxios'

export default {
    getArticleById: function (articleId) {
        let url = '/blog/article/' + articleId
        return myAxios.get(url)
    },
    getOwnerInfo() {
        let url = '/blog/user/info'
        return myAxios.get(url);
    },
    getIndexStatsInfo() {
        let url = '/blog/article/stats/info'
        return myAxios.get(url);
    },
    getRecommendList(size) {
        let url = '/blog/article/list/recommended'
        let params = {size: size}
        return myAxios.get(url, {params})
    },
    getArticleMetaInfo(articleId) {
        let url = `/blog/article//meta/${articleId}`
        return myAxios.get(url)
    },
    getAllTag() {
        let url = '/blog/meta/tag/list'
        return myAxios.get(url);
    },
    getAllCategory() {
        let url = '/blog/meta/category/list'
        return myAxios.get(url)
    },
    saveMetaInfo(articleId, cateId, tagIds) {
        const url = '/blog/meta/save'
        let params = {
            articleId: articleId,
            cateId: cateId,
            tagIds: tagIds,
        }
        return myAxios.post(url, params);
    },
    newCate(cateName) {
        let url = `/blog/meta/category?name=${cateName}`
        return myAxios.put(url);
    },
    newTag(tagName) {
        let url = `/blog/meta/tag?name=${tagName}`
        return myAxios.put(url);
    },
    delCate(id) {
        let url = `/blog/meta/cate/${id}`
        return myAxios.delete(url)
    },
    delTag(id) {
        let url = `/blog/meta/tag/${id}`
        return myAxios.delete(url)
    },
    getNextOrLastArticle(id, isNext) {
        let url = '/blog/article/nextOrLast'
        let params = {articleId: id, next: isNext, byType: ''}
        return myAxios.get(url, {params})
    },
    deleteArticle(id) {
        const url = `/blog/article/${id}`
        return myAxios.delete(url);
    },
    saveOrUpdateArticle(article) {
        let url = '/blog/article/saveOrUpdate'
        return myAxios.post(url, article)
    },
    yiyan() {
        return myAxios.get('https://v1.hitokoto.cn')
    }


};

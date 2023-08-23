import myAxios from './myAxios'

// key = url
const apiCache = {}

// key = article id
const metaInfoCache = {}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

function getCache(cacheSource, cacheKey, runApi) {
    if (cacheSource[cacheKey]) {
        console.log("cache hit, cacheKey:" + cacheKey)
        return cacheSource[cacheKey];
    } else {
        const ret = runApi()
        cacheSource[cacheKey] = ret;
        return ret;
    }
}


export default {
    getArticleById: function (articleId, passphrase) {
        let url = '/blog/article/' + articleId
        let params = {passphrase: passphrase}
        return myAxios.get(url, {params})
    },
    getSiteInfo() {
        let url = '/blog/user/info'
        return getCache(apiCache, url, () => myAxios.get(url))
    },
    getRecommendList(size) {
        let url = '/blog/article/list/recommended'
        let params = {size: size}
        return getCache(apiCache, url, () => myAxios.get(url, {params}))
    },
    async getArticleMetaInfo(articleId) {
        //get cache 1st
        let url = `/blog/article/meta/${articleId}`
        await sleep(1000)
        return getCache(metaInfoCache, articleId, () => myAxios.get(url))
    },
    // getAllTag() {
    //     let url = '/blog/meta/tag/list'
    //     return myAxios.get(url);
    // },
    // getAllCategory() {
    //     let url = '/blog/meta/category/list'
    //     return myAxios.get(url)
    // },
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
    },
    getRecentRead() {
        let url = '/blog/user/recently-read'
        return myAxios.get(url);
    },
    saveStatisticsResult(articleId, readDuration, startReadTime) {
        let url = '/blog/user/recently-read'
        return myAxios.put(url, {
            articleId: id,
            readDuration: 0,
            startReadTime: startReadTime / 1000
        });
    },
    getArticleList(config) {
        let url = '/blog/article/list';
        return myAxios.post(url, config);
    },
    batchGetArticleMetaInfoAndCache(articleIdList) {
        let url = '/blog/article/meta/batch';
        myAxios.post(url, {articleIdList: articleIdList}).then(resp => {
            let dataList = resp.data.data
            // let promise = ;
            dataList.forEach(item => {
                metaInfoCache[item.articleId] = new Promise((resolve, reject) => {
                    resolve({data: {data: item}});
                })
            })
        })

    }


};

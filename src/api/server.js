


define(['jquery'],function($){

    function getBannerData(){
        return $.ajax('/api/mock/banner.json');
    }

    function getGoodsData(name){
        return $.ajax(`/api/mock/${name}.json`);
    }

    return {
        getBannerData,
        getGoodsData
    }

});
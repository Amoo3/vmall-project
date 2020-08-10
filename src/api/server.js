


define(['jquery'],function($){

    function getBannerData(){
        return $.ajax('/api/mock/banner.json');
    }

    return {
        getBannerData
    }

});
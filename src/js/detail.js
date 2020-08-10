
requirejs.config({
    paths : {
         "jquery" : "../lib/jquery-3.4.1.min"   
    }
});


define(['jquery', 
        '../api/server',
        './modules/banner'
    ],function($, 
        { getBannerData , getDetailData },
        initBanner
        ){

    getBannerData().then((res)=>{
        if(res.code == 0){
            initBanner( res.banner_list );
        }
    }).catch(()=>{});

    var type = window.location.search.match(/type=([^&]+)/)[1];
    var id = window.location.search.match(/id=([^&]+)/)[1];
   
    getDetailData(type , id).then((res)=>{
        //已经可以拿到对应详情页的数据。
        console.log(res);
    }).catch(()=>{});

});
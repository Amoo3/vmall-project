
//只要在主模块配置一次就可以了，因为其他的模块都是基于主模块使用的。
requirejs.config({
    paths : {
         "jquery" : "../lib/jquery-3.4.1.min"   
    }
});


define(['jquery', 
        '../api/server',
        './modules/banner'
    ],function($, 
        { getBannerData },
        initBanner
        ){

    //console.log($);

    getBannerData().then((res)=>{
        //console.log(res);
        if(res.code == 0){
            initBanner( res.banner_list );
        }
    }).catch(()=>{});

});
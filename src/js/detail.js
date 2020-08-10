
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

    getBannerData().then((res)=>{
        if(res.code == 0){
            initBanner( res.banner_list );
        }
    }).catch(()=>{});

});
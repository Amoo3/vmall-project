
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
        { getBannerData , getGoodsData },
        initBanner
        ){

    //console.log($);

    getBannerData().then((res)=>{
        //console.log(res);
        if(res.code == 0){
            initBanner( res.banner_list );
        }
    }).catch(()=>{});

    var goodsName = ['phone','book','pad'];
    for(let i=0;i<goodsName.length;i++){
        getGoodsData(goodsName[i]).then((res)=>{
            if(res.code == 0){
                initGoods(goodsName[i] , res);
            }
        }).catch(()=>{});
    }

    function initGoods(name , res){
        var title = res.title;
        var type = res.type;
        var data = res.goods_list;
        var tmp = `
            <h2 class="goods_title">${title}</h2>
            <ul class="goods_list clearfix">
                ${
                    data.map((v,i,a)=>{
                        return `
                            <li>
                                <a href="/view/detail.html?type=${type}&id=${v.goodsId}">
                                    <div><img src="${v.goodsImg}" alt=""></div>
                                    <h3>${v.goodsName}</h3>
                                    <p>${v.goodsPrice}</p>
                                </a>
                            </li>
                        `;
                    }).join('').repeat(3)
                }    
            </ul>
        `;
        $(`#${name}`).html(tmp);
    }

});
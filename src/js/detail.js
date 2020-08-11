
requirejs.config({
    paths : {
         "jquery" : "../lib/jquery-3.4.1.min"   
    }
});


define(['jquery', 
        '../api/server',
        './modules/banner',
        './modules/storage'
    ],function($, 
        { getBannerData , getDetailData },
        initBanner,
        { addCartStorage }
        ){

    getBannerData().then((res)=>{
        if(res.code == 0){
            initBanner( res.banner_list );
        }
    }).catch(()=>{});

    var type = window.location.search.match(/type=([^&]+)/)[1];
    var id = window.location.search.match(/id=([^&]+)/)[1];
    var $detail = $('#detail');
    var $detailGoods = $('#detailGoods');
   
    getDetailData(type , id).then((res)=>{
        //已经可以拿到对应详情页的数据。
        //console.log(res);
        initDetail(res);
    }).catch(()=>{});

    function initDetail(res){
        create(res);
        magnifier();
        chooseColors();
        chooseNumbers();
        addCart(res);
    }

    function create(res){    //渲染数据
        var tmp = `
            <div class="detail_gallery l">
                <div class="detail_gallery_normal">
                    <img src="${res.photoNormal}" alt="">
                    <span></span>
                </div>
                <div class="detail_gallery_large">
                    <img src="${res.photoLarge}" alt="">
                </div>
            </div>
            <div class="detail_message l">
                <h2>${res.goodsName}</h2>
                <p>价 格 <span class="detail_message_price">¥${res.goodsPrice}.00</span></p>
                <p>选择颜色 
                ${
                    res.chooseColor.map((v,i,a)=>{
                        if(i==0){
                            return `<span class="detail_message_box active">${v}</span>`;
                        }
                        return `<span class="detail_message_box">${v}</span>`;
                    }).join('')
                }
                <div class="detail_message_btn clearfix">
                    <div class="detail_message_num l">
                        <input type="text" value="1">
                        <span>+</span>
                        <span>-</span>
                    </div>
                    <div class="detail_message_cart l"><a href="javascript:;">加入购物车</a></div>
                    <div class="detail_message_computed l"><a href="/view/cart.html">立即下单</a></div>
                </div>
            </div>
            `;
            var tmp2 = res.goodsInfo.map((v,i,a)=>{
                return `<img src="${v}" alt="">`;
            }).join('');
            
            $detail.html(tmp);
            $detailGoods.html(tmp2);
    }

    function magnifier(){   //放大镜
        var $detail_gallery_normal = $detail.find('.detail_gallery_normal');
        var $detail_gallery_normal_span = $detail_gallery_normal.find('span');
        var $detail_gallery_large = $detail.find('.detail_gallery_large');
        var $detail_gallery_large_img = $detail_gallery_large.find('img');

        $detail_gallery_normal.hover(function(){
            $detail_gallery_normal_span.show();
            $detail_gallery_large.show();
        },function(){
            $detail_gallery_normal_span.hide();
            $detail_gallery_large.hide();
        }).mousemove(function(ev){

            var L = ev.pageX - $detail_gallery_normal.offset().left - $detail_gallery_normal_span.outerWidth()/2;
            var T = ev.pageY - $detail_gallery_normal.offset().top - $detail_gallery_normal_span.outerHeight()/2;

            if(L<0){
                L = 0;
            }
            else if(L>$(this).outerWidth() - $detail_gallery_normal_span.outerWidth()){
                L = $(this).outerWidth() - $detail_gallery_normal_span.outerWidth();
            }

            if(T<0){
                T = 0;
            }
            else if(T>$(this).outerHeight() - $detail_gallery_normal_span.outerHeight()){
                T = $(this).outerHeight() - $detail_gallery_normal_span.outerHeight();
            }

            $detail_gallery_normal_span.css({
                left : L,
                top : T
            });

            var scaleX = L / ($(this).outerWidth() - $detail_gallery_normal_span.outerWidth());  // 0 ~ 1
            var scaleY = T / ($(this).outerHeight() - $detail_gallery_normal_span.outerHeight());

            $detail_gallery_large_img.css({
                left : - scaleX * ($detail_gallery_large_img.outerWidth() - $detail_gallery_large.outerWidth()),
                top : - scaleY * ($detail_gallery_large_img.outerHeight() - $detail_gallery_large.outerHeight())
            });

        });

    }

    function chooseColors(){  //选择颜色
        var $detail_message_box = $detail.find('.detail_message_box');

        $detail_message_box.click(function(){
            $(this).addClass('active').siblings().removeClass('active');
        });

    }

    function chooseNumbers(){   //选择个数
        var $input = $detail.find('.detail_message_num input');
        var $spans = $detail.find('.detail_message_num span');
        $spans.eq(0).click(function(){   // 累加个数
            var val = $input.val();
            val++;
            $input.val(val);
        });
        $spans.eq(1).click(function(){   // 累减个数
            var val = $input.val();
            if(val <= 1){
                return;
            }
            val--;
            $input.val(val);
        });
        $input.on('input',function(){   //添加input事件
            var val = $(this).val();
            var re = /\D/;
            if( re.test(val) ){
                $(this).val(1);
            }
        });
    }

    function addCart(res){   //添加购物车
        var $detail_message_cart = $detail.find('.detail_message_cart');
        $detail_message_cart.click(function(){

            var data = {
                goodsChecked : true,   // 商品在购物车中是否是选中的
                goodsName : res.goodsName,
                goodsPrice : res.goodsPrice,
                goodsId : res.goodsId,
                goodsColor : $detail.find('.detail_message_box').filter('.active').html(),
                goodsNumber : Number($detail.find('.detail_message_num input').val())
            };

            //console.log(data);   // 要想办法添加到本地存储中，这样购车页就可以获取到数据了。

            addCartStorage(data,function(){
                alert('购物车添加成功！！');
            });
        });
    }

});
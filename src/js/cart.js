requirejs.config({
    paths : {
         "jquery" : "../lib/jquery-3.4.1.min"   
    }
});

define(['jquery',
    './modules/storage'
],function($,
    { setStorage , getStorage }
    ){

    var $cart = $('#cart');
    var $cart_list = $cart.find('.cart_list');
    var $cart_title_selectAll = $cart.find('.cart_title_selectAll');
    var cartData;
    initCart();
    chooseCbs();
    chooseNumber();
    chooseRemove();

    function initCart(){
        create();
        isAllCheckbox();
        computedAll();
    }

    function create(){  //初始创建购物车列表
        
        cartData = JSON.parse(getStorage('cart')) || [];
        
        var tmp = cartData.map((v,i,a)=>{
            return `
                <li>
                    <div>
                    ${ v.goodsChecked ? '<input type="checkbox" checked></div>' : '<input type="checkbox"></div>' }
                    <div>${v.goodsName} ( ${v.goodsColor} )</div>
                    <div>¥ ${v.goodsPrice}.00</div>
                    <div>
                        <span class="cart_list_btn1">-</span>
                        <input class="cart_list_text" type="text" value="${v.goodsNumber}">
                        <span class="cart_list_btn2">+</span>
                    </div>
                    <div>¥ <span class="cart_list_allPrice">${ v.goodsPrice * v.goodsNumber }</span>.00</div>
                    <div class="cart_list_remove">删除</div>
                </li>
            `;
        }).join('');
        $cart_list.html(tmp);
    }
    
    function isAllCheckbox(){   //初始的全选按钮是否选中
        var $cbs = $cart_list.find('input[type="checkbox"]');
        var flag = true;
        $cbs.each(function(i,elem){
            if( $(elem).prop('checked') == false ){
                flag = false;
            }
        });
        if(flag){   // 全都选中
            $cart_title_selectAll.prop('checked',true);
        }
        else{  // 有没选中的复选框
            $cart_title_selectAll.prop('checked',false);
        }
    }

    function computedAll(){   //计算总价和总个数
        var $cbs = $cart_list.find('input[type="checkbox"]');
        var $cart_list_text = $cart_list.find('.cart_list_text');
        var $cart_list_allPrice = $cart_list.find('.cart_list_allPrice');
        var $cart_computed_price_p = $cart.find('.cart_computed_price p');
        var allNumber = 0;
        var allPrice = 0;
        $cbs.each(function(i,elem){
            if( $(elem).prop('checked') == true ){
                allNumber += Number($cart_list_text.eq(i).val());
                allPrice += Number($cart_list_allPrice.eq(i).html());
            }
        });
        $cart_computed_price_p.eq(0).html(`总计：¥ ${allPrice}.00`);
        $cart_computed_price_p.eq(1).html(`已选择 ${allNumber} 件商品`);
    }

    // function chooseCbs(){   //对复选框集合进行操作
    //     var $cbs = $cart_list.find('input[type="checkbox"]');
    //     $cbs.click(function(){  //点击复选框的时候，对整个数据进行改变，然后通过数据的改变影响DOM的变化
    //         var index = $(this).closest('li').index();

    //         if( $(this).prop('checked') ){
    //             cartData[index].goodsChecked = true;
    //         }
    //         else{
    //             cartData[index].goodsChecked = false;
    //         }

    //         setStorage('cart' , JSON.stringify(cartData));
    //         initCart();

    //     });
    // }

    function chooseCbs(){   //对复选框集合进行操作
        $cart.on('click','input[type="checkbox"]',function(){  //委托的写法
            var index = $(this).closest('li').index();
            if( $(this).prop('checked') ){
                cartData[index].goodsChecked = true;
            }
            else{
                cartData[index].goodsChecked = false;
            }
            setStorage('cart' , JSON.stringify(cartData));
            initCart();
        });
    }

    function chooseNumber(){   //对商品个数进行操作
        $cart.on('click','.cart_list_btn1',function(){  // 减
            var index = $(this).closest('li').index();
            if( cartData[index].goodsNumber<=1){
                return;
            }
            cartData[index].goodsNumber -= 1;
            setStorage('cart' , JSON.stringify(cartData));
            initCart();
        });
        $cart.on('click','.cart_list_btn2',function(){  // 加
            var index = $(this).closest('li').index();
            cartData[index].goodsNumber += 1;
            setStorage('cart' , JSON.stringify(cartData));
            initCart();
        });
    }

    function chooseRemove(){   //对商品进行删除操作
        $cart.on('click','.cart_list_remove',function(){
            var index = $(this).closest('li').index();
            cartData.splice(index , 1);
            setStorage('cart' , JSON.stringify(cartData));
            initCart();
        });
    }

});
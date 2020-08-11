//本地存储的模块


define(['jquery'],function($){

    function addCartStorage(data , cbFn){   //添加购物车本地存储

        var key = 'cart';
        var goodsId = data.goodsId;
        var goodsColor = data.goodsColor;
        var cartData = JSON.parse(getStorage(key)) || [];
        var flag = true;
        var index = -1;

        for(var i=0;i<cartData.length;i++){
            //如果if条件满足，说明本地存储中有同类型的数据
            if( cartData[i].goodsId == goodsId && cartData[i].goodsColor == goodsColor ){
                flag = false;
                index = i;   //可以知道同类型的数据在数组中是第几项。
            }
        }

        if(flag){   // 添加一条新的数据
            cartData.push(data);
            setStorage(key , JSON.stringify(cartData));
        }
        else{    // 在原来数据的基础上累加
            cartData[index].goodsNumber += data.goodsNumber;
            setStorage(key , JSON.stringify(cartData));
        }

        if(cbFn){
            cbFn();
        }


    }
    function setStorage(key,value){   //设置本地存储
        window.localStorage.setItem(key,value);
    }
    function getStorage(key){   //获取本地存储
        return window.localStorage.getItem(key);
    }

    return {
        addCartStorage,
        setStorage,
        getStorage
    }

});
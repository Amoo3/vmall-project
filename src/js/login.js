
requirejs.config({
    paths : {
         "jquery" : "../lib/jquery-3.4.1.min"   
    }
});
define(['jquery'], function ($) {
    readLoginData();
    toReg();
    function readLoginData() {
        $("#loginBtn").click(function () {
            $.get("http://jx.xuzhixiang.top/ap/api/login.php", {
                username: $("input")
                    .eq(0)
                    .val(),
                password: $("input")
                    .eq(1)
                    .val()
            }).then(data => {
                console.log(data);
                if (data.code == 1) {
                    localStorage.setItem("uid", data.data.id);
                    location.href = "index.html";
                } else {
                    alert("用户名或者密码错误，请重试！");
                }
            });
        });
    };
    function toReg(){
        $('button').eq(0).click(function(){
            location.href = "reg.html";
        })
    }
})
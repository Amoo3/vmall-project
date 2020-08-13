requirejs.config({
    paths: {
        "jquery": "../lib/jquery-3.4.1.min"
    }
});
define(['jquery'], function ($) {
    writeRegData();

    function writeRegData() {
        $("#regBtn").click(function () {
            //先验证用户名是否重名
            $.get("http://jx.xuzhixiang.top/ap/api/reg.php", {
                username: $("input")
                    .eq(0)
                    .val(),
                password: $("input")
                    .eq(1)
                    .val()
            }).then(data => {
                // console.log(data);
                if (data == 0) {
                    alert("用户名已存在");
                } else {
                    location.href = "login.html";
                }
            });
        });
    }
})
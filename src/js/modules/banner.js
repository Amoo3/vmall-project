

define(['jquery'],function($){

    function initBanner(data){
        create(data);
        bind();
    }

    function create(data){
        var tmp = `
        <ul class="banner_imgs">
            ${ data.map((v,i,a)=>{
                if(i==0){
                    return `<li class="show"><a href="${v.imgLink}"><img src="${v.imgUrl}" alt=""></a></li>`;
                }
                return `<li><a href="${v.imgLink}"><img src="${v.imgUrl}" alt=""></a></li>`;

            }).join('') }
        </ul>
        <ol class="banner_dots">
            ${ data.map((v,i,a)=>{
                if(i==0){
                    return '<li class="active"></li>';
                }
                return '<li></li>';

            }).join('') }
        </ol>
        `;
        $('#banner').html(tmp);
    }

    function bind(){
        var $dotsLis = $('#banner .banner_dots li');
        var $imgsLis = $('#banner .banner_imgs li');
        $dotsLis.on('click',function(){
            $(this).attr('class','active').siblings().attr('class','');
            $imgsLis.eq( $(this).index() ).attr('class','show').siblings().attr('class','');
        });
    }

    return initBanner;
    
});
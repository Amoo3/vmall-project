

var { src , dest , series , parallel , watch} = require('gulp');
var clean = require('gulp-clean');
var fileInclude = require('gulp-file-include');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var requirejsOptimize = require('gulp-requirejs-optimize');

function cleanTask(){   //清理
    return src('dist',{allowEmpty : true}) 
            .pipe(clean());
}
function htmlTask(){   //html任务
    return src('./src/view/*.html')
            .pipe(fileInclude({
                prefix : '@',    
                basepath : './src/view/templates' 
            }))
            .pipe(dest('dist/view'));
}
function cssTask(){   //css任务
    return src('./src/css/*.scss')
            .pipe(sass())
            .pipe(dest('dist/css'));
}

function staticTask(){
    return src('./src/static/**')
            .pipe(dest('dist/static'));
}

function libTask(){
    return src('./src/lib/**')
            .pipe(dest('dist/lib'));
}

function jsTask(){
    return src('./src/js/**')
            .pipe(dest('dist/js'));
}
function apiTask(){
    return src('./src/api/**')
            .pipe(dest('dist/api'));
}

function webTask(){   //开启一个web服务
    return src('dist')     
        .pipe( webserver({
            host : 'localhost',   
            port : 4000,       
            open : './view/index.html',  
            livereload : true,
            proxies:[   //配置反向代理
                {
                    source:'/api2',
                    target:'http://localhost/api2'
                }
            ]
        }) );
}

function watchTask(){   //实时监听文件的变化
    watch('./src/view/**' , htmlTask);
    watch('./src/css/**' , cssTask);
    watch('./src/static/**' , staticTask);
    watch('./src/lib/**' , libTask);
    watch('./src/js/**' , jsTask);
    watch('./src/api/**' , apiTask);
}

function jsBuildTask(){    //针对生成环境的
    return src('./src/js/*.js')
            .pipe(requirejsOptimize({
                optimize:"none",
                paths:{                        
                    "jquery":"empty:"  //不会把jquery模块合并进去
                }
            }))
            .pipe(dest('dist/js'));
}


module.exports = {
    //开发命令
    dev : series(cleanTask , parallel(htmlTask , cssTask , staticTask , libTask , jsTask , apiTask) , parallel(webTask , watchTask)),
    //生产命令
    build : series(cleanTask , parallel(htmlTask , cssTask , staticTask , libTask , jsBuildTask , apiTask) , parallel(webTask , watchTask))
};


var { src , dest , series , parallel , watch} = require('gulp');
var clean = require('gulp-clean');

function cleanTask(){   //清理
    return src('dist',{allowEmpty : true}) 
            .pipe(clean());
}

module.exports = {
    //开发命令
    dev : series(cleanTask),
    //生产命令
    build : series(cleanTask)
};
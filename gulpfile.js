var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function () {
  gulp.src('./')
    .pipe(webserver({
      host: 'localhost',
      port: 8070,
      livereload: true,
      open: './index.html',
      directoryListing: {
        enable: true,
        path: './'
      },
      proxies: [
        {
            //source: '/api', target: 'http://game.flyh5.cn/riddle/admin/api/api' //代理设置
            source: '/api', target: 'http://game.flyh5.cn/riddle/admin/api' //代理设置
        }
      ]
    }))
});
gulp.task('default', ['webserver'], function () {
  console.log('成功');
});
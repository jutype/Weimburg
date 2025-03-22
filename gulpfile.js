var 
    gulp =  require('gulp'), 
    sass = require('gulp-sass')(require('sass')),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    pug = require('gulp-pug'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync').create();
  
  
const production = true;

gulp.task('sass', ()=> 
    gulp.src('dev/scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed',        
        }))
        .pipe(autoprefixer(
            'last 2 versions'
        ))
        .pipe(gulp.dest('public'))
        .pipe(browserSync.stream())
);

gulp.task('views', ()=> {
    return gulp.src('dev/views/*.pug')
    .pipe(pug({
        pretty: production ? false : true 
    }))
    .pipe(gulp.dest('public/'))    

});

gulp.task('compress', () => {
    return gulp.src('dev/js/**/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))

});



gulp.task('default', () =>{
    gulp.watch('dev/**/*.pug', gulp.series('views'));
    gulp.watch('dev/**/*.scss', gulp.series('sass'));
    gulp.watch('dev/**/*.js',  gulp.series('compress') );
    gulp.watch('public/**/**.html').on('change', browserSync.reload)
    browserSync.init({
        server: {
            baseDir: './public'
        }
    })    
});





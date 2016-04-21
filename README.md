#基于node gulp的开发方式
### help pages (http://dota-web.github.io/gulp-tool-web/)
###背景：
#####因为前端做开发往往没有服务器这个概念，只要一个浏览器就ok，而每次修改一个很小的样式，都需要刷新页面这个操作来查看效果。很费apm，可能连续切图几天，指头都会疼。
###解决方案：
#####对于服务器更好查看文件，一般的选择就是本地安装一个apache服务器，或者nginx等，自从node出来后，各种构建工具出来了帮助我们更加方便的开发
###安装使用方式
##### 首先要有一个node环境，这个就不在累述，建议使用nvm安装和管理本地的node版本。
#### 安装步骤
- npm install 安装服务中所需要的包。
- gulp server 启动node的web服务，包括转译less， browser-sync 文件更新自动更新浏览器等功能,用于开发。
- gulp imagesmin 压缩图片，对应的目录默认是在 /dist/images 也可以在配置中自行设置
- gulp html 发布到生产环境中时，合并，压缩 css，和js 文件。 默认生产的文件目录 /dist/; 如果需要打包，可自行添加
#### 常见问题
- 版本不同，如果你本地node版本跟安装包里面的包 不兼容的情况， 可以 npm install 'XXXXX' --save；
- npm 安装过程很慢， 国内阿里有一个镜像的安装包 cnpm(http://npm.taobao.org/)
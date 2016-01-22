#基于node gulp的开发方式
###背景：
#####因为前端做开发往往没有服务器这个概念，只要一个浏览器就ok，而每次修改一个很小的样式，都需要刷新页面这个操作来查看效果。很费apm，可能连续切图几天，指头都会疼。
###解决方案：
#####对于服务器更好查看文件，一般的选择就是本地安装一个apache服务器，或者nginx等，自从node出来后，各种构建工具出来了帮助我们更加方便的开发
###安装使用方式
##### 首先要有一个node环境，这个就不在累述，建议使用nvm安装和管理本地的node版本。
#### 安装步骤
- npm install
- gulp server
#### 常见问题
- 版本不同，如果你本地node版本跟安装包里面的包 不兼容的情况， 可以 npm install 'XXXXX' --save；
- npm 安装过程很慢， 国内阿里有一个镜像的安装包 cnpm(http://npm.taobao.org/)
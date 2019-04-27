# YTiming小程序前端

第一次使用taro框架写小程序，本项目主要功能为倒数记日，用户可以记录某些重要事件的时间，小程序自动计算与当前时间的相差天数

# 项目运行

```bash
git clone https://github.com/Leesssssssss/study-taro.git

cd study-taro

npm install

node app.js
```

# 后端项目传送门

[点此传送至YTiming小程序后端](https://github.com/Leesssssssss/study-taro-express)

# 项目布局

```
.
├── config                                      // 项目初始化的配置
├── src                                         
│   ├── assets                              
│   │   ├── fonts                               // iconfont
│   │   └── image                               // 图片     
│   ├── pages                                   
│   │   ├── created                             
│   │   │   ├── created.js                      // 创建新备忘录页
│   │   │   └── created.scss                    // 创建新备忘录页样式
│   │   ├── index                               
│   │   │   ├── index.js                        // 首页
│   │   │   └── index.scss                      // 首页样式
│   │   ├── noteDetail                          
│   │   │   ├── noteDetail.js                   // 备忘录详情页
│   │   │   └── noteDetail.scss                 // 备忘录详情页样式
│   │   └── share                                
│   │       ├── share.js                        // 分享页
│   │       └── share.scss                      // 分享页样式
│   ├── app.js                                  // 项目入口文件          
│   ├── app.scss                                // 项目总通用样式          
│   ├── icon.scss                               // iconfont样式         
│   └── index.html                              // 入口页面
├── .editorconfig.js                            // 配置文件
├── .eslintrc.js                                // eslint配置文件
├── .gitignore                                  // git忽略配置文件
├── .npmrc                                      // 配置文件
├── README.md                                   // 项目说明书
├── package.json                                // 项目配置
└── project.config.json                         // 项目配置
.

```


# 说明

>  如果对您有帮助，可以点右上角 "Star" 支持一下 谢谢！

>  或者可以 "follow" 一下，我会不断开源更多的有趣的项目

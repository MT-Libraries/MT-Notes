
Mt.Notes

A blog/documents Site Running on NodeJS Server.

## Install


#### Environment

* mongodb
* nodejs
* nginx

#### Source

    #
    #   Download source
    #
    mkdir localhost_mt_notes
    cd localhost_mt_notes
    git clone git@git.coding.net:thonatos/MT-Notes.git ./ # For Chinese Server
    git clone git@github.com:MT-Libraries/MT-Notes.git ./ # For Other Server 
    #   npm install
    npm install
    
#### Config   

    # 
    #   Create config file
    #   copy *_develop.json and change content. 
    #   
    cd localhost_mt_notes/config/
    cp config_develop.json config_product.json
    cp pm2_develop.json pm2_product.json
    nano config_product.json
    nano pm2_product.json
    
## Usages

* 配置(conf)
	* pm2_product.json
	* pm2_develop.json
	* config_product.json
	* config_product.json

* 脚本（bin）
	* bin/autoload.js
	* bin/gulpfile.js
	
* 编译(npm)

	* npm run build	(spm-build)
	* npm run start
	
* 部署(pm2)
	* proxy (nginx)
	* direct


## Change


- 2015.05.12

    - spm@3.4+不再支持cmd构建方式，请使用npm intall -g spm-sea并切换js-spm目录执行spm-sea
    - 增加私人电台（感谢@moon）
    - 更新版本号为0.0.4
    - 更新Fm代码
    
- 2015.04.30
    - 更名Demo为Labs
    - 待添加FM电台功能
    
- 2015.02.09

	- 更新版本号为0.0.3
	- 更新node模块（gulp，cookie等）
	- 更新配置选项，统一放入conf_app进行配置信息设置
	- 更新代码结构，按照模块组织Controller与Router
	- 添加Github的验证功能，查询限制更改为5000/hour
	- 添加远程下载功能，方便从服务器Download文件
	- 添加upyun服务支持，并设置远程下载自动上传又拍云（beta）

- 2015.01.16

	- 权限设置问题，邮箱与配置邮箱相同时role为管理员，其他为普通用户。
	- 登录默认进入资料页面（样式内容还没定，回头去纠缠设计师。）
	- 加了一个低版本浏览器提示的东东，暂时还没添加到所有页面。

## Config

默认配置在conf/config_app.js,如果在root目录发现config_local.json则优先使用私有配置。

#### Private Config

```
{
    "site":{
        "name":"Thonatos.Yang"
    } ,
    "docRepo": {
        "github": {
            "doc_user": "thonatos",
            "doc_project": "Mt.Notes.And.Documents"
        },
        "coding": {
            "doc_user": "thonatos",
            "doc_project": "Mt.Notes.And.Documents",
            "access_token":"your token"
        },
        "GC": "C"
    },
    "secure": {
        "cookie": {
            "name": "MT.NODE_"
        },
        "session": {
            "name": "MT.Name",
            "secret": "MT.Secret"
        },
        "administartor": {
            "email": "whatever@you.like",
        }
    },
    "runEnv": {
        "DEV": true,
        "PORT": 8084,
        "LOCAL": false,
        "SEAJS": true,
        "DEBUG": false
    }
}
```

## Api

这里的Api主要是指公共的查询接口和私有接口（私有接口都是需要登录后才能使用的）。

#### Public Api

METHOD:GET

* /posts/
* /posts/:pid
* /posts/page/:currentPage
* /fm/playlist

#### Private Api

METHOD:POST

* /users/post/

METHOD:PUT

* /users/post/:pid

METHOD:DELETE

* /users/post/:pid

## Thanks

* SeaJS     模块化开发
* GulpJS    流式构建
* Github    文档API服务
* MongoDB   数据库
* AngularJS MVVM前端框架
* ExpressJS 网站核心程序
* PassportJS 网站认证模块

感谢用到类库作者的无私奉献以及Github。

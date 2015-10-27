
Mt.Notes

A blog/documents Site Running on NodeJS Server.

## Structure

- app
	
	主程序
	
- conf
	
	配置信息
	
- bin
	
	可执行程序
		
- public

	公共资源目录
	

## Usage

使用文档包含在 docs 目录中，这里只是稍作说明。
The document is under the directory of docs.

- 本地安装：
		npm install
		npm install pm2 -g # 本地依赖pm2负责服务自启动
        
### Commands

- npm start 非守护方式启动进程
- npm run pm2sd 开启pm2进程（开发模式）
- npm run pm2sp 开启pm2进程（生产模式）
- npm run pm2dd 停止pm2进程（开发模式）
- npm run pm2dp 停止pm2进程（生产模式）        
	
## Change

- 2015.10.6

	- 更改模块，放弃seajs，使用webpack进行模块化组织
	- 更改模块，更换末班引擎为hbs，放弃ejs
	- 更改模块，更改样式
	- 更改模块，重组代码和结构
 

- 2015.07.9

	- 更新版本号为0.1.1
	- 更改模块，seajs加载js时自动添加版本号
	- 删除模块，删除目前不需要以及将来会移除的模块
	- 更改模块，更改static目录未公开目录，用于远程访问
	- 更改模块，更改文档目录，不在存放在dep分支
	
	
- 2015.07.5

	- 更新版本号为0.1.0
	- 更新配置，更新配置文件的存放方式
	- 更改模块，增加Api模块的微信Token接口
	- 更改模块，增加Api模块为微信签名校验接口
	- 更改模块，增加Api模块提供文字转语音接口
	- 更新文件，更新Public.js提供全局微信JSSDK的支持
	
- 2015.06.12

	- 更新版本号为0.0.5
	- 增加文件，增加更详细的使用说明。
	- 更改模块，更改Blog模块为Mood模块记录闲言碎语。
	- 增加分支，增加dep分支即deploy分支作为部署分支。
	- 更改分支，更改master分支为纯净分支，仅包含应用介绍。
	- 更改分支，更改原master分支为dev即development分支。
	
- 2015.05.12

    - 更新版本号为0.0.4
    - 更新私人电台代码
    - 增加私人电台（感谢@moon）
    - spm@3.4+不再支持cmd构建方式，请使用npm intall -g spm-sea并切换js-spm目录执行spm-sea
    
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


## Thanks

* SeaJS     模块化开发
* GulpJS    流式构建
* Github    文档API服务
* MongoDB   数据库
* AngularJS MVVM前端框架
* ExpressJS 网站核心程序
* PassportJS 网站认证模块

感谢用到类库作者的无私奉献以及Github。


## License

The MIT License (MIT)

Copyright (c) 2014 [@Thonatos.Yang](http://github.com/thonatos)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

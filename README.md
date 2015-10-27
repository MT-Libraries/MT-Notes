
Mt.Notes

A blog/documents Site Running on NodeJS Server.

## Usage

- 本地安装：
		npm install
		npm install pm2 -g # 本地依赖pm2负责服务自启动
	
## Structure

- app
	
	主程序
	
- conf
	
	配置信息
	
- bin
	
	可执行程序
		
- public

	公共资源目录
	
## Commands

- npm start 非守护方式启动进程
- npm run pm2sd 开启pm2进程（开发模式）
- npm run pm2sp 开启pm2进程（生产模式）
- npm run pm2dd 停止pm2进程（开发模式）
- npm run pm2dp 停止pm2进程（生产模式）
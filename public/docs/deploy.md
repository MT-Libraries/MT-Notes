
## Deployment.

We use pm2 to start & keep our application alive.

#### What

* nodejs(base)
* pm2(npm module)
* crontab(linux tools)

#### How

1.You should install pm2 by:

```
npm install pm2 -g
```
	
then add config file for PM2 to {MT-NOTES-DIR}/conf/pm2_product.json:

 
```
{
  "apps" : [{
    "name"        : "product.mt.notes",
    "script"      : "bin/autoload.js",
    "args"        : [],
    "log_date_format"  : "YYYY-MM-DD HH:mm Z",
    "ignore_watch" : ["[\\/\\\\]\\./", "node_modules","static"],
    "watch"       : true,
    "node_args"   : "--harmony",
    "cwd"         : "/Users/thonatos/workspace/localhost_thonatos",
    "env": {
      "NODE_ENV": "development",
      "AWESOME_SERVICE_API_TOKEN": ""
    }
  }]
}
```

2.You may add an script to start app with server start. save it in {MT-NOTES-DIR}/conf/autoload.sh:

```
#!/bin/bash

if [ $(ps -e -o uid,cmd | grep $UID | grep node | grep -v grep | wc -l | tr -s "\n") -eq 0 ]
then
	# Change Path With Yours.
	# the third line show how to start app with pm2.
	export PATH=$PATH:/home/mt/.nvm/versions/node/v0.12.4
	export NODE_PATH=$NODE_PATH://home/mt/.nvm/versions/node/v0.12.4/lib/node_modules
	cd /home/mt/mtServer/localhost_thonatos.com/bin && pm2 start ./pm2_product.json
fi
```

3.You may add a task for crontab:

```
# Open terminal and type:
crontab -e

# Add the task like:
@reboot /home/mt/mtServer/localhost_thonatos.com/bin/autoload.sh

# When you finish it,Use "ESC" and ":wq" to save it. 
```

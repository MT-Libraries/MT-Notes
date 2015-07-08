
mongodb is required. we use CentOS7.0x64 to store data.

## Install

create mongodb-org.xxx.repo and yum install mongodb-org-* .

#### Mongodb-3.0.x

	nano /etc/yum.repos.d/mongodb-org-3.0.repo 

add content:

    [mongodb-org-3.0]
    name=MongoDB Repository
    baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.0/x86_64/
    gpgcheck=0
    enabled=1
    
#### Mongodb-2.6.x

    nano /etc/yum.repos.d/mongodb-org-2.6.x.repo

add content :

    [mongodb]
    name=MongoDB Repository
    baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64/
    gpgcheck=0
    enabled=1

#### Common

install mongodb:

	sodu yum update
	yum install mongodb-org mongodb-org-server
	
	
## Config 

change config file, open your terminal and edit the script /etc/rc.d/init.d/mongodb:


    # NOTE: if you change any OPTIONS here, you get what you pay for:
    # this script assumes all options are in the config file.
    CONFIGFILE="/mtdata/mongodb/mongod.conf"
    OPTIONS=" -f $CONFIGFILE"
    SYSCONFIG="/etc/sysconfig/mongod"


then add administrator to database for admin(type mongo in terminal):
  
    use admin
    db.createUser(
    {
      user: "mtdbadmin",
      pwd: "mtdbadmin2015",
      roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
    }
    )
    
open auth function:
  
    nano /etc/mongodb.conf
    
and remove "#" for "#auth".






	
	
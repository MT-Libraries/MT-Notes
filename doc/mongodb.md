mongodb is required. we use CentOS7.0x64 to store data.

## Install

create mongodb-org.3.0.repo:

	nano /etc/yum.repos.d/mongodb-org-3.0.repo 

and add content:

    [mongodb-org-3.0]
    name=MongoDB Repository
    baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.0/x86_64/
    gpgcheck=0
    enabled=1

install mongodb:

	sodu yum update
	yum install mongodb-org mongodb-org-server
	
## Config 




	
	
/*************************************************************************
	> File Name: as.sh
	> Author: ma6174
	> Mail: ma6174@163.com 
	> Created Time: 六  9/16 19:22:35 2017
 ************************************************************************/
# /etc/crontab
# *  7-23/1  *  *  * root /home/stat/rosemary/as.sh

cd `dirname $0`

node apistat.js > result/index.md
node mdit.js result/index.md > result/index.html


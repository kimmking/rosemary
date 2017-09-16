# /etc/crontab
# *  7-23/1  *  *  * root /home/stat/rosemary/as.sh

cd `dirname $0`

node apistat.js > result/index.md
node mdit.js result/index.md > result/index.html


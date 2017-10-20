# /etc/crontab
# *  7-23/1  *  *  * root /home/stat/rosemary/as.sh

cd `dirname $0`

/usr/local/bin/node  apistat.js > result/index1.md
tail -13 result/index1.md > result/index.md
echo "## [ALL Interfaces Details](./index1.html)"  >>  result/index.md
/usr/local/bin/node  mdit.js result/index.md > result/index.html
/usr/local/bin/node  mdit.js result/index1.md > result/index1.html


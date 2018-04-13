#!/bin/bash
cd ../
npm run build
cd ./tool
scp -i ~/.ssh/tencent -r /Users/yangleilei/Lib/www.leileissr.cn/dist/* root@119.29.10.109:/var/www/www.leileissr.cn/
echo  "publish successed! www.leileissr.cn"
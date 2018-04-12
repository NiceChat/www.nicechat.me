#!/bin/bash
cd ../
npm run build
cd ./tool
scp -i ~/.ssh/tencent /Users/yangleilei/Lib/www.leileissr.cn/dist/* root@119.29.10.109:/var/www/www.leilei.cn/
echo  "publish successed! www.leileissr.cn"
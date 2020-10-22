## 这是啥
使用邮箱来管理留言，免去后台，免去通知，一律交给邮箱。腾讯云免费配额，小需求足够使用了。

## 使用
需要有腾讯云账号，邮箱开通stmp

1、下载，并安装依赖库
```bash
git clone https://github.com/daichangxin/mail_poster.git
cd mail_poster && npm i
```

2、修改next.config.js，填入配置

3、部署

中间需要扫码登录腾讯云
```bash
npm run deploy
```
module.exports = {
    distDir: 'build',
    trailingSlash: true,
    env: {
        mail_host: 'smtp.xx.com', // 邮箱服务器
        mail_port: 465, // host的端口，smtp默认是465
        auth_user: 'xx@xx.com', // 邮箱账号
        auth_pass: 'xx', // 这里密码不是密码，是你设置的smtp授权码
        send_mail: 'xx@xx.com', // 发送的邮箱，一般被限制为与邮箱账号相同
        receive_mail: 'xx@xx.com', // 接受留言的邮箱
    },
};

import { NextApiHandler } from 'next';
import nodemailer from 'nodemailer';
import template from '../../template/simple'

const sendMail = (name: string, content: string, email: string) => {
    const transporter = nodemailer.createTransport({
        host: process.env.mail_host,
        port: ~~process.env.mail_port,
        auth: {
            user: process.env.auth_user,
            pass: process.env.auth_pass,
        },
    });
    const html = template
        .replace(/{name}/g, name)
        .replace(/{email}/g, email)
        .replace(/{content}/g, content);
    const message: nodemailer.SentMessageInfo = {
        from: process.env.send_mail,
        to: process.env.receive_mail,
        subject: `[MailPoster] ${name}`,
        html,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(message, (err, info) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(info);
            }
        });
    });
};

const onPoster: NextApiHandler = (req, res) => {
    if (req.method !== 'POST') {
        res.statusCode = 502;
        res.json({ msg: `method: ${req.method} not allowed` });
        return;
    }
    const paramName = req.body.name;
    const paramContent = req.body.content;
    const paramEmail = req.body.email;
    if (!paramName || !paramContent || !paramEmail) {
        res.statusCode = 200;
        res.json({
            code: 10000,
            msg: `邮件不能为空哦, ${req.body.name}`,
        });
        return;
    }

    sendMail(paramName, paramContent, paramEmail)
        .then((info) => {
            res.statusCode = 200;
            res.json({
                code: 0,
                name: 'success',
                body: JSON.stringify(info),
            });
        })
        .catch((err) => {
            res.json({
                code: 10001,
                name: 'ERROR',
                body: JSON.stringify(err),
            });
        });
};

export default onPoster;

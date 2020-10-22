import {
    Button,
    Card,
    CssBaseline,
    GeistProvider,
    Input,
    Spacer,
    Textarea,
    Tooltip,
    useToasts,
} from '@geist-ui/react';
import React, { FunctionComponent, useCallback, useRef, useState } from 'react';
import styles from '../../styles/index.module.css';
import axios from 'axios';

const isStringEmpty = (str: string) => {
    return !str || /^\s*$/.test(str);
};

const isEmail = (str: string) => {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
};

const IndexPage: FunctionComponent = () => {
    const refNameInput = useRef<HTMLInputElement>(null);
    const refMailInput = useRef<HTMLInputElement>(null);
    const refContentInput = useRef<HTMLTextAreaElement>(null);
    const [, showToast] = useToasts();
    const [isLoading, setLoading] = useState(false);

    const onSendClick = useCallback(() => {
        const strName = refNameInput.current?.value;
        if (isStringEmpty(strName)) {
            showToast({ text: '名字不能为空哦', type: 'warning' });
            return;
        }
        const strMail = refMailInput.current?.value;
        if (isStringEmpty(strMail)) {
            showToast({ text: '邮箱不能为空哦', type: 'warning' });
            return;
        }
        if (!isEmail(strMail)) {
            showToast({ text: '邮箱格式不正确', type: 'warning' });
            return;
        }
        const strContent = refContentInput.current?.value;
        if (isStringEmpty(strContent)) {
            showToast({ text: '内容不能为空哦', type: 'warning' });
            return;
        }
        setLoading(true);
        axios
            .post('/api/poster', {
                name: strName,
                email: strMail,
                content: strContent,
            })
            .then((res) => {
                const { code, msg } = res.data as { code: number; msg: string };
                if (code === 0) {
                    refContentInput.current.value = '';
                    showToast({ text: '发送成功', type: 'success' });
                } else {
                    showToast({
                        text: `发送失败:${msg}`,
                        type: 'error',
                        delay: 5000,
                    });
                }
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                showToast({
                    text: `发送失败:${JSON.stringify(err.stack)}`,
                    type: 'error',
                    delay: 5000,
                });
            });
    }, []);

    return (
        <GeistProvider>
            <CssBaseline />
            <div>
                <Card shadow width="100%">
                    <Input ref={refNameInput} label="您的名字" clearable width="100%" />
                    <Spacer />
                    <Input ref={refMailInput} label="您的邮箱" clearable width="100%" />
                    <Spacer />
                    <Textarea ref={refContentInput} placeholder="您的留言" width="100%" />
                    <Spacer />
                    <div className={styles.btnGroup}>
                        <Button
                            disabled={isLoading}
                            size="medium"
                            onClick={onSendClick}
                            type="success-light"
                            loading={isLoading}
                        >
                            发送
                        </Button>
                    </div>
                </Card>
            </div>
        </GeistProvider>
    );
};
export default IndexPage;

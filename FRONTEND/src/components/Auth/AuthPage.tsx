import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import '../../styles/AuthPage.scss';
import {useEffect, useRef, useState} from "react";

export default function AuthPage(props) {

    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const [loginErr, setLoginErr] = useState('Введите логин');
    const [loginErrBool, setLoginErrBool] = useState(false);

    const [passwordErr, setPasswordErr] = useState('Введите пароль');
    const [passwordErrBool, setPasswordErrBool] = useState(false);


    const [btnReady, setBtnReady] = useState(false)

    const [resErr, setResErr] = useState('Неверно указаны логин и пароль')
    const [resErrBool, setResErrBool] = useState(false)

    const ref = useRef(null);
    const setDataFunc = (target) => {
        setResErrBool(false)
        switch (target.name) {
            case 'login':
                setLogin(target.value.replace(/\s/g, ''))
                if (!target.value.length) {
                    setLoginErrBool(true)
                    setLoginErr('Введите логин')
                } else {
                    setLoginErrBool(false)
                    setLoginErr('')
                }
                break;
            case 'password':
                setPassword(target.value.replace(/\s/g, ''))
                if (!target.value.length) {
                    setPasswordErrBool(true)
                    setPasswordErr('Введите пароль')
                } else {
                    setPasswordErrBool(false)
                    setPasswordErr('')
                }
                break;
        }
    }
    useEffect(() => {
        ref.current.focus();
    }, [])

    useEffect(() => {
        if (loginErr || passwordErr) {
            setBtnReady(false)
        } else {
            setBtnReady(true)
        }

    }, [loginErr, passwordErr])

    const setToken = (data) => {
        console.log(data)
        if (data) {
            localStorage.setItem('token', JSON.stringify({
                'access': data.access,
                'refresh': data.refresh
            }))
            // TODO
            navigate('/manager', {replace: true})
            navigate(0)
            // TODO navigate('/')
        }
    }
    const sendReq = (e) => {
        console.log(login)
        console.log(password)
        fetch(props.defaultURL + 'token/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'username': String(login), 'password': String(password)},
                )
            })
            .then(async res => {
                    if (res.status != 200) {
                        console.log(res)
                        console.log(res.status)
                        console.log(typeof res.status)
                        setResErrBool(true)
                    } else {
                        console.log(res)
                        return await res.json();
                    }
                }
            )
            .then(data => {
                    setToken(data)
                }
            )
            .catch(err =>
                console.log(err))
    }
    return (
        <div className="modalBackground">
            <div className="modalActive PT-Astra-Sans_Bold">
                <div className="modalClose">
                    <img
                        onClick={event => {
                            navigate('/')
                        }}
                        src={require('./Images/cross.svg')}
                        alt={'cross_for_exit'}/>
                </div>
                <div className="modalWindow">
                    <div className={'loginDiv'}>
                        <span>Логин</span>
                        <input className={'vinInput'}
                               value={login}
                               placeholder={'Введите логин'}
                               maxLength={25}
                               name={'login'}
                               ref={ref}
                               onChange={event => {
                                   setDataFunc(event.target)
                               }}
                        />
                        {(loginErr && loginErrBool) &&
                            <p className={'authErr'}>
                                {loginErr}
                            </p>}
                    </div>
                    <div className={'passwordDiv'}>
                        <span>Пароль</span>
                        <input className={'vinInput'}
                               value={password}
                               placeholder={'Введите пароль'}
                               maxLength={25}
                               name={'password'}
                               type={"password"}
                               onChange={event => {
                                   setDataFunc(event.target)
                               }}

                        />
                        {(passwordErr && passwordErrBool) &&
                            <p className={'authErr'}>
                                {passwordErr}
                            </p>}
                    </div>
                    <button className={'btnLogin PT-Astra-Sans_Bold'}
                            disabled={!btnReady}
                            onClick={event => {
                                sendReq(event)
                            }}
                    >Войти
                    </button>
                    {(resErr && resErrBool) &&
                        <p className={'authEr'}>
                            {resErr}
                        </p>}
                </div>
            </div>
        </div>
    )
}
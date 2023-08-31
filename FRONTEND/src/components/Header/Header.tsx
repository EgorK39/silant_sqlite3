import * as React from 'react';
import '../../styles/Header.scss';
import Footer from '../Footer/Footer';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';


export default function Header(props) {
    const navigate = useNavigate();
    const exitFunc = (e) => {
        localStorage.setItem('token', JSON.stringify(''))
        navigate('/', {replace: true})
        navigate(0);
        // window.location.reload();
    }


    return (
        <>
            <section className={'myHeader PT-Astra-Sans_Regular'}>
                <div className={'mainHeaderBlock'}>
                    <div className={'firstHeaderBlock'}>
                        <div className={'mainThema'}>
                            <Link to={'/'}>
                                <img className={'logo'} src={require('./images/Logotype accent RGB 1.jpg')}
                                     alt={'logo'}/>
                            </Link>
                        </div>
                        <div className={'mainThema2'}>
                            <ul className={'ulHeader'}>
                                <li><a target={'_blank'} href="tel:+79097880981">+7-909-788-09-81</a></li>
                                <li><a target={'_blank'} href={'https://t.me/Egor_Kutsch'}>
                                    Telegram
                                </a></li>
                            </ul>
                        </div>
                        {props.isAuthenticated ?
                            <button className={'btnHeader'}
                                    onClick={event => {
                                        exitFunc(event)
                                    }}
                            >Выйти</button>
                            :
                            <Link to={'auth'}>
                                <button className={'btnHeader'}>Авторизация</button>
                            </Link>}


                    </div>
                    <div className={'secondHeaderBlock'}>
                        <div className={'mainThema4'}>
                            <p>Электронная сервисная книжка "Мой Силант"</p>
                        </div>
                    </div>
                </div>

            </section>
            <Outlet/>
            <Footer/>
        </>
    )
}
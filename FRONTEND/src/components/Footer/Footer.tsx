import * as React from 'react';
import '../../styles/Footer.scss';


const Footer = () => {

    return (
        <section className={'myFooter PT-Astra-Sans_Regular'}>
            <div className={'mainFooter'}>
                <div className={'firstDivBlock'}>
                    <ul className={'ulHeader'}>
                        <li><a target={'_blank'} href="tel:+79097880981">+7-909-788-09-81</a></li>
                        <li><a target={'_blank'} href={'https://t.me/Egor_Kutsch'}>
                            Telegram
                        </a></li>
                    </ul>
                </div>
                <div className={'secondDivBlock'}>
                    <p>Мой Силант 2023</p>
                </div>
            </div>
        </section>
    )
}
export default Footer;
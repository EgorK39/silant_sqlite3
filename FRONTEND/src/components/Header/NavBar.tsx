import * as React from 'react';
import {Link} from "react-router-dom";
import {useEffect} from "react";
import '../../styles/NavBar.scss';

export default function NavBar(props) {
    useEffect(() => {
        console.log(props.userName)
    }, [])
    return (
        <div className={'navBar'}>
            <p className={'navP'}>{props.userName}</p>
            <div className={'navBarDiv'}>
                <ul className={'navBarUl'}>
                    <li><Link to={'/manager'}>
                        <button className={'navBarBtn'}>Общая информация</button>
                    </Link></li>
                    <li>
                        <Link to={'/to'}>
                            <button className={'navBarBtn'}>TO</button>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/rec'}>
                            <button className={'navBarBtn'}>Рекламации</button>
                        </Link>
                    </li>
                </ul>


            </div>
        </div>
    )
}
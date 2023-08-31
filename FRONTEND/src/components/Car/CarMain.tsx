import * as React from 'react';
import '../../styles/CarMain.scss';
import CarSearch from './CarSearch';
import {useEffect} from "react";

export default function CarMain(props) {

    return (
        <section className={'myMain PT-Astra-Sans_Regular'}>
            <div className={'mainSection'}>
                <CarSearch defaultURL={props.defaultURL}
                           isAuthenticated={props.isAuthenticated}
                           userName={props.userName}/>
            </div>
        </section>
    )
}
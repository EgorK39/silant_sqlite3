import * as React from 'react';
import '../../styles/Cars.scss';
import {Link, useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import {useMediaQuery} from "react-responsive";


export default function Cars(props) {
    const [tokenAccess, setTokenAccess] = useState('')


    const {id} = useParams();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'))
        if (token.access) {
            setTokenAccess(token.access)
        }
        console.log(props.client)
        console.log(props.company)
        console.log(props.company.length)

    }, [])

    const isMobile = useMediaQuery({
        query: '(max-width: 1200px)'
    })

    if (isMobile) {
        if (props.allCars && tokenAccess && (props.client.length > 1) && (props.company.length > 1)) {
            return (
                <div className={'carNonFiltered1200Cars'}>
                    {props.allCars.map((el, i) =>
                        <div className={'tableDiv1200Cars'} key={el.id}>
                            <table className={'myTable1200Cars'}>
                                <thead>
                                <tr>
                                    <td>Зав. № машины</td>
                                    <td><Link to={`/car/${el.id}`}>{el.vin}</Link></td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Модель техники</td>
                                    <td><Link
                                        to={`/car/technic/${el['technic']}`}>{props.technic ? props.technic.find(
                                        technic => technic.id === el['technic']
                                    ).name : el['technic']}</Link></td>
                                </tr>
                                <tr>
                                    <td>Модель двигателя</td>
                                    <td><Link to={`/car/engine/${el['engine']}`}>{props.engine ? props.engine.find(
                                        engine => engine.id === el['engine']
                                    ).name : el['engine']}</Link></td>
                                </tr>
                                <tr>
                                    <td>Зав. № двигателя</td>
                                    <td>{el.engineNo}</td>
                                </tr>
                                <tr>
                                    <td>Модель трансмиссии</td>
                                    <td><Link
                                        to={`/car/transmission/${el.transmission}`}>{props.transmission ? props.transmission.find(
                                        transmission => transmission.id === el['transmission']
                                    ).name : el.transmission}</Link></td>
                                </tr>
                                <tr>
                                    <td>Зав. № трансмиссии</td>
                                    <td>{el.transmissionNo}</td>
                                </tr>
                                <tr>
                                    <td>Модель ведущего моста</td>
                                    <td><Link
                                        to={`/car/drivingbridge/${el.drivingBridge}`}>{props.drivingbridge ? props.drivingbridge.find(
                                        drivingbridge => drivingbridge.id === el['drivingBridge']
                                    ).name : el.drivingBridge}</Link></td>
                                </tr>
                                <tr>
                                    <td>Зав. № ведущего моста</td>
                                    <td>{el.drivingBridgeNo}</td>
                                </tr>
                                <tr>
                                    <td>Модель управляемого моста</td>
                                    <td><Link
                                        to={`/car/controlledbridge/${el.controlledBridge}`}>{props.controlledbridge ? props.controlledbridge.find(
                                        controlledbridge => controlledbridge.id === el['controlledBridge']
                                    ).name : el.controlledBridge}</Link></td>
                                </tr>
                                <tr>
                                    <td>Зав. № управляемого моста</td>
                                    <td>{el.controlledBridgeNo}</td>
                                </tr>
                                <tr>
                                    <td>Договор поставки</td>
                                    <td>{el.contract}</td>
                                </tr>
                                <tr>
                                    <td>Дата отгрузки с завода</td>
                                    <td>{el.dateOfShipment}</td>
                                </tr>
                                <tr>
                                    <td>Грузополучатель</td>
                                    <td>{el.consignee}</td>
                                </tr>
                                <tr>
                                    <td>Адрес поставки</td>
                                    <td>{el.deliveryAddress}</td>
                                </tr>
                                <tr>
                                    <td>Комплектация</td>
                                    <td>{el.equipment}</td>
                                </tr>
                                <tr>
                                    <td>Клиент</td>
                                    <td><Link
                                        to={`/car/client/${el.client}`}>{props.client ? props.client.find(
                                        client => client.id === el['client']
                                    ).name : el.client}</Link></td>
                                </tr>
                                <tr>
                                    <td>Сервисная компания</td>
                                    <td><Link
                                        to={`/car/company/${el.serviceCompany}`}>{props.company ? props.company.find(
                                        company => company.id === el['serviceCompany']
                                    ).name : el.serviceCompany}</Link></td>
                                </tr>

                                </tbody>
                            </table>
                        </div>
                    )}


                </div>)
        } else if (props.allCars) {
            return (
                <div className={'carNonFiltered1200Cars'}>
                    {props.allCars.map((el, i) =>
                        <div className={'tableDiv1200Cars'} key={el.id}>
                            <table className={'myTable1200Cars'}>
                                <thead>
                                <tr>
                                    <td>Зав. № машины</td>
                                    <td><Link to={`/car/${el.id}`}>{el.vin}</Link></td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Модель техники</td>
                                    <td><Link
                                        to={`/car/technic/${el['technic']}`}>{props.technic ? props.technic.find(
                                        technic => technic.id === el['technic']
                                    ).name : el['technic']}</Link></td>
                                </tr>
                                <tr>
                                    <td>Модель двигателя</td>
                                    <td><Link to={`/car/engine/${el['engine']}`}>{props.engine ? props.engine.find(
                                        engine => engine.id === el['engine']
                                    ).name : el['engine']}</Link></td>
                                </tr>
                                <tr>
                                    <td>Зав. № двигателя</td>
                                    <td>{el.engineNo}</td>
                                </tr>
                                <tr>
                                    <td>Модель трансмиссии</td>
                                    <td><Link
                                        to={`/car/transmission/${el.transmission}`}>{props.transmission ? props.transmission.find(
                                        transmission => transmission.id === el['transmission']
                                    ).name : el.transmission}</Link></td>
                                </tr>
                                <tr>
                                    <td>Зав. № трансмиссии</td>
                                    <td>{el.transmissionNo}</td>
                                </tr>
                                <tr>
                                    <td>Модель ведущего моста</td>
                                    <td><Link
                                        to={`/car/drivingbridge/${el.drivingBridge}`}>{props.drivingbridge ? props.drivingbridge.find(
                                        drivingbridge => drivingbridge.id === el['drivingBridge']
                                    ).name : el.drivingBridge}</Link></td>
                                </tr>
                                <tr>
                                    <td>Зав. № ведущего моста</td>
                                    <td>{el.drivingBridgeNo}</td>
                                </tr>
                                <tr>
                                    <td>Модель управляемого моста</td>
                                    <td><Link
                                        to={`/car/controlledbridge/${el.controlledBridge}`}>{props.controlledbridge ? props.controlledbridge.find(
                                        controlledbridge => controlledbridge.id === el['controlledBridge']
                                    ).name : el.controlledBridge}</Link></td>
                                </tr>
                                <tr>
                                    <td>Зав. № управляемого моста</td>
                                    <td>{el.controlledBridgeNo}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    )}


                </div>
            )
        } else return ''

    } else {
        if (props.allCars && tokenAccess && (props.client.length > 1) && (props.company.length > 1)) {
            return (
                <div className={'carNonFiltered'}>
                    <table className={'myTable'}>
                        <thead>
                        <tr>
                            <td>Зав. № машины</td>
                            <td>Модель техники</td>
                            <td>Модель двигателя</td>
                            <td>Зав. № двигателя</td>
                            <td>Модель трансмиссии</td>
                            <td>Зав. № трансмиссии</td>
                            <td>Модель ведущего моста</td>
                            <td>Зав. № ведущего моста</td>
                            <td>Модель управляемого моста</td>
                            <td>Зав. № управляемого моста</td>

                            <td>Договор поставки</td>
                            <td>Дата отгрузки с завода</td>
                            <td>Грузополучатель</td>
                            <td>Адрес поставки</td>
                            <td>Комплектация</td>
                            <td>Клиент</td>
                            <td>Сервисная компания</td>

                        </tr>
                        </thead>
                        <tbody>
                        {props.allCars.map((el, i) =>
                            <tr key={el.id}>

                                <td><Link to={`/car/${el.id}`}>{el.vin}</Link></td>
                                <td><Link to={`/car/technic/${el['technic']}`}>{props.technic ? props.technic.find(
                                    technic => technic.id === el['technic']
                                ).name : el['technic']}</Link></td>
                                <td><Link to={`/car/engine/${el['engine']}`}>{props.engine ? props.engine.find(
                                    engine => engine.id === el['engine']
                                ).name : el['engine']}</Link></td>
                                <td>{el.engineNo}</td>
                                <td><Link
                                    to={`/car/transmission/${el.transmission}`}>{props.transmission ? props.transmission.find(
                                    transmission => transmission.id === el['transmission']
                                ).name : el.transmission}</Link></td>
                                <td>{el.transmissionNo}</td>
                                <td><Link
                                    to={`/car/drivingbridge/${el.drivingBridge}`}>{props.drivingbridge ? props.drivingbridge.find(
                                    drivingbridge => drivingbridge.id === el['drivingBridge']
                                ).name : el.drivingBridge}</Link></td>
                                <td>{el.drivingBridgeNo}</td>
                                <td><Link
                                    to={`/car/controlledbridge/${el.controlledBridge}`}>{props.controlledbridge ? props.controlledbridge.find(
                                    controlledbridge => controlledbridge.id === el['controlledBridge']
                                ).name : el.controlledBridge}</Link></td>
                                <td>{el.controlledBridgeNo}</td>

                                <td>{el.contract}</td>
                                <td>{el.dateOfShipment}</td>
                                <td>{el.consignee}</td>
                                <td>{el.deliveryAddress}</td>
                                <td>{el.equipment}</td>
                                <td><Link
                                    to={`/car/client/${el.client}`}>{props.client ? props.client.find(
                                    client => client.id === el['client']
                                ).name : el.client}</Link></td>
                                <td><Link
                                    to={`/car/company/${el.serviceCompany}`}>{props.company ? props.company.find(
                                    company => company.id === el['serviceCompany']
                                ).name : el.serviceCompany}</Link></td>
                                {/*<td>{el.serviceCompany}</td>*/}

                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>)
        } else if (props.allCars) {
            return (
                <div className={'carNonFilteredSmpl'}>
                    <table className={'myTableSmpl'}>
                        <thead>
                        <tr>
                            <td>Зав. № машины</td>
                            <td>Модель техники</td>
                            <td>Модель двигателя</td>
                            <td>Зав. № двигателя</td>
                            <td>Модель трансмиссии</td>
                            <td>Зав. № трансмиссии</td>
                            <td>Модель ведущего моста</td>
                            <td>Зав. № ведущего моста</td>
                            <td>Модель управляемого моста</td>
                            <td>Зав. № управляемого моста</td>

                        </tr>
                        </thead>
                        <tbody>
                        {props.allCars.map((el, i) =>
                            <tr key={el.id}>

                                <td><Link to={`/car/${el.id}`}>{el.vin}</Link></td>
                                <td><Link to={`/car/technic/${el['technic']}`}>{props.technic ? props.technic.find(
                                    technic => technic.id === el['technic']
                                ).name : el['technic']}</Link></td>
                                <td><Link to={`/car/engine/${el['engine']}`}>{props.engine ? props.engine.find(
                                    engine => engine.id === el['engine']
                                ).name : el['engine']}</Link></td>
                                <td>{el.engineNo}</td>
                                <td><Link
                                    to={`/car/transmission/${el.transmission}`}>{props.transmission ? props.transmission.find(
                                    transmission => transmission.id === el['transmission']
                                ).name : el.transmission}</Link></td>
                                <td>{el.transmissionNo}</td>
                                <td><Link
                                    to={`/car/drivingbridge/${el.drivingBridge}`}>{props.drivingbridge ? props.drivingbridge.find(
                                    drivingbridge => drivingbridge.id === el['drivingBridge']
                                ).name : el.drivingBridge}</Link></td>
                                <td>{el.drivingBridgeNo}</td>
                                <td><Link
                                    to={`/car/controlledbridge/${el.controlledBridge}`}>{props.controlledbridge ? props.controlledbridge.find(
                                    controlledbridge => controlledbridge.id === el['controlledBridge']
                                ).name : el.controlledBridge}</Link></td>
                                <td>{el.controlledBridgeNo}</td>

                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            )
        } else return ''
        // return (
        //     (props.allCars ?
        //             <div className={'carNonFiltered'}>
        //                 <table className={'myTable'}>
        //                     <thead>
        //                     <tr>
        //                         <td>Зав. № машины</td>
        //                         <td>Модель техники</td>
        //                         <td>Модель двигателя</td>
        //                         <td>Зав. № двигателя</td>
        //                         <td>Модель трансмиссии</td>
        //                         <td>Зав. № трансмиссии</td>
        //                         <td>Модель ведущего моста</td>
        //                         <td>Зав. № ведущего моста</td>
        //                         <td>Модель управляемого моста</td>
        //                         <td>Зав. № управляемого моста</td>
        //                         {tokenAccess && (
        //                             <>
        //                                 <td>Договор поставки</td>
        //                                 <td>Дата отгрузки с завода</td>
        //                                 <td>Грузополучатель</td>
        //                                 <td>Адрес поставки</td>
        //                                 <td>Комплектация</td>
        //                                 <td>Клиент</td>
        //                                 <td>Сервисная компания</td>
        //                             </>
        //                         )}
        //                     </tr>
        //                     </thead>
        //                     <tbody>
        //                     {props.allCars.map((el, i) =>
        //                         <tr key={el.id}>
        //
        //                             <td><Link to={`/car/${el.id}`}>{el.vin}</Link></td>
        //                             <td><Link to={`/car/technic/${el['technic']}`}>{props.technic ? props.technic.find(
        //                                 technic => technic.id === el['technic']
        //                             ).name : el['technic']}</Link></td>
        //                             <td><Link to={`/car/engine/${el['engine']}`}>{props.engine ? props.engine.find(
        //                                 engine => engine.id === el['engine']
        //                             ).name : el['engine']}</Link></td>
        //                             <td>{el.engineNo}</td>
        //                             <td><Link
        //                                 to={`/car/transmission/${el.transmission}`}>{props.transmission ? props.transmission.find(
        //                                 transmission => transmission.id === el['transmission']
        //                             ).name : el.transmission}</Link></td>
        //                             <td>{el.transmissionNo}</td>
        //                             <td><Link
        //                                 to={`/car/drivingbridge/${el.drivingBridge}`}>{props.drivingbridge ? props.drivingbridge.find(
        //                                 drivingbridge => drivingbridge.id === el['drivingBridge']
        //                             ).name : el.drivingBridge}</Link></td>
        //                             <td>{el.drivingBridgeNo}</td>
        //                             <td><Link
        //                                 to={`/car/controlledbridge/${el.controlledBridge}`}>{props.controlledbridge ? props.controlledbridge.find(
        //                                 controlledbridge => controlledbridge.id === el['controlledBridge']
        //                             ).name : el.controlledBridge}</Link></td>
        //                             <td>{el.controlledBridgeNo}</td>
        //                             {tokenAccess && (
        //                                 <>
        //                                     <td>{el.contract}</td>
        //                                     <td>{el.dateOfShipment}</td>
        //                                     <td>{el.consignee}</td>
        //                                     <td>{el.deliveryAddress}</td>
        //                                     <td>{el.equipment}</td>
        //                                     <td><Link
        //                                         to={`/car/client/${el.client}`}>{props.client ? props.client.find(
        //                                         client => client.id === el['client']
        //                                     ).name : el.client}</Link></td>
        //                                     <td><Link
        //                                         to={`/car/company/${el.company}`}>{props.company ? props.company.find(
        //                                         company => company.id === el['company']
        //                                     ).name : el.company}</Link></td>
        //                                 </>
        //                             )}
        //                         </tr>
        //                     )}
        //                     </tbody>
        //                 </table>
        //             </div> :
        //             ''
        //     )
        //
        // )
    }

}
import * as React from 'react';
import {useEffect, useState} from 'react';
import '../../styles/Cars.scss';
import {Link, useParams} from 'react-router-dom';
import {useMediaQuery} from "react-responsive";


export default function ManagerCars(props) {

    const [sortedField, setSortedField] = React.useState(null);
    const DATA: any = props.allCars;
    const [data, setData] = useState<any>([]);

    const {id} = useParams();

    useEffect(() => {
        if (DATA) {
            console.log(props.allCars);
            console.log([...props.allCars]);
            console.log([props.allCars]);

            setData(props.allCars)
        }
    }, [props.allCars])

    useEffect(() => {
        if (DATA) {
            if (sortedField !== null) {
                setData([...data.sort((a, b) => {
                    console.log('3');
                    if (a['dateOfShipment'] < b['dateOfShipment']) {
                        return -1;
                    }
                    if (a['dateOfShipment'] > b['dateOfShipment']) {
                        return 1;
                    }
                    return 0;
                })
                ])
            } else {
                setData([...data.sort((a, b) => {
                    console.log('4');
                    if (a['dateOfShipment'] < b['dateOfShipment']) {
                        return 1;
                    }
                    if (a['dateOfShipment'] > b['dateOfShipment']) {
                        return -1;
                    }
                    return 0;
                })
                ])
            }
        }

    }, [sortedField])

    const isMobile = useMediaQuery({
        query: '(max-width: 1200px)'
    })
    if (isMobile) {
        if (data.length) {
            return (
                ((props.allCars && (props.client.length > 1) &&
                    (props.company.length > 1) && (props.technic.length > 1) && (props.engine.length > 1) &&
                    (props.transmission.length > 1) && (props.controlledbridge.length > 1) &&
                    (props.drivingbridge.length > 1)) ?
                    <div className={'carNonFiltered1200Cars'}>
                        {data.map((el, i) =>
                            <div className={'tableDiv1200Cars'} key={el.id}>
                                <table className={'myTable1200Cars'}>
                                    <thead>
                                    <tr>
                                        <td onClick={event => {
                                            sortedField == null ? setSortedField('datum') : setSortedField(null)
                                        }}>
                                            <div className={'CarsTableDiv'}>
                                                <span>Зав. №</span>
                                                <img
                                                    className={'CarsArrow'}
                                                    alt={'arrow'}
                                                    src={require('../Images/icons88.png')}
                                                    style={{
                                                        transform: `rotate(${
                                                            sortedField == null ? 90 : -90
                                                        }deg)`
                                                    }}
                                                />
                                                <span>машины</span>
                                            </div>
                                        </td>
                                        <td><Link to={`/manager/car/${el.id}`}>{el.vin}</Link></td>
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
                    </div>
                    : '')
            )
        }
    } else {
        if (data.length) {
            return (
                ((props.allCars && (props.client.length > 1) &&
                        (props.company.length > 1) && (props.technic.length > 1) && (props.engine.length > 1) &&
                        (props.transmission.length > 1) && (props.controlledbridge.length > 1) &&
                        (props.drivingbridge.length > 1)) ?
                        <div className={'carNonFiltered'}>
                            <table className={'myTable'}>
                                <thead>
                                <tr>
                                    <td onClick={event => {
                                        sortedField == null ? setSortedField('datum') : setSortedField(null)
                                    }}>
                                        <div className={'CarsTableDiv'}>
                                            <span>Зав. №</span>
                                            <img
                                                className={'CarsArrow'}
                                                alt={'arrow'}
                                                src={require('../Images/icons88.png')}
                                                style={{
                                                    transform: `rotate(${
                                                        sortedField == null ? 90 : -90
                                                    }deg)`
                                                }}
                                            />
                                            <span>машины</span>
                                        </div>
                                    </td>
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
                                {data.map((el, i) =>
                                    <tr key={el.id}>
                                        <td><Link to={`/manager/car/${el.id}`}>{el.vin}</Link></td>
                                        <td><Link
                                            to={`/car/technic/${el['technic']}`}>{props.technic ? props.technic.find(
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
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div> :
                        ''
                )

            )
        }
    }
}
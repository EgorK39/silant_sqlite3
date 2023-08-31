import * as React from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import '../../styles/OneOfCars.scss';
import {useMediaQuery} from "react-responsive";


export default function OneOfCars(props) {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const {id} = useParams();


    const isMobile = useMediaQuery({
        query: '(max-width: 1200px)'
    })
    if (isMobile) {
        return (
            (props.allCar ?
                <section className={'myDetailCar'}>
                    <div className={'carNonFiltered1200'}>


                        <div className={'tableDiv1200'}>
                            <table className={'myTable'}>
                                <thead>
                                <tr>
                                    <td>Зав. № машины</td>
                                    <td><Link to={`/car/${props.allCar['id']}`}>{props.allCar['vin']}</Link></td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Модель техники</td>
                                    <td><Link
                                        to={`/car/technic/${props.allCar['technic']}`}>{props.technic.length >= 1 ? props.technic.find(
                                        technic => technic.id === props.allCar['technic']
                                    ).name : props.allCar['technic']}</Link></td>
                                </tr>
                                <tr>
                                    <td>Модель двигателя</td>
                                    <td><Link
                                        to={`/car/engine/${props.allCar['engine']}`}>{props.engine.length >= 1 ? props.engine.find(
                                        engine => engine.id === props.allCar['engine']
                                    ).name : props.allCar['engine']}</Link></td>
                                </tr>
                                <tr>
                                    <td>Зав. № двигателя</td>
                                    <td>{props.allCar['engineNo']}</td>
                                </tr>
                                <tr>
                                    <td>Модель трансмиссии</td>
                                    <td><Link
                                        to={`/car/transmission/${props.allCar['transmission']}`}>{props.transmission.length >= 1 ? props.transmission.find(
                                        transmission => transmission.id === props.allCar['transmission']
                                    ).name : props.allCar['transmission']}</Link></td>
                                </tr>
                                <tr>
                                    <td>Зав. № трансмиссии</td>
                                    <td>{props.allCar['transmissionNo']}</td>
                                </tr>
                                <tr>
                                    <td>Модель ведущего моста</td>
                                    <td><Link
                                        to={`/car/drivingbridge/${props.allCar['drivingBridge']}`}>{props.drivingbridge.length >= 1 ? props.drivingbridge.find(
                                        drivingbridge => drivingbridge.id === props.allCar['drivingBridge']
                                    ).name : props.allCar['drivingBridge']}</Link></td>
                                </tr>
                                <tr>
                                    <td>Зав. № ведущего моста</td>
                                    <td>{props.allCar['drivingBridgeNo']}</td>
                                </tr>
                                <tr>
                                    <td>Модель управляемого моста</td>
                                    <td><Link
                                        to={`/car/controlledbridge/${props.allCar['controlledBridge']}`}>{props.controlledbridge.length >= 1 ? props.controlledbridge.find(
                                        controlledbridge => controlledbridge.id === props.allCar['controlledBridge']
                                    ).name : props.allCar['controlledBridge']}</Link></td>
                                </tr>
                                <tr>
                                    <td>Зав. № управляемого моста</td>
                                    <td>{props.allCar['controlledBridgeNo']}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>


                    </div>
                    <button className={'btnOneOfCars'} onClick={e => goBack()}>Назад</button>
                </section>
                : '')
        )
    } else {
        return (
            (props.allCar ?
                    <section className={'myDetailCar'}>
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
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><Link to={`/car/${props.allCar['id']}`}>{props.allCar['vin']}</Link></td>
                                    <td><Link
                                        to={`/car/technic/${props.allCar['technic']}`}>{props.technic.length >= 1 ? props.technic.find(
                                        technic => technic.id === props.allCar['technic']
                                    ).name : props.allCar['technic']}</Link></td>
                                    <td><Link
                                        to={`/car/engine/${props.allCar['engine']}`}>{props.engine.length >= 1 ? props.engine.find(
                                        engine => engine.id === props.allCar['engine']
                                    ).name : props.allCar['engine']}</Link></td>
                                    <td>{props.allCar['engineNo']}</td>
                                    <td><Link
                                        to={`/car/transmission/${props.allCar['transmission']}`}>{props.transmission.length >= 1 ? props.transmission.find(
                                        transmission => transmission.id === props.allCar['transmission']
                                    ).name : props.allCar['transmission']}</Link></td>
                                    <td>{props.allCar['transmissionNo']}</td>
                                    <td><Link
                                        to={`/car/drivingbridge/${props.allCar['drivingBridge']}`}>{props.drivingbridge.length >= 1 ? props.drivingbridge.find(
                                        drivingbridge => drivingbridge.id === props.allCar['drivingBridge']
                                    ).name : props.allCar['drivingBridge']}</Link></td>
                                    <td>{props.allCar['drivingBridgeNo']}</td>
                                    <td><Link
                                        to={`/car/controlledbridge/${props.allCar['controlledBridge']}`}>{props.controlledbridge.length >= 1 ? props.controlledbridge.find(
                                        controlledbridge => controlledbridge.id === props.allCar['controlledBridge']
                                    ).name : props.allCar['controlledBridge']}</Link></td>
                                    <td>{props.allCar['controlledBridgeNo']}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <button className={'btnOneOfCars'} onClick={e => goBack()}>Назад</button>
                    </section> :
                    ''
            )
        )
    }
}
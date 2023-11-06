import * as React from "react";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import '../../styles/Tos.scss';


export default function Tos(props) {
    const navigate = useNavigate();
    const [sortedField, setSortedField] = React.useState(null);
    const DATA = props.allTo;
    const [data, setData] = useState<any>([]);


    const goBack = () => navigate(-1);
    const {id} = useParams();

    useEffect(() => {
        console.log(props.allTo);
        // console.log([...props.allCars]);
        // console.log([props.allCars]);
        setData(props.allTo)

    }, [props.allTo])

    useEffect(() => {
        console.log('1');
        if (DATA) {
            if (sortedField !== null) {
                setData([...data.sort((a, b) => {
                    console.log('3');
                    if (a['dateOfTo'] < b['dateOfTo']) {
                        return -1;
                    }
                    if (a['dateOfTo'] > b['dateOfTo']) {
                        return 1;
                    }
                    return 0;
                })
                ])
            } else {
                setData([...DATA]);
                // setData([...data.sort((a, b) => {
                // console.log('4');
                //     if (a['dateOfTo'] < b['dateOfTo']) {
                //         return 1;
                //     }
                //     if (a['dateOfTo'] > b['dateOfTo']) {
                //         return -1;
                //     }
                //     return 0;
                // })]);
            }
        }
    }, [sortedField])

    const isMobile = useMediaQuery({
        query: '(max-width: 1200px)'
    })

    if (isMobile) {
        if (data.length) {
            return (
                ((!props.type.length && !props.company.length && !props.autos.length) ?
                        '' :
                        <section className={'myTO'}>
                            <div className={'toFiltered'}>

                                {data.map((el, i) =>
                                    <div className={'tableDivTo'} key={el.id}>
                                        <table className={'myToTable'}>
                                            <thead>
                                            <tr>
                                                <td>Вид ТО</td>
                                                <td><Link
                                                    to={`/to/show/type/${el['to']}`}>{props.type ? props.type.find(
                                                    type => type.id === el['to']
                                                ).name : el['to']}</Link></td>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td onClick={event => {
                                                    sortedField == null ? setSortedField('datum') : setSortedField(null)
                                                }}>
                                                    <div className={'CarsTableDiv'}>
                                                        <span>Дата</span>
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
                                                        <span>проведения ТО</span>
                                                    </div>
                                                </td>
                                                <td>{el['dateOfTo']}</td>
                                            </tr>
                                            <tr>
                                                <td>Наработка, м/час</td>
                                                <td>{el['work']}</td>
                                            </tr>
                                            <tr>
                                                <td>№ заказ-наряда</td>
                                                <td>{el['order']}</td>
                                            </tr>
                                            <tr>
                                                <td>Дата заказ-наряда</td>
                                                <td>{el['dateOfOrder']}</td>
                                            </tr>
                                            <tr>
                                                <td>Организация, проводившая ТО</td>
                                                <td><Link
                                                    to={`/car/company/${el['serviceCompany']}`}>{props.company ? props.company.find(
                                                    company => company.id === el['whoMakeTo']).name : el['whoMakeTo']}</Link>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Машина</td>
                                                <td><Link to={`/car/${el['car']}`}>{props.autos ? props.autos.find(
                                                    autos => autos.id === el['car']
                                                ).vin : el['car']}</Link></td>
                                            </tr>
                                            <tr>
                                                <td>Сервисная компания</td>
                                                <td><Link
                                                    to={`/car/company/${el['serviceCompany']}`}>{props.company ? props.company.find(
                                                    company => company.id === el['serviceCompany']
                                                ).name : el['serviceCompany']}</Link></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td><Link className={'col'} to={`/to/${el['id']}`}>Редактировать</Link>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                                <button className={'btnToLittle'} onClick={e => goBack()}>Назад</button>
                            </div>
                        </section>
                )
            )
        }
    } else {
        if (data.length) {
            return (
                ((!props.type.length && !props.company.length && !props.autos.length) ?
                        '' :
                        <section className={'myTO'}>
                            <div className={'toFiltered'}>
                                <table className={'myToTable'}>
                                    <thead>
                                    <tr>
                                        <td>Вид ТО</td>
                                        <td onClick={event => {
                                            sortedField == null ? setSortedField('datum') : setSortedField(null)
                                        }}>
                                            <div className={'CarsTableDiv'}>
                                                <span>Дата</span>
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
                                                <span>проведения ТО</span>
                                            </div>
                                        </td>
                                        <td>Наработка, м/час</td>
                                        <td>№ заказ-наряда</td>
                                        <td>Дата заказ-наряда</td>
                                        <td>Организация, проводившая ТО</td>
                                        <td>Машина</td>
                                        <td>Сервисная компания</td>
                                        <td></td>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {data.map((el, i) =>
                                        <tr key={el.id}>
                                            <td><Link to={`/to/show/type/${el['to']}`}>{props.type ? props.type.find(
                                                type => type.id === el['to']
                                            ).name : el['to']}</Link></td>
                                            <td>{el['dateOfTo']}</td>
                                            <td>{el['work']}</td>
                                            <td>{el['order']}</td>
                                            <td>{el['dateOfOrder']}</td>
                                            <td><Link
                                                to={`/car/company/${el['serviceCompany']}`}>{props.company ? props.company.find(
                                                company => company.id === el['whoMakeTo']).name : el['whoMakeTo']}</Link>
                                            </td>
                                            <td><Link to={`/car/${el['car']}`}>{props.autos ? props.autos.find(
                                                autos => autos.id === el['car']
                                            ).vin : el['car']}</Link></td>
                                            <td><Link
                                                to={`/car/company/${el['serviceCompany']}`}>{props.company ? props.company.find(
                                                company => company.id === el['serviceCompany']
                                            ).name : el['serviceCompany']}</Link></td>
                                            <td><Link className={'col'} to={`/to/${el['id']}`}>Редактировать</Link></td>
                                        </tr>
                                    )}

                                    </tbody>
                                </table>
                            </div>
                            <button className={'btnOneOfCars'} onClick={e => goBack()}>Назад</button>
                        </section>
                )
            )
        }
    }
}

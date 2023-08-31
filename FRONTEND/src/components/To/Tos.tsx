import * as React from "react";
import {useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import '../../styles/Tos.scss';


export default function Tos(props) {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const {id} = useParams();
    useEffect(() => {
        console.log(props.allTo)
        console.log(props.type)
        console.log(props.company)
        console.log(props.autos)

    }, [])

    const isMobile = useMediaQuery({
        query: '(max-width: 1200px)'
    })

    if (isMobile) {
        return (
            ((props.allTo == null && !props.type.length && !props.company.length && !props.autos.length) ?
                    '' :
                    <section className={'myTO'}>
                        <div className={'toFiltered'}>

                            {props.allTo.map((el, i) =>
                                <div className={'tableDivTo'} key={el.id}>
                                    <table className={'myToTable'}>
                                        <thead>
                                        <tr>
                                            <td>Вид ТО</td>
                                            <td><Link to={`/to/show/type/${el['to']}`}>{props.type ? props.type.find(
                                                type => type.id === el['to']
                                            ).name : el['to']}</Link></td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>Дата проведения ТО</td>
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
                                            <td><Link className={'col'} to={`/to/${el['id']}`}>Редактировать</Link></td>
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
    } else {
    }

    return (
        ((props.allTo == null && !props.type.length && !props.company.length && !props.autos.length) ?
                '' :
                <section className={'myTO'}>
                    <div className={'toFiltered'}>
                        <table className={'myToTable'}>
                            <thead>
                            <tr>
                                <td>Вид ТО</td>
                                <td>Дата проведения ТО</td>
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
                            {props.allTo.map((el, i) =>
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
                                        company => company.id === el['whoMakeTo']).name : el['whoMakeTo']}</Link></td>
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

import * as React from "react";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import '../../styles/Rec.scss';

export default function Tos(props) {
    const navigate = useNavigate();
    const [isCan, setIsCan] = useState<boolean>(false)
    const goBack = () => navigate(-1);
    const {id} = useParams();
    useEffect(() => {
        console.log(props.allRec)
        console.log(props.rejection)
        console.log(props.company)
        console.log(props.autos)
        console.log(props.recovery)

    }, [])

    useEffect(() => {
        if (props.groupName) {
            if (props.groupName === 'manager' || props.groupName === 'organization') {
                setIsCan(true)
            }
        }
    }, [])

    const isMobile = useMediaQuery({
        query: '(max-width: 1200px)'
    })
    if (isMobile) {
        return (
            ((props.allRec == null && !props.recovery.length && !props.company.length && !props.autos.length && !props.rejection.length) ?
                    '' :
                    <section className={'myRec1200'}>
                        <div className={'recFiltered1200'}>
                            {props.allRec.map((el, i) =>
                                <div className={'recMobile'} key={el.id}>
                                    <table className={'myTable1200'}>
                                        <thead>
                                        <tr>
                                            <td>Дата отказа</td>
                                            <td>{el['dateOfRejection']}</td>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>Наработка, м/час</td>
                                            <td>{el['work']}</td>
                                        </tr>
                                        <tr>
                                            <td>Узел отказа</td>
                                            <td>{props.rejection.length >= 1 ? el['nodeOfRejection'].map((e, i) =>
                                                    <span key={i}>
                                                <Link to={`/rec/show/rejection/${e}`}>
                                        {props.rejection.find(rejection => rejection.id === e).name}
                                                    </Link>
                                    </span>
                                            ) : el['nodeOfRejection'][0]}</td>
                                        </tr>
                                        <tr>
                                            <td>Описание отказа</td>
                                            <td>{el['description']}</td>
                                        </tr>
                                        <tr>
                                            <td>Способ восстановления</td>
                                            <td>{props.recovery.length >= 1 ? el['recovery'].map((e, i) =>
                                                    <span key={i}><Link to={`/rec/show/recovery/${e}`}>
                                        {props.recovery.find(recovery => recovery.id === e).name}
                                                </Link>
                                    </span>
                                            ) : el['recovery'][0]}</td>
                                        </tr>
                                        <tr>
                                            <td>Используемые запасные части</td>
                                            <td>{el['spareParts']}</td>
                                        </tr>
                                        <tr>
                                            <td>Дата восстановления</td>
                                            <td>{el['DateOfRestoration']}</td>
                                        </tr>
                                        <tr>
                                            <td>Время простоя техники</td>
                                            <td>{el['downtime']}</td>
                                        </tr>
                                        <tr>
                                            <td>Mашина</td>
                                            <td><Link to={`/car/${el['car']}`}>{props.autos ? props.autos.find(
                                                autos => autos.id === el['car']).vin : el['car']}</Link></td>
                                        </tr>
                                        <tr>
                                            <td>Сервисная компания</td>
                                            <td><Link
                                                to={`/car/company/${el['serviceCompany']}`}>{props.company ? props.company.find(
                                                company => company.id === el['serviceCompany']
                                            ).name : el['serviceCompany']}</Link></td>
                                        </tr>
                                        {isCan && (
                                            <tr>
                                                <td><Link to={`/rec/${el.id}`} className={'col'}>Редактировать</Link></td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                        </div>
                        <button className={'btnRec'} onClick={e => goBack()}>Назад</button>
                    </section>
            )
        )
    } else {
        return (
            ((props.allRec == null && !props.recovery.length && !props.company.length && !props.autos.length && !props.rejection.length) ?
                    '' :
                    <section className={'myRec'}>
                        <div className={'recFiltered'}>
                            <table className={'myRecTable'}>
                                <thead>
                                <tr>
                                    <td>Дата отказа</td>
                                    <td>Наработка, м/час</td>
                                    <td>Узел отказа</td>
                                    <td>Описание отказа</td>
                                    <td>Способ восстановления</td>
                                    <td>Используемые запасные части</td>
                                    <td>Дата восстановления</td>
                                    <td>Время простоя техники</td>
                                    <td>Mашина</td>
                                    <td>Сервисная компания</td>
                                    {isCan && (
                                        <td></td>
                                    )}
                                </tr>
                                </thead>
                                <tbody>
                                {props.allRec.map((el, i) =>
                                    <tr key={el.id}>
                                        <td>{el['dateOfRejection']}</td>
                                        <td>{el['work']}</td>
                                        <td>{props.rejection.length >= 1 ? el['nodeOfRejection'].map((e, i) =>
                                                <span key={i}>
                                                <Link to={`/rec/show/rejection/${e}`}>
                                        {props.rejection.find(rejection => rejection.id === e).name}
                                                    </Link>
                                    </span>
                                        ) : el['nodeOfRejection'][0]}</td>
                                        <td>{el['description']}</td>
                                        <td>{props.recovery.length >= 1 ? el['recovery'].map((e, i) =>
                                                <span key={i}><Link to={`/rec/show/recovery/${e}`}>
                                        {props.recovery.find(recovery => recovery.id === e).name}
                                                </Link>
                                    </span>
                                        ) : el['recovery'][0]}</td>
                                        <td>{el['spareParts']}</td>
                                        <td>{el['DateOfRestoration']}</td>
                                        <td>{el['downtime']}</td>
                                        <td><Link to={`/car/${el['car']}`}>{props.autos ? props.autos.find(
                                            autos => autos.id === el['car']).vin : el['car']}</Link></td>
                                        <td><Link
                                            to={`/car/company/${el['serviceCompany']}`}>{props.company ? props.company.find(
                                            company => company.id === el['serviceCompany']
                                        ).name : el['serviceCompany']}</Link></td>
                                        {isCan && (
                                            <td><Link to={`/rec/${el.id}`} className={'col'}>Редактировать</Link></td>
                                        )}
                                    </tr>
                                )}

                                </tbody>
                            </table>
                        </div>
                        <button className={'btnRec'} onClick={e => goBack()}>Назад</button>
                    </section>

            )
        )
    }
}

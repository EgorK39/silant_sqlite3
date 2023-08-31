import * as React from 'react';
import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import '../../../styles/ShowStyles.scss';

export default function ShowDrivingbridge(props) {
    const [drivingbridge, setDrivingbridge] = useState<object>(null)
    const {id} = useParams();
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    useEffect(() => {
        if (!drivingbridge) {
            fetch(`${props.defaultURL}car/user/${id}/detaildrivingbridge/`, {
                method: 'GET',
            })
                .then(async res => {
                    return await res.json()
                })
                .then(data => {
                    setDrivingbridge(data.drivingbridge);
                })
                .catch(err =>
                    console.log(err))
        }
    }, [])
    useEffect(() => {
        console.log(drivingbridge)
    }, [drivingbridge])
    return (
        <section className={'showSection'}>
            <div className={'showDiv'}>
                <h3>Модель ведущего моста</h3>
                <div className={'showForP'}>
                    <p>Название</p>
                    <p>{drivingbridge ? drivingbridge[1] : 'empty'}</p>
                </div>
                <div className={'showForP'}>
                    <p>Описание</p>
                    <p>{drivingbridge ? drivingbridge[2] : 'empty'}</p>
                </div>
                <button className={'btnOneOfCars'} onClick={e => goBack()}>Назад</button>
            </div>


        </section>
    )
}
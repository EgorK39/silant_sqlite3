import * as React from 'react';
import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import '../../../styles/ShowStyles.scss';

export default function ShowTransmission(props) {
    const [transmission, setTransmission] = useState<object>(null)
    const {id} = useParams();
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    useEffect(() => {
        if (!transmission) {
            fetch(`${props.defaultURL}car/user/${id}/detailtransmission/`, {
                method: 'GET',
            })
                .then(async res => {
                    return await res.json()
                })
                .then(data => {
                    setTransmission(data.transmission);
                })
                .catch(err =>
                    console.log(err))
        }
    }, [])
    useEffect(() => {
        console.log(transmission)
    }, [transmission])
    return (
        <section className={'showSection'}>
            <div className={'showDiv'}>
                <h3>Модель трансмиссии</h3>
                <div className={'showForP'}>
                    <p>Название</p>
                    <p>{transmission ? transmission[1] : 'empty'}</p>
                </div>
                <div className={'showForP'}>
                    <p>Описание</p>
                    <p>{transmission ? transmission[2] : 'empty'}</p>
                </div>
                <button className={'btnOneOfCars'} onClick={e => goBack()}>Назад</button>
            </div>


        </section>
    )
}
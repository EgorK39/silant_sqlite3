import * as React from 'react';
import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import '../../../styles/ShowStyles.scss';

export default function ShowEngine(props) {
    const [engine, setEngine] = useState<object>(null)
    const {id} = useParams();
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    useEffect(() => {
        if (!engine) {
            fetch(`${props.defaultURL}car/user/${id}/detailengine/`, {
                method: 'GET',
            })
                .then(async res => {
                    return await res.json()
                })
                .then(data => {
                    setEngine(data.engine);
                })
                .catch(err =>
                    console.log(err))
        }
    }, [])
    useEffect(() => {
        console.log(engine)
    }, [engine])
    return (
        <section className={'showSection'}>
            <div className={'showDiv'}>
                <h3>Модель двигателя</h3>
                <div className={'showForP'}>
                    <p>Название</p>
                    <p>{engine ? engine[1] : 'empty'}</p>
                </div>
                <div className={'showForP'}>
                    <p>Описание</p>
                    <p>{engine ? engine[2] : 'empty'}</p>
                </div>
                <button className={'btnOneOfCars'} onClick={e => goBack()}>Назад</button>
            </div>


        </section>
    )
}
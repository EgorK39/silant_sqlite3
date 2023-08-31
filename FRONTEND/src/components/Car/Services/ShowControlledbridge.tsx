import * as React from 'react';
import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import '../../../styles/ShowStyles.scss';

export default function ShowControlledbridge(props) {
    const [controlledbridge, setControlledbridge] = useState<object>(null)
    const {id} = useParams();
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    useEffect(() => {
        if (!controlledbridge) {
            fetch(`${props.defaultURL}car/user/${id}/detailcontrolledbridge/`, {
                method: 'GET',
            })
                .then(async res => {
                    return await res.json()
                })
                .then(data => {
                    setControlledbridge(data.controlledbridge);
                })
                .catch(err =>
                    console.log(err))
        }
    }, [])
    useEffect(() => {
        console.log(controlledbridge)
    }, [controlledbridge])
    return (
        <section className={'showSection'}>
            <div className={'showDiv'}>
                <h3>Модель управляемого моста</h3>
                <div className={'showForP'}>
                    <p>Название</p>
                    <p>{controlledbridge ? controlledbridge[1] : 'empty'}</p>
                </div>
                <div className={'showForP'}>
                    <p>Описание</p>
                    <p>{controlledbridge ? controlledbridge[2] : 'empty'}</p>
                </div>
                <button className={'btnOneOfCars'} onClick={e => goBack()}>Назад</button>
            </div>


        </section>
    )
}
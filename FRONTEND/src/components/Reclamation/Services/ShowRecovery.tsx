import * as React from 'react';
import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import '../../../styles/ShowStyles.scss';

export default function ShowRecovery(props) {
    const [recovery, setRecoveryn] = useState<object>(null)
    const {id} = useParams();
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'))
        if (!recovery) {
            fetch(`${props.defaultURL}car/${id}/detailrecovery/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.access}`
                },
            })
                .then(async res => {
                    return await res.json()
                })
                .then(data => {
                    setRecoveryn(data.recovery);
                })
                .catch(err =>
                    console.log(err))
        }
    }, [])
    useEffect(() => {
        console.log(recovery)
    }, [recovery])
    return (
        <section className={'showSection'}>
            <div className={'showDiv'}>
                <h3>Способ восстановления</h3>
                <div className={'showForP'}>
                    <p>Название</p>
                    <p>{recovery ? recovery[1] : 'empty'}</p>
                </div>
                <div className={'showForP'}>
                    <p>Описание</p>
                    <p>{recovery ? recovery[2] : 'empty'}</p>
                </div>
                <button className={'btnOneOfCars'} onClick={e => goBack()}>Назад</button>
            </div>


        </section>
    )
}
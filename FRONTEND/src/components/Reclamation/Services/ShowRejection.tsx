import * as React from 'react';
import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import '../../../styles/ShowStyles.scss';

export default function ShowRejection(props) {
    const [detailrejection, setDetailrejection] = useState<object>(null)
    const {id} = useParams();
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'))
        if (!detailrejection) {
            fetch(`${props.defaultURL}car/${id}/detailrejection/`, {
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
                    setDetailrejection(data.rejection);
                })
                .catch(err =>
                    console.log(err))
        }
    }, [])
    useEffect(() => {
        console.log(detailrejection)
    }, [detailrejection])
    return (
        <section className={'showSection'}>
            <div className={'showDiv'}>
                <h3>Узел отказа</h3>
                <div className={'showForP'}>
                    <p>Название</p>
                    <p>{detailrejection ? detailrejection[1] : 'empty'}</p>
                </div>
                <div className={'showForP'}>
                    <p>Описание</p>
                    <p>{detailrejection ? detailrejection[2] : 'empty'}</p>
                </div>
                <button className={'btnOneOfCars'} onClick={e => goBack()}>Назад</button>
            </div>


        </section>
    )
}
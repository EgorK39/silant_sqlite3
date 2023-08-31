import * as React from 'react';
import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import '../../../styles/ShowStyles.scss';

export default function ShowType(props) {
    const [typeTo, setTypeTo] = useState<object>(null)
    const {id} = useParams();
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'))
        if (!typeTo) {
            fetch(`${props.defaultURL}to/${id}/detailtype/`, {
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
                    setTypeTo(data.type);
                })
                .catch(err =>
                    console.log(err))
        }
    }, [])
    useEffect(() => {
        console.log(typeTo)
    }, [typeTo])
    return (
        <section className={'showSection'}>
            <div className={'showDiv'}>
                <h3>Вид ТО</h3>
                <div className={'showForP'}>
                    <p>Название</p>
                    <p>{typeTo ? typeTo[1] : 'empty'}</p>
                </div>
                <div className={'showForP'}>
                    <p>Описание</p>
                    <p>{typeTo ? typeTo[2] : 'empty'}</p>
                </div>
                <button className={'btnOneOfCars'} onClick={e => goBack()}>Назад</button>
            </div>


        </section>
    )
}
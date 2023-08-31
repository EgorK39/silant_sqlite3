import * as React from 'react';
import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import '../../../styles/ShowStyles.scss';

export default function ShowTechnic(props) {
    const [technic, setTechnic] = useState<object>(null)
    const {id} = useParams();
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    useEffect(() => {
        if (!technic) {
            fetch(`${props.defaultURL}car/user/${id}/detailtechnic/`, {
                method: 'GET',
            })
                .then(async res => {
                    return await res.json()
                })
                .then(data => {
                    setTechnic(data.technic);
                })
                .catch(err =>
                    console.log(err))
        }
    }, [])
    useEffect(() => {
        console.log(technic)
    }, [technic])
    return (
        <section className={'showSection'}>
            <div className={'showDiv'}>
                <h3>Модель техники</h3>
                <div className={'showForP'}>
                    <p>Название</p>
                    <p>{technic ? technic[1] : 'empty'}</p>
                </div>
                <div className={'showForP'}>
                    <p>Описание</p>
                    <p>{technic ? technic[2] : 'empty'}</p>
                </div>
                <button className={'btnOneOfCars'} onClick={e => goBack()}>Назад</button>
            </div>


        </section>
    )
}
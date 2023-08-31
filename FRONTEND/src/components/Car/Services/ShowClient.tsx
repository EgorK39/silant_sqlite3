import * as React from 'react';
import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import '../../../styles/ShowStyles.scss';

export default function ShowClient(props) {
    const [client, setClient] = useState<object>(null)
    const {id} = useParams();
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const dropPassword = () => {
        localStorage.setItem('token', JSON.stringify(''))
        navigate('/auth', {replace: true})
        navigate(0)
    }
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'))
        if (token.access) {

            if (!client) {
                fetch(`${props.defaultURL}car/${id}/detailclient/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token.access}`
                    },
                })
                    .then(async res => {
                        if (res.status != 200) {
                            console.log(res)
                            console.log(res.status)
                            console.log(typeof res.status)
                            dropPassword()
                        } else {
                            console.log(res)
                            return await res.json()
                        }
                    })
                    .then(data => {
                        setClient(data.client);
                    })
                    .catch(err =>
                        console.log(err))
            }
        }
    }, [])
    useEffect(() => {
        console.log(client)
    }, [client])
    return (
        <section className={'showSection'}>
            <div className={'showDiv'}>
                <h3>Карточка клиента</h3>
                <div className={'showForP'}>
                    <p>Название</p>
                    <p>{client ? client[1] : 'empty'}</p>
                </div>
                <div className={'showForP'}>
                    <p>Описание</p>
                    <p>{client ? client[2] : 'empty'}</p>
                </div>
                <button className={'btnOneOfCars'} onClick={e => goBack()}>Назад</button>
            </div>


        </section>
    )
}
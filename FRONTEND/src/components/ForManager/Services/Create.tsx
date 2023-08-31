import * as React from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import '../../../styles/Create.scss';

export default function Create(props) {

    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')


    const [isReady, setIsReady] = useState<boolean>(false)
    const [createURL, setCreateURL] = useState<string>('')

    const [data, setData] = useState<any>([])
    const [isBtn, setIsBtn] = useState<boolean>(false)

    const [about, setAbout] = useState<string>('')


    const navigate = useNavigate();
    let location = useLocation();
    const {id} = useParams();


    useEffect(() => {
        if (name && description) {
            setIsReady(true)
        } else {
            setIsReady(false)
        }
    }, [name, description])


    useEffect(() => {
        switch (location.pathname) {
            case '/manager/guide/createTechnic':
                setCreateURL('technic')
                setAbout('Создать новую технику')
                break;
            case '/manager/guide/createEngine':
                setCreateURL('engine')
                setAbout('Создать новый двигатель')
                break;
            case '/manager/guide/createTransmission':
                setCreateURL('transmission')
                setAbout('Создать новую трансмиссию')
                break;
            case '/manager/guide/createDrbridge':
                setCreateURL('drbridge')
                setAbout('Создать новый ведущий мост')
                break;
            case '/manager/guide/createCobridge':
                setCreateURL('cobridge')
                setAbout('Создать новый управляемый мост')
                break;
            case '/manager/guide/createType':
                setCreateURL('type')
                setAbout('Создать новый тип ТО')
                break;
            case '/manager/guide/createRejection':
                setCreateURL('rejection')
                setAbout('Создать новый узел отказа')
                break;
            case '/manager/guide/createRecovery':
                setCreateURL('recovery')
                setAbout('Создать новый способ восстановления')
                break;


            case `/manager/guide/technic/${id}`:
                setCreateURL('technic')
                setIsBtn(true)
                setAbout('Редактировать технику')

                break;
            case `/manager/guide/engine/${id}`:
                setCreateURL('engine')
                setAbout('Редактировать двигатель')
                setIsBtn(true)
                break;
            case `/manager/guide/transmission/${id}`:
                setCreateURL('transmission')
                setIsBtn(true)
                setAbout('Редактировать трансмиссию')

                break;
            case `/manager/guide/drbridge/${id}`:
                setCreateURL('drbridge')
                setIsBtn(true)
                setAbout('Редактировать ведущий мост')
                break;
            case `/manager/guide/cobridge/${id}`:
                setCreateURL('cobridge')
                setIsBtn(true)
                setAbout('Редактировать управляемый мост')
                break;
            case `/manager/guide/type/${id}`:
                setCreateURL('type')
                setIsBtn(true)
                setAbout('Редактировать тип ТО')
                break;
            case `/manager/guide/rejection/${id}`:
                setCreateURL('rejection')
                setAbout('Редактировать узел отказа')
                setIsBtn(true)
                break;
            case `/manager/guide/recovery/${id}`:
                setCreateURL('recovery')
                setIsBtn(true)
                setAbout('Редактировать способ восстановления')
                break;
        }
    }, [id])

    useEffect(() => {

        if (isBtn && createURL) {
            console.log(createURL)
            const token = JSON.parse(localStorage.getItem('token'))

            if (!data.length) {
                fetch(`${props.defaultURL}services/${createURL}/${id}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token.access}`
                    },
                })
                    .then(async res => {
                        console.log('auth')
                        if (res.status != 200) {
                            console.log(res)
                            console.log(res.status)
                            console.log(typeof res.status)
                            dropPassword()
                        } else {
                            // setClient(await res.json());
                            // console.log(res)
                            return await res.json()
                        }
                    })
                    .then(data => {
                        console.log(data)
                        setData(data);

                    })

                    .catch(err =>
                        console.log(err))
            }
        }

    }, [isBtn, createURL])

    const dropPassword = () => {
        localStorage.setItem('token', JSON.stringify(''))
        navigate('/auth', {replace: true})
        navigate(0)
    }


    const sendReq = () => {
        const token = JSON.parse(localStorage.getItem('token'))
        if (token.access) {
            console.log('auth')
            if (isBtn) {
                fetch(`${props.defaultURL}services/${createURL}/${id}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token.access}`
                        },
                        body: JSON.stringify({
                            'name': name,
                            'description': description,

                        })
                    })
                    .then(async res => {
                        if (res.status != 201) {
                            console.log(res)
                            console.log(res.status)
                            console.log(typeof res.status)
                            dropPassword()
                        } else {
                            return await res.json();
                        }
                    })
                    .then(data => {
                        // setCar(data)
                        console.log(data)
                        navigate('/manager/guide')


                    })
                    .catch(err =>
                        console.log(err))
            } else {
                fetch(`${props.defaultURL}services/${createURL}/`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token.access}`
                        },
                        body: JSON.stringify({
                            'name': name,
                            'description': description,

                        })
                    })
                    .then(async res => {
                        if (res.status != 201) {
                            console.log(res)
                            console.log(res.status)
                            console.log(typeof res.status)
                            dropPassword()
                        } else {
                            return await res.json();
                        }
                    })
                    .then(data => {
                        // setCar(data)
                        console.log(data)
                        navigate('/manager/guide')


                    })
                    .catch(err =>
                        console.log(err))
            }

        }


    }
    const goBack = () => navigate(-1);

    const myChangeFunc = (target) => {
        switch (target.name) {
            case 'name':
                setName(target.value)
                if (target.value.replace(/\s/g, "").length < 1) {
                    setName('')
                }
                break;
            case 'description':
                setDescription(target.value)
                if (target.value.replace(/\s/g, "").length < 1) {
                    setDescription('')
                }
                break;
        }
    }
    useEffect(() => {
        console.log(data)
    }, [data])
    return (
        <section className={'createSection'}>
            <div className={'afterCreateSection'}>
                <button className={'btnVin'} onClick={e => goBack()}>Назад</button>
                <div className={'createDiv'}>
                    <p>{about}</p>
                    <div className={'createMainDiv'}>
                        <p>Имя</p>
                        <input className={'vinInput'}
                               name={'name'}
                               value={name ? name : data.name ? data.name : name}
                            // value={data ? data.name : name}
                               autoComplete={'off'}
                               placeholder={'Имя'}
                               maxLength={25}
                               onChange={event => {
                                   myChangeFunc(event.target)
                               }}

                        />
                    </div>
                    <div className={'createMainDiv'}>
                        <p>Описание</p>
                        <input className={'vinInput'}
                               name={'description'}
                               value={description ? description : data.description ? data.description : description}

                            // value={data ? data.description : description}
                               autoComplete={'off'}
                               placeholder={'Описание'}
                               onChange={event => {
                                   myChangeFunc(event.target)
                               }}

                        />
                    </div>
                </div>
                {isBtn ?
                    <button
                        onClick={e => {
                            sendReq()
                        }}
                        className={'btnVin'}
                        disabled={!isReady}
                    >Сохранить изменения
                    </button> :
                    <button
                        onClick={e => {
                            sendReq()
                        }}
                        className={'btnVin'}
                        disabled={!isReady}
                    >Добавить
                    </button>
                }

            </div>

        </section>
    )
}
import * as React from 'react';
import {Link, useNavigate, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import '../../styles/Guide.scss';

export default function Guide(props) {

    const [technic, setTechnic] = useState<any>([])
    const [toggleTechnic, setToggleTechnic] = useState<boolean>(false)
    const [toggleTechnicTwo, setToggleTechnicTwo] = useState<boolean>(false)


    const [engine, setEngine] = useState<any>([])
    const [toggleEngine, setToggleEngine] = useState<boolean>(false)
    const [toggleEngineTwo, setToggleEngineTwo] = useState<boolean>(false)


    const [transmission, setTransmission] = useState<any>([])
    const [toggleTransmission, setToggleTransmission] = useState<boolean>(false)
    const [toggleTransmissionTwo, setToggleTransmissionTwo] = useState<boolean>(false)


    const [drbridge, setDrbridge] = useState<any>([])
    const [toggleDrbridge, setToggleDrbridge] = useState<boolean>(false)
    const [toggleDrbridgeTwo, setToggleDrbridgeTwo] = useState<boolean>(false)

    const [cobridge, setCobridge] = useState<any>([])
    const [toggleCobridge, setToggleCobridge] = useState<boolean>(false)
    const [toggleCobridgeTwo, setToggleCobridgeTwo] = useState<boolean>(false)

    const [type, setType] = useState<any>([])
    const [toggleType, setToggleType] = useState<boolean>(false)
    const [toggleTypeTwo, setToggleTypeTwo] = useState<boolean>(false)

    const [rejection, setRejection] = useState<any>([])
    const [toggleRejection, setToggleRejection] = useState<boolean>(false)
    const [toggleRejectionTwo, setToggleRejectionTwo] = useState<boolean>(false)

    const [recovery, setRecovery] = useState<any>([])
    const [toggleRecovery, setToggleRecovery] = useState<boolean>(false)
    const [toggleRecoveryTwo, setToggleRecoveryTwo] = useState<boolean>(false)


    const navigate = useNavigate();
    let location = useLocation();

    const goBack = () => navigate(-1);

    useEffect(() => {
        console.log(props.defaultURL)
        console.log(props.userName)
        console.log(props.groupName)
        console.log(location)
        console.log(location.search)
        console.log(location.pathname)

    }, [props.userName, props.groupName])
    const dropPassword = () => {
        localStorage.setItem('token', JSON.stringify(''))
        navigate('/auth', {replace: true})
        navigate(0)
    }
    useEffect(() => {
        if (props.groupName) {
            if (props.groupName == 'manager') {
                const token = JSON.parse(localStorage.getItem('token'))
                if (token.access) {


                    if (!technic.length) {
                        fetch(props.defaultURL + 'services/technic', {
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
                                setTechnic(data);

                            })

                            .catch(err =>
                                console.log(err))
                    }

                    if (!engine.length) {
                        fetch(props.defaultURL + 'services/engine', {
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
                                setEngine(data);

                            })

                            .catch(err =>
                                console.log(err))
                    }
                    if (!transmission.length) {
                        fetch(props.defaultURL + 'services/transmission', {
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
                                setTransmission(data);

                            })

                            .catch(err =>
                                console.log(err))
                    }

                    if (!drbridge.length) {
                        fetch(props.defaultURL + 'services/drbridge', {
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
                                setDrbridge(data);

                            })

                            .catch(err =>
                                console.log(err))
                    }
                    if (!cobridge.length) {
                        fetch(props.defaultURL + 'services/cobridge', {
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
                                setCobridge(data);

                            })

                            .catch(err =>
                                console.log(err))
                    }
                    if (!type.length) {
                        fetch(props.defaultURL + 'services/type', {
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
                                setType(data);

                            })

                            .catch(err =>
                                console.log(err))
                    }
                    if (!rejection.length) {
                        fetch(props.defaultURL + 'services/rejection', {
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
                                setRejection(data);

                            })

                            .catch(err =>
                                console.log(err))
                    }
                    if (!recovery.length) {
                        fetch(props.defaultURL + 'services/recovery', {
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
                                setRecovery(data);

                            })

                            .catch(err =>
                                console.log(err))
                    }
                }
            }
        }

    }, [])

    return (
        <section className={'guideSection'}>
            <div className={'afterGuideSection'}>
                <div className={'gridGuide'}>
                    <div className={'myGuide'}>
                        <p>Добавить и редактировать модель техники</p>
                        <input className={'guideInput'}
                               name={'technic'}
                            // disabled={true}
                            //    value={engineMod}
                            //    onChange={event => {
                            //
                            //        myChangeFunc(event.target)
                            //    }}
                               placeholder={'Модель техники'}
                               onClick={e => {
                                   setToggleTechnic(!toggleTechnic)
                                   setToggleEngine(false)
                                   setToggleTransmission(false)
                                   setToggleDrbridge(false)
                                   setToggleCobridge(false)
                                   setToggleType(false)
                                   setToggleRejection(false)
                                   setToggleRecovery(false)
                               }}
                               onBlur={event => {
                                   setToggleTechnic(false)
                               }}
                        />

                        {(toggleTechnic || toggleTechnicTwo) && (
                            <ul
                                //     onClick={event => {
                                //     myEngineToggleFunc(event.target)
                                //
                                // }}
                                onMouseOver={event => {
                                    setToggleTechnicTwo(true)
                                }}
                                tabIndex={-1}
                                onMouseLeave={event => {
                                    setToggleTechnicTwo(false)
                                }}
                                className={"searchUl"}

                            >
                                <li><Link to={'createTechnic'}>Создать</Link></li>
                                {technic ?

                                    technic.map((el, i) =>
                                        <li key={el.id}><Link to={`technic/${el.id}`}>{el.name}</Link></li>
                                    )
                                    : ''}
                            </ul>
                        )}
                    </div>
                    <div className={'myGuide'}>
                        <p>Добавить и редактировать модель двигателя</p>
                        <input className={'guideInput'}
                               name={'engine'}
                            // disabled={true}
                            //    value={engineMod}
                            //    onChange={event => {
                            //
                            //        myChangeFunc(event.target)
                            //    }}
                               placeholder={'Модель двигателя'}
                               onClick={e => {
                                   setToggleEngine(!toggleEngine)
                                   setToggleTechnic(false)
                                   setToggleTransmission(false)
                                   setToggleDrbridge(false)
                                   setToggleCobridge(false)
                                   setToggleType(false)
                                   setToggleRejection(false)
                                   setToggleRecovery(false)

                               }}
                               onBlur={event => {
                                   setToggleEngine(false)
                               }}
                        />

                        {(toggleEngine || toggleEngineTwo) && (
                            <ul
                                //     onClick={event => {
                                //     myEngineToggleFunc(event.target)
                                //
                                // }}
                                onMouseOver={event => {
                                    setToggleEngineTwo(true)
                                }}
                                tabIndex={-1}
                                onMouseLeave={event => {
                                    setToggleEngineTwo(false)
                                }}
                                className={"searchUl"}

                            >
                                <li><Link to={'createEngine'}>Создать</Link></li>
                                {engine ?

                                    engine.map((el, i) =>
                                        <li key={el.id}><Link to={`engine/${el.id}`}>{el.name}</Link></li>
                                    )
                                    : ''}
                            </ul>
                        )}
                    </div>
                    <div className={'myGuide'}>
                        <p>Добавить и редактировать модель трансмиссии</p>
                        <input className={'guideInput'}
                               name={'transmission'}
                               placeholder={'Модель трансмиссии'}
                               onClick={e => {
                                   setToggleTransmission(!toggleTransmission)
                                   setToggleTechnic(false)
                                   setToggleEngine(false)
                                   setToggleDrbridge(false)
                                   setToggleCobridge(false)
                                   setToggleType(false)
                                   setToggleRejection(false)
                                   setToggleRecovery(false)

                               }}
                               onBlur={event => {
                                   setToggleTransmission(false)
                               }}
                        />

                        {(toggleTransmission || toggleTransmissionTwo) && (
                            <ul
                                onMouseOver={event => {
                                    setToggleTransmissionTwo(true)
                                }}
                                tabIndex={-1}
                                onMouseLeave={event => {
                                    setToggleTransmissionTwo(false)
                                }}
                                className={"searchUl"}

                            >
                                <li><Link to={'createTransmission'}>Создать</Link></li>
                                {transmission ?

                                    transmission.map((el, i) =>
                                        <li key={el.id}><Link to={`transmission/${el.id}`}>{el.name}</Link></li>
                                    )
                                    : ''}
                            </ul>
                        )}
                    </div>
                    <div className={'myGuide'}>
                        <p>Добавить и редактировать модель ведущего моста</p>
                        <input className={'guideInput'}
                               name={'drbridge'}
                               placeholder={'Модель ведущего моста'}
                               onClick={e => {
                                   setToggleDrbridge(!toggleDrbridge)
                                   setToggleTechnic(false)
                                   setToggleEngine(false)
                                   setToggleTransmission(false)
                                   setToggleCobridge(false)
                                   setToggleType(false)
                                   setToggleRejection(false)
                                   setToggleRecovery(false)

                               }}
                               onBlur={event => {
                                   setToggleDrbridge(false)
                               }}
                        />

                        {(toggleDrbridge || toggleDrbridgeTwo) && (
                            <ul
                                onMouseOver={event => {
                                    setToggleDrbridgeTwo(true)
                                }}
                                tabIndex={-1}
                                onMouseLeave={event => {
                                    setToggleDrbridgeTwo(false)
                                }}
                                className={"searchUl"}

                            >
                                <li><Link to={'createDrbridge'}>Создать</Link></li>
                                {transmission ?

                                    transmission.map((el, i) =>
                                        <li key={el.id}><Link to={`drbridge/${el.id}`}>{el.name}</Link></li>
                                    )
                                    : ''}
                            </ul>
                        )}
                    </div>
                    <div className={'myGuide'}>
                        <p>Добавить и редактировать модель управляемого моста</p>
                        <input className={'guideInput'}
                               name={'cobridge'}
                               placeholder={'Модель управляемого моста'}
                               onClick={e => {
                                   setToggleCobridge(!toggleCobridge)
                                   setToggleTechnic(false)
                                   setToggleEngine(false)
                                   setToggleTransmission(false)
                                   setToggleDrbridge(false)
                                   setToggleType(false)
                                   setToggleRejection(false)
                                   setToggleRecovery(false)
                               }}
                               onBlur={event => {
                                   setToggleCobridge(false)
                               }}
                        />

                        {(toggleCobridge || toggleCobridgeTwo) && (
                            <ul
                                onMouseOver={event => {
                                    setToggleCobridgeTwo(true)
                                }}
                                tabIndex={-1}
                                onMouseLeave={event => {
                                    setToggleCobridgeTwo(false)
                                }}
                                className={"searchUl"}

                            >
                                <li><Link to={'createCobridge'}>Создать</Link></li>
                                {cobridge ?

                                    cobridge.map((el, i) =>
                                        <li key={el.id}><Link to={`cobridge/${el.id}`}>{el.name}</Link></li>
                                    )
                                    : ''}
                            </ul>
                        )}
                    </div>
                    <div className={'myGuide'}>
                        <p>Добавить и редактировать модель Вид ТО</p>
                        <input className={'guideInput'}
                               name={'type'}
                               placeholder={'Модель Вид ТО'}
                               onClick={e => {
                                   setToggleType(!toggleType)
                                   setToggleTechnic(false)
                                   setToggleEngine(false)
                                   setToggleTransmission(false)
                                   setToggleDrbridge(false)
                                   setToggleCobridge(false)
                                   setToggleRejection(false)
                                   setToggleRecovery(false)
                               }}
                               onBlur={event => {
                                   setToggleType(false)
                               }}
                        />

                        {(toggleType || toggleTypeTwo) && (
                            <ul
                                onMouseOver={event => {
                                    setToggleTypeTwo(true)
                                }}
                                tabIndex={-1}
                                onMouseLeave={event => {
                                    setToggleTypeTwo(false)
                                }}
                                className={"searchUl"}

                            >
                                <li><Link to={'createType'}>Создать</Link></li>
                                {type ?

                                    type.map((el, i) =>
                                        <li key={el.id}><Link to={`type/${el.id}`}>{el.name}</Link></li>
                                    )
                                    : ''}
                            </ul>
                        )}
                    </div>
                    <div className={'myGuide'}>
                        <p>Добавить и редактировать модель Узел отказа</p>
                        <input className={'guideInput'}
                               name={'rejection'}
                               placeholder={'Модель Узел отказа'}
                               onClick={e => {
                                   setToggleRejection(!toggleRejection)
                                   setToggleTechnic(false)
                                   setToggleEngine(false)
                                   setToggleTransmission(false)
                                   setToggleDrbridge(false)
                                   setToggleCobridge(false)
                                   setToggleType(false)
                                   setToggleRecovery(false)
                               }}
                               onBlur={event => {
                                   setToggleRejection(false)
                               }}
                        />

                        {(toggleRejection || toggleRejectionTwo) && (
                            <ul
                                onMouseOver={event => {
                                    setToggleRejectionTwo(true)
                                }}
                                tabIndex={-1}
                                onMouseLeave={event => {
                                    setToggleRejectionTwo(false)
                                }}
                                className={"searchUl"}

                            >
                                <li><Link to={'createRejection'}>Создать</Link></li>
                                {rejection ?

                                    rejection.map((el, i) =>
                                        <li key={el.id}><Link to={`rejection/${el.id}`}>{el.name}</Link></li>
                                    )
                                    : ''}
                            </ul>
                        )}
                    </div>
                    <div className={'myGuide'}>
                        <p>Добавить и редактировать модель cпособ восстановления</p>
                        <input className={'guideInput'}
                               name={'recovery'}
                               placeholder={'Модель cпособ восстановления'}
                               onClick={e => {
                                   setToggleRecovery(!toggleRecovery)
                                   setToggleTechnic(false)
                                   setToggleEngine(false)
                                   setToggleTransmission(false)
                                   setToggleDrbridge(false)
                                   setToggleCobridge(false)
                                   setToggleType(false)
                                   setToggleRejection(false)
                               }}
                               onBlur={event => {
                                   setToggleRecovery(false)
                               }}
                        />

                        {(toggleRecovery || toggleRecoveryTwo) && (
                            <ul
                                onMouseOver={event => {
                                    setToggleRecoveryTwo(true)
                                }}
                                tabIndex={-1}
                                onMouseLeave={event => {
                                    setToggleRecoveryTwo(false)
                                }}
                                className={"searchUl"}

                            >
                                <li><Link to={'createRecovery'}>Создать</Link></li>
                                {recovery ?

                                    recovery.map((el, i) =>
                                        <li key={el.id}><Link to={`recovery/${el.id}`}>{el.name}</Link></li>
                                    )
                                    : ''}
                            </ul>
                        )}
                    </div>
                </div>
                <button className={'btnBack'} onClick={e => goBack()}>Назад</button>
            </div>
        </section>
    )
}
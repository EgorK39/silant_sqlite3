import * as React from 'react';
import '../../styles/ManagerMain.scss';
import {useEffect, useState} from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import Cars from '../Car/Cars';
import ManagerCars from './ManagerCars';
import CarCreate from "./CarCreate";

export default function ManagerMain(props) {
    const [vin, setVin] = useState('');
    const [isFiltered, setIsFiltered] = useState(false);
    const [isReady, setIsReady] = useState(false)

    const [allCars, setAllCars] = useState<any>(null);
    const [filteredCar, setFilteredCars] = useState<any>([]);


    const [client, setClient] = useState<any>([])
    const [company, setCompany] = useState<any>([])
    const [technic, setTechnic] = useState<any>([])
    const [engine, setEngine] = useState<any>([])
    const [transmission, setTransmission] = useState<any>([])
    const [drivingbridge, setDrivingbridge] = useState<any>([])
    const [controlledbridge, setControlledbridge] = useState<any>([])
    const [type, setType] = useState<any>([])
    const [rejection, setRejection] = useState<any>([])
    const [recovery, setRecovery] = useState<any>([])


    const [engineMod, setEngineMod] = useState<any>('')
    const [toggleEngine, setToggleEngin] = useState<boolean>(false)
    const [toggleEngineTwo, setToggleEnginTwo] = useState(false)


    const [transmissionMod, setTransmissionMod] = useState<any>('')
    const [toggleTransmission, setToggleTransmission] = useState<boolean>(false)
    const [toggleTransmissionTwo, setToggleTransmissionTwo] = useState(false)


    const [drivingbridgeMod, setdrivingbridgeMod] = useState<any>('')
    const [toggleDrivingbridge, setToggleDrivingbridge] = useState<boolean>(false)
    const [toggleDrivingbridgeTwo, setToggleDrivingbridgeTwo] = useState(false)


    const [controlledbridgeMod, setControlledbridgeMod] = useState<any>('')
    const [toggleControlledbridge, setToggleControlledbridge] = useState<boolean>(false)
    const [toggleControlledbridgeTwo, setToggleControlledbridgeTwo] = useState(false)


    const navigate = useNavigate();
    const [addCar, setAddCar] = useState(false)

    useEffect(() => {
        console.log(isReady)
        if (isReady) {
            console.log(JSON.parse(localStorage.getItem('token')))
            const token = JSON.parse(localStorage.getItem('token'))
            console.log(isReady)
            if (!client.length) {
                console.log('client')

                fetch(props.defaultURL + 'services/client', {
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
                        setClient(data)
                    })
                    .catch(err =>
                        console.log(err))
            }
            if (!company.length) {
                fetch(props.defaultURL + 'services/company', {
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
                        setCompany(data)
                    })
                    .catch(err =>
                        console.log(err))
            }
            if (!technic.length) {
                console.log('technic')
                fetch(props.defaultURL + 'services/technic', {
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
                        setTechnic(data)

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
                        return await res.json()
                    })
                    .then(data => {
                        setEngine(data)
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
                        return await res.json()
                    })
                    .then(data => {
                        setTransmission(data)
                    })
                    .catch(err =>
                        console.log(err))
            }
            if (!drivingbridge.length) {
                fetch(props.defaultURL + 'services/drbridge', {
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
                        setDrivingbridge(data)
                    })
                    .catch(err =>
                        console.log(err))
            }
            if (!controlledbridge.length) {
                fetch(props.defaultURL + 'services/cobridge', {
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
                        setControlledbridge(data)
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
                        return await res.json()
                    })
                    .then(data => {
                        setType(data)
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
                        return await res.json()
                    })
                    .then(data => {
                        setRejection(data)
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
                        return await res.json()
                    })
                    .then(data => {
                        setRecovery(data)
                    })
                    .catch(err =>
                        console.log(err))
            }
        }

    }, [isReady])


    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem('token')))
        const token = JSON.parse(localStorage.getItem('token'))
        if (token.access) {
            if (!allCars) {
                console.log('hu')
                fetch(props.defaultURL + 'cars/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token.access}`
                    },
                    // body: JSON.stringify({'username': String(login), 'password': String(password)},
                    // )
                })
                    .then(async res => {
                        if (res.status != 200) {
                            console.log(res)
                            console.log(res.status)
                            console.log(typeof res.status)
                            navigate('/', {replace: true})
                            navigate(0)
                        } else {
                            return await res.json()
                        }
                    })
                    .then(data => {
                        setAllCars(data)
                        setIsReady(true)
                        console.log('end')

                    })
                    .catch(err =>
                        console.log(err))
            }
        }
    }, [])

    const dropPassword = () => {
        localStorage.setItem('token', JSON.stringify(''))
        navigate('/auth', {replace: true})
        navigate(0)
    }
    const btn = () => {
        console.log(JSON.parse(localStorage.getItem('token')))
        const token = JSON.parse(localStorage.getItem('token'))
        if (token.access) {
            console.log('auth')
            fetch(`${props.defaultURL}cars/?engine__in=${engineMod}&transmission__in=${transmissionMod}&controlledBridge__in=${controlledbridgeMod}&drivingBridge__in=${drivingbridgeMod}&vin__iendswith=${vin}`,
                {
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
                        setFilteredCars(await res.json());
                    }
                })

                .catch(err =>
                    console.log(err))
            setIsFiltered(true)
        }
    }

    const normalizeNumber = (value) => {
        return value.replace(/\s/g, "").match(/.{1,3}/g)?.join(" ") || ""
    }
    const myEngineToggleFunc = (target) => {
        const engineId = engine.find(engine => engine.name === target.textContent).id
        setEngineMod(engineId)
    }
    const myTransmissionToggleFunc = (target) => {
        const transmissionId = transmission.find(transmission => transmission.name === target.textContent).id
        setTransmissionMod(transmissionId)
    }
    const myDrivingbridgeToggleFunc = (target) => {
        const drivingbridgeId = drivingbridge.find(drivingbridge => drivingbridge.name === target.textContent).id
        setdrivingbridgeMod(drivingbridgeId)
    }
    const myControlledbridgeToggleFunc = (target) => {
        const controlledbridgeId = controlledbridge.find(controlledbridge => controlledbridge.name === target.textContent).id
        setControlledbridgeMod(controlledbridgeId)
    }
    const myEngineFunc = (target) => {
        switch (target.name) {
            case 'engineMod':
                setEngineMod('')
                if (/./.test(target.value.replace(/\s/g, ""))) {
                    setEngineMod('')
                }
                break;
            case 'transmission':
                setTransmissionMod('')
                if (/./.test(target.value.replace(/\s/g, ""))) {
                    setTransmissionMod('')
                }
                break;
            case 'drivingbridge':
                setdrivingbridgeMod('')
                if (/./.test(target.value.replace(/\s/g, ""))) {
                    setdrivingbridgeMod('')
                }
                break;
            case 'controlledbridge':
                setControlledbridgeMod('')
                if (/./.test(target.value.replace(/\s/g, ""))) {
                    setControlledbridgeMod('')
                }
                break;
        }
    }

    return (
        <section className={'managerSection'}>
            <div className={'managerMain'}>
                <h3 className={'myH'}>Главная страница менеджера</h3>
                <Outlet/>
                <div className={'inAndBtn'}>
                    <input className={'vinInput'}
                           name={'vin'}
                           autoComplete={'off'}
                           onChange={event => {
                               const {value} = event.target
                               event.target.value = normalizeNumber(value)


                               setVin(event.target.value)
                               console.log(event.target)
                           }}
                           maxLength={15}
                           placeholder={'Зав. № машины'}

                    />

                    <div className={'myRelative'}>
                        <input className={'vinInput'}
                               name={'engineMod'}
                            // disabled={true}
                               value={engineMod}
                               onChange={event => {

                                   myEngineFunc(event.target)
                               }}
                               placeholder={'Модель двигателя'}
                               onClick={e => {
                                   setToggleEngin(!toggleEngine)
                                   setToggleTransmission(false)
                                   setToggleDrivingbridge(false)
                                   setToggleControlledbridge(false)
                               }}
                               onBlur={event => {
                                   setToggleEngin(false)
                               }}
                        />

                        {(toggleEngine || toggleEngineTwo) && (
                            <ul onClick={event => {
                                myEngineToggleFunc(event.target)

                            }}
                                onMouseOver={event => {
                                    setToggleEnginTwo(true)
                                }}
                                tabIndex={-1}
                                onMouseLeave={event => {
                                    setToggleEnginTwo(false)
                                }}
                                className={"searchUl"}

                            >
                                {engine ? engine.map((el, i) =>
                                    <li key={el.id}>{el.name}</li>
                                ) : ''}
                            </ul>
                        )}
                    </div>
                    <div className={'myRelative'}>
                        <input className={'vinInput'}
                               name={'transmission'}
                               value={transmissionMod}
                               onChange={event => {

                                   myEngineFunc(event.target)
                               }}
                               placeholder={'Модель трансмиссии'}
                               onClick={e => {
                                   setToggleTransmission(!toggleTransmission)
                                   setToggleEngin(false)
                                   setToggleDrivingbridge(false)
                                   setToggleControlledbridge(false)
                               }}
                               onBlur={event => {
                                   setToggleTransmission(false)

                               }}
                        />
                        {(toggleTransmission || toggleTransmissionTwo) && (
                            <ul onClick={event => {
                                myTransmissionToggleFunc(event.target)
                            }}
                                onMouseOver={event => {
                                    setToggleTransmissionTwo(true)
                                }}
                                tabIndex={-1}
                                onMouseLeave={event => {
                                    setToggleTransmissionTwo(false)
                                }}
                                className={"searchUl"}>
                                {transmission ? transmission.map((el, i) =>
                                    <li key={el.id}>{el.name}</li>
                                ) : ''}
                            </ul>
                        )}
                    </div>
                    <div className={'myRelative'}>
                        <input className={'vinInput'}
                               name={'drivingbridge'}
                            // disabled={true}
                               value={drivingbridgeMod}
                               onChange={event => {

                                   myEngineFunc(event.target)
                               }}
                               placeholder={'Модель ведущего моста'}
                               onClick={e => {
                                   setToggleDrivingbridge(!toggleDrivingbridge)
                                   setToggleEngin(false)
                                   setToggleTransmission(false)
                                   setToggleControlledbridge(false)
                               }}
                               onBlur={event => {
                                   setToggleDrivingbridge(false)

                               }}
                        />

                        {(toggleDrivingbridge || toggleDrivingbridgeTwo) && (
                            <ul onClick={event => {
                                myDrivingbridgeToggleFunc(event.target)
                            }}
                                onMouseOver={event => {
                                    setToggleDrivingbridgeTwo(true)
                                }}
                                tabIndex={-1}
                                onMouseLeave={event => {
                                    setToggleDrivingbridgeTwo(false)
                                }}
                                className={"searchUl"}>
                                {drivingbridge ? drivingbridge.map((el, i) =>
                                    <li key={el.id}>{el.name}</li>
                                ) : ''}
                            </ul>
                        )}
                    </div>
                    <div className={'myRelative'}>
                        <input className={'vinInput'}
                               name={'controlledbridge'}
                               value={controlledbridgeMod}
                               onChange={event => {

                                   myEngineFunc(event.target)
                               }}
                               placeholder={'Модель управляемого моста'}
                               onClick={e => {
                                   setToggleControlledbridge(!toggleControlledbridge)
                                   setToggleEngin(false)
                                   setToggleTransmission(false)
                                   setToggleDrivingbridge(false)
                               }}
                               onBlur={event => {
                                   setToggleControlledbridge(false)

                               }}
                        />
                        {(toggleControlledbridge || toggleControlledbridgeTwo) && (
                            <ul onClick={event => {
                                myControlledbridgeToggleFunc(event.target)
                            }}
                                onMouseOver={event => {
                                    setToggleControlledbridgeTwo(true)
                                }}
                                tabIndex={-1}
                                onMouseLeave={event => {
                                    setToggleControlledbridgeTwo(false)
                                }}
                                className={"searchUl"}>
                                {controlledbridge ? controlledbridge.map((el, i) =>
                                    <li key={el.id}>{el.name}</li>
                                ) : ''}
                            </ul>
                        )}
                    </div>
                    <button onClick={e => {
                        (vin || engineMod || transmissionMod || drivingbridgeMod || controlledbridgeMod)
                            ? btn() : setIsFiltered(false)
                    }} className={'btnVin'}>Поиск
                    </button>
                </div>
                <div>
                    <button className={'btnAddCar'}
                            onClick={e => {
                                setAddCar(!addCar)
                            }}>Добавить новую машину
                    </button>
                    {addCar && (
                        <>
                            <h3 className={'myH'}>Добавить машину:</h3>
                            <CarCreate defaultURL={props.defaultURL}
                            />
                        </>
                    )}

                </div>
                <div><Link to={'guide'}>
                    <button className={'btnAddCar'}>Справочник
                    </button>
                </Link>
                </div>
                <h3 className={'myH'}>Результат поиска:</h3>
                <div className={'textInCarSearch'}>
                    <span>Информация о комплектации и технических</span>
                    <span>характеристиках техники</span>
                </div>
            </div>
            {
                isFiltered ? (
                    <ManagerCars allCars={filteredCar}
                                 technic={technic}
                                 engine={engine}
                                 transmission={transmission}
                                 drivingbridge={drivingbridge}
                                 controlledbridge={controlledbridge}
                                 client={client}
                                 company={company}
                    />
                ) : (
                    <ManagerCars allCars={allCars}
                                 technic={technic}
                                 engine={engine}
                                 transmission={transmission}
                                 drivingbridge={drivingbridge}
                                 controlledbridge={controlledbridge}
                                 client={client}
                                 company={company}
                    />
                )
            }
        </section>
    )
}
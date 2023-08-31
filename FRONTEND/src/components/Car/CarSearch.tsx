import * as React from 'react';
import '../../styles/CarSearch.scss';
import {useState, useEffect, lazy} from "react";
import Cars from './Cars';
import {Outlet, useNavigate} from "react-router-dom";
import NavBar from "../Header/NavBar";

export default function CarSearch(props) {
    const [vin, setVin] = useState('');
    const [isFiltered, setIsFiltered] = useState(false);
    const [allCars, setAllCars] = useState<any>(null);
    const [filteredCar, setFilteredCars] = useState([]);

    const [technic, setTechnic] = useState<any>([])
    const [engine, setEngine] = useState<any>([])
    const [transmission, setTransmission] = useState<any>([])
    const [drivingbridge, setDrivingbridge] = useState<any>([])
    const [controlledbridge, setControlledbridge] = useState<any>([])

    const [client, setClient] = useState<any>([])
    const [company, setCompany] = useState<any>([])

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

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const [isReady, setIsReady] = useState(false)


    const navigate = useNavigate();

    useEffect(() => {
        console.log(isReady)
        if (isReady) {
            console.log(isReady)
            if (!technic.length) {
                fetch(props.defaultURL + 'car/user/technic', {
                    method: 'GET',
                })
                    .then(async res => {
                        setTechnic(await res.json())
                    })
                    .catch(err =>
                        console.log(err))
            }
            if (!engine.length) {
                fetch(props.defaultURL + 'car/user/engine', {
                    method: 'GET',
                })
                    .then(async res => {
                        setEngine(await res.json())
                    })
                    .catch(err =>
                        console.log(err))
            }

            if (!transmission.length) {
                fetch(props.defaultURL + 'car/user/transmission', {
                    method: 'GET',
                })
                    .then(async res => {
                        setTransmission(await res.json())
                    })
                    .catch(err =>
                        console.log(err))
            }
            if (!drivingbridge.length) {
                fetch(props.defaultURL + 'car/user/drivingbridge', {
                    method: 'GET',
                })
                    .then(async res => {
                        setDrivingbridge(await res.json())
                    })
                    .catch(err =>
                        console.log(err))
            }
            if (!controlledbridge.length) {
                fetch(props.defaultURL + 'car/user/controlledbridge', {
                    method: 'GET',
                })
                    .then(async res => {
                        setControlledbridge(await res.json())
                    })
                    .catch(err =>
                        console.log(err))
            }
            const token = JSON.parse(localStorage.getItem('token'))
            if (token.access) {
                if (!client.length) {
                    console.log('client')
                    fetch(props.defaultURL + 'car/client', {
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
                            console.log(data.client)
                            setClient(data.client);

                        })

                        .catch(err =>
                            console.log(err))
                }
                if (!company.length) {
                    console.log('company')
                    fetch(props.defaultURL + 'car/company', {
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
                                // setCompany(await res.json());
                                // console.log(res)
                                return await res.json()
                            }
                        })
                        .then(data => {
                            console.log(data)
                            console.log(data.company)
                            setCompany(data.company);

                        })

                        .catch(err =>
                            console.log(err))
                }
            }
        }
    }, [isReady])
    useEffect(() => {
        if ((company.length > 1) && (client.length > 1)) {
            console.log(company)
            console.log(company.length)

            console.log(client)
            console.log(client.length)
        } else {
            console.log(company.length)
            console.log(client.length)
        }
    }, [company, client])
    const dropPassword = () => {
        localStorage.setItem('token', JSON.stringify(''))
        navigate('/auth', {replace: true})
        navigate(0)
    }

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'))
        if (token.access) {
            console.log(token.access)
            fetch(props.defaultURL + 'car', {
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
                        console.log(res)
                        setAllCars(await res.json());
                        setIsReady(true)
                        setIsAuthenticated(true)

                    }
                })

                .catch(err =>
                    console.log(err))
        } else {
            fetch(props.defaultURL + 'car/user', {
                method: 'GET',
            })
                .then(async res => {
                    console.log('not_auth')
                    setAllCars(await res.json());
                    setIsReady(true)

                })

                .catch(err =>
                    console.log(err))
        }

    }, [])

    const btn = () => {
        console.log(JSON.parse(localStorage.getItem('token')))
        const token = JSON.parse(localStorage.getItem('token'))
        if (token.access) {
            console.log('auth')
            fetch(`${props.defaultURL}car/?engine__in=${engineMod}&transmission__in=${transmissionMod}&controlledBridge__in=${controlledbridgeMod}&drivingBridge__in=${drivingbridgeMod}&vin__iendswith=${vin}`,
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
                        console.log(res)
                        setFilteredCars(await res.json());
                    }
                })

                .catch(err =>
                    console.log(err))
            setIsFiltered(true)
        } else {
            console.log('non_auth')
            fetch(`${props.defaultURL}car/user/?engine__in=${engineMod}&transmission__in=${transmissionMod}&controlledBridge__in=${controlledbridgeMod}&drivingBridge__in=${drivingbridgeMod}&vin__iendswith=${vin}`,
                {
                    method: 'GET',
                })
                .then(async res => {
                        setFilteredCars(await res.json());
                    }
                )

                .catch(err =>
                    console.log(err))
            setIsFiltered(true)
        }
    }

    const normalizeNumber = (value) => {
        return value.replace(/\s/g, "").match(/.{1,3}/g)?.join(" ") || ""
    }
    const myEngineToggleFunc = (target) => {
        const engineId = engine.engine.find(engine => engine.name === target.textContent).id
        setEngineMod(engineId)
    }
    const myTransmissionToggleFunc = (target) => {
        const transmissionId = transmission.transmission.find(transmission => transmission.name === target.textContent).id
        setTransmissionMod(transmissionId)
    }
    const myDrivingbridgeToggleFunc = (target) => {
        const drivingbridgeId = drivingbridge.drivingbridge.find(drivingbridge => drivingbridge.name === target.textContent).id
        setdrivingbridgeMod(drivingbridgeId)
    }
    const myControlledbridgeToggleFunc = (target) => {
        const controlledbridgeId = controlledbridge.controlledbridge.find(controlledbridge => controlledbridge.name === target.textContent).id
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
        <>
            <div className={'carSearchMain'}>
                {props.isAuthenticated ? <h3 className={'myH'}>Проверьте комплектацию и технические характеристики Вашей
                        техники Силант</h3> :
                    <h3 className={'myH'}>Проверьте комплектацию и технические характеристики
                        техники Силант</h3>}
                {isAuthenticated && (
                    <NavBar userName={props.userName}/>
                )}
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
                                {engine ? engine.engine.map((el, i) =>
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
                                {transmission ? transmission.transmission.map((el, i) =>
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
                                {drivingbridge ? drivingbridge.drivingbridge.map((el, i) =>
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
                                {controlledbridge ? controlledbridge.controlledbridge.map((el, i) =>
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
                <h3 className={'myH'}>Результат поиска:</h3>
                <div className={'textInCarSearch'}>
                    <span>Информация о комплектации и технических</span>
                    <span>характеристиках техники</span>
                </div>
            </div>
            {
                isFiltered ? (
                    <Cars allCars={filteredCar}
                          technic={technic.technic}
                          engine={engine.engine}
                          transmission={transmission.transmission}
                          drivingbridge={drivingbridge.drivingbridge}
                          controlledbridge={controlledbridge.controlledbridge}
                          client={client}
                          company={company}
                    />
                ) : (
                    <Cars allCars={allCars}
                          technic={technic.technic}
                          engine={engine.engine}
                          transmission={transmission.transmission}
                          drivingbridge={drivingbridge.drivingbridge}
                          controlledbridge={controlledbridge.controlledbridge}
                          client={client}
                          company={company}
                    />
                )
            }
        </>
    )
}
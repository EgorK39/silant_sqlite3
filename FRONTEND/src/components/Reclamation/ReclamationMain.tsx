import * as React from 'react';
import '../../styles/CarSearch.scss';
import {useState, useEffect} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import Rec from './Rec';
import CreateTo from "../To/CreateTo";
import CreateRec from "./CreateRec";

export default function ReclamationMain(props) {
    const [searchURL, setSearchURL] = useState<string>('');
    const [myURL, setMyURL] = useState<string>('')


    const [vin, setVin] = useState('');
    const [isFiltered, setIsFiltered] = useState(false);
    const [allRec, setAllRec] = useState<any>(null);
    const [filteredTo, setFilteredTo] = useState(null);

    const [rejection, setRejection] = useState<any>([])
    const [recovery, setRecovery] = useState<any>([])
    const [autos, setAutos] = useState<any>([])
    const [company, setCompany] = useState<any>([])

    const [rejectionMod, setRejectionMod] = useState<any>('')
    const [toggleRejection, setToggleRejection] = useState<boolean>(false)
    const [toggleRejectionTwo, setToggleRejectionTwo] = useState(false)

    const [recoveryMod, setRecoveryMod] = useState<any>('')
    const [toggleRecovery, setToggleRecovery] = useState<boolean>(false)
    const [toggleRecoveryTwo, setToggleRecoveryTwo] = useState(false)


    const [companyMod, setCompanyMod] = useState<any>('')
    const [toggleCompany, setToggleCompany] = useState<boolean>(false)
    const [toggleCompanyTwo, setToggleCompanyTwo] = useState(false)


    const [isReady, setIsReady] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const navigate = useNavigate();
    const [addRec, setAddRec] = useState<boolean>(false)

    const [hasPerm, setHasPerm] = useState(false)

    useEffect(() => {
        if (props.groupName) {
            if (props.groupName === 'client') {
                console.log('client')
                setHasPerm(false)
            } else if (props.groupName === 'manager' || props.groupName === 'organization') {
                console.log('manOrOrgan')
                setHasPerm(true)
            }
        }
    }, [])

    useEffect(() => {
        console.log(isReady)
        if (isReady) {
            const token = JSON.parse(localStorage.getItem('token'))
            if (token.access) {
                console.log(isReady)
                if (!rejection.length) {
                    fetch(props.defaultURL + 'car/rejection', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token.access}`
                        },
                    })
                        .then(async res => {
                            return await res.json();
                        })
                        .then(data => {
                            console.log(data)
                            setRejection(data.rejection);

                        })
                        .catch(err =>
                            console.log(err))
                }
                if (!recovery.length) {
                    fetch(props.defaultURL + 'car/recovery', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token.access}`
                        },
                    })
                        .then(async res => {
                            return await res.json();
                        })
                        .then(data => {
                            console.log(data)
                            setRecovery(data.recovery);

                        })
                        .catch(err =>
                            console.log(err))
                }
                if (!autos.length) {
                    console.log('auto')
                    fetch(props.defaultURL + 'car/user', {
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
                            setAutos(data);

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

    const dropPassword = () => {
        localStorage.setItem('token', JSON.stringify(''))
        navigate('/auth', {replace: true})
        navigate(0)
    }
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'))
        if (token.access) {
            console.log(token.access)
            fetch(props.defaultURL + 'rec/client', {
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
                        CompanyOrManager(token.access)
                    } else {
                        console.log(res)
                        setAllRec(await res.json());
                        setSearchURL('rec/client')
                        setIsReady(true)
                    }
                })

                .catch(err =>
                    console.log(err))
        }
    }, [])

    const CompanyOrManager = (access) => {
        fetch(props.defaultURL + 'rec', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
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
                    setAllRec(await res.json());
                    setSearchURL('rec');
                    setIsReady(true)
                }
            })

            .catch(err =>
                console.log(err))
    }
    const btn = () => {
        if (rejectionMod && recoveryMod) {
            setMyURL(`nodeOfRejection__exact=${rejectionMod}&recovery__exact=${recoveryMod}&`)
        } else if (rejectionMod) {
            setMyURL(`nodeOfRejection=${rejectionMod}&`)
        } else if (recoveryMod) {
            setMyURL(`recovery=${recoveryMod}&`)
        }
        console.log(JSON.parse(localStorage.getItem('token')))
        const token = JSON.parse(localStorage.getItem('token'))
        if (token.access) {
            console.log('auth')
            fetch(`${props.defaultURL}${searchURL}/?${myURL}serviceCompany__in=${companyMod}`,
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
                        setFilteredTo(await res.json());
                    }
                })

                .catch(err =>
                    console.log(err))
            setIsFiltered(true)
        }
    }

    const normalizeNumber = (value) => {
        return value.replace(/\s/g, "").match(/.{1,2}/g)?.join(" ") || ""
    }
    const myRejectionToggleFunc = (target) => {
        const rejectionId = rejection.find(rejection => rejection.name === target.textContent).id
        setRejectionMod(rejectionId)
    }

    const myRecoveryToggleFunc = (target) => {
        const recoveryId = recovery.find(recovery => recovery.name === target.textContent).id
        setRecoveryMod(recoveryId)
    }
    const myCompanyToggleFunc = (target) => {
        const companyId = company.find(company => company.name === target.textContent).id
        setCompanyMod(companyId)
    }

    const myEngineFunc = (target) => {
        switch (target.name) {
            case 'rejection':
                setRejectionMod('')
                if (/./.test(target.value.replace(/\s/g, ""))) {
                    setRejectionMod('')
                }
                break;
            case 'recovery':
                setRecoveryMod('')
                if (/./.test(target.value.replace(/\s/g, ""))) {
                    setRecoveryMod('')
                }
                break;
            case 'company':
                setCompanyMod('')
                if (/./.test(target.value.replace(/\s/g, ""))) {
                    setCompanyMod('')
                }
                break;

        }
    }

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'))
        if (token.access) {
            setIsAuthenticated(true)
        }
    }, [])
    return (
        <>
            <div className={'carSearchMain add'}>
                {isAuthenticated ? <h3 className={'myH'}>Рекламации</h3> :
                    <h3 className={'myH'}>Рекламации</h3>}
                <Outlet/>
                <div className={'inAndBtn'}>
                    {/*<input className={'vinInput'}*/}
                    {/*       name={'vin'}*/}
                    {/*       autoComplete={'off'}*/}
                    {/*       onChange={event => {*/}
                    {/*           const {value} = event.target*/}
                    {/*           event.target.value = normalizeNumber(value)*/}


                    {/*           setVin(event.target.value)*/}
                    {/*           console.log(event.target)*/}
                    {/*       }}*/}
                    {/*       maxLength={15}*/}
                    {/*       placeholder={'Зав. № машины'}*/}

                    {/*/>*/}

                    <div className={'myRelative'}>
                        <input className={'vinInput'}
                               name={'rejection'}
                            // disabled={true}
                               value={rejectionMod}
                               onChange={event => {

                                   myEngineFunc(event.target)
                               }}
                               placeholder={'Узел отказа'}
                               onClick={e => {
                                   setToggleRejection(!toggleRejection)

                                   setToggleRecovery(false)
                                   setToggleCompany(false)
                               }}
                               onBlur={event => {
                                   setToggleRejection(false)
                               }}
                        />

                        {(toggleRejection || toggleRejectionTwo) && (
                            <ul onClick={event => {
                                myRejectionToggleFunc(event.target)

                            }}
                                onMouseOver={event => {
                                    setToggleRejectionTwo(true)
                                }}
                                tabIndex={-1}
                                onMouseLeave={event => {
                                    setToggleRejectionTwo(false)
                                }}
                                className={"searchUl"}

                            >
                                {rejection.length ? rejection.map((el, i) =>
                                    <li key={el.id}>{el.name}</li>
                                ) : ''}
                            </ul>
                        )}
                    </div>
                    <div className={'myRelative'}>
                        <input className={'vinInput'}
                               name={'recovery'}
                            // disabled={true}
                               value={recoveryMod}
                               onChange={event => {

                                   myEngineFunc(event.target)
                               }}
                               placeholder={'Способ восстановления'}
                               onClick={e => {
                                   setToggleRecovery(!toggleRecovery)

                                   setToggleRejection(false)
                                   setToggleCompany(false)
                               }}
                               onBlur={event => {
                                   setToggleRecovery(false)
                               }}
                        />

                        {(toggleRecovery || toggleRecoveryTwo) && (
                            <ul onClick={event => {
                                myRecoveryToggleFunc(event.target)

                            }}
                                onMouseOver={event => {
                                    setToggleRecoveryTwo(true)
                                }}
                                tabIndex={-1}
                                onMouseLeave={event => {
                                    setToggleRecoveryTwo(false)
                                }}
                                className={"searchUl"}

                            >
                                {recovery.length ? recovery.map((el, i) =>
                                    <li key={el.id}>{el.name}</li>
                                ) : ''}
                            </ul>
                        )}
                    </div>
                    <div className={'myRelative'}>
                        <input className={'vinInput'}
                               name={'company'}
                            // disabled={true}
                               value={companyMod}
                               onChange={event => {

                                   myEngineFunc(event.target)
                               }}
                               placeholder={'Сервисная компания'}
                               onClick={e => {
                                   setToggleCompany(!toggleCompany)
                                   setToggleRejection(false)
                                   setToggleRecovery(false)
                               }}
                               onBlur={event => {
                                   setToggleCompany(false)

                               }}
                        />

                        {(toggleCompany || toggleCompanyTwo) && (
                            <ul onClick={event => {
                                myCompanyToggleFunc(event.target)
                            }}
                                onMouseOver={event => {
                                    setToggleCompanyTwo(true)
                                }}
                                tabIndex={-1}
                                onMouseLeave={event => {
                                    setToggleCompanyTwo(false)
                                }}
                                className={"searchUl"}>
                                {company ? company.map((el, i) =>
                                    <li key={el.id}>{el.name}</li>
                                ) : ''}
                            </ul>
                        )}
                    </div>
                    <button onClick={e => {
                        (vin || rejectionMod || recoveryMod || companyMod)
                            ? btn() : setIsFiltered(false)
                    }} className={'btnVin'}>Поиск
                    </button>
                </div>
                {hasPerm && (
                    <div>
                        <button className={'btnAddCar'}
                                onClick={e => {
                                    setAddRec(!addRec)
                                }}>Добавить новую рекламацию
                        </button>
                        {addRec && (
                            <>
                                <h3 className={'myH'}>Добавить рекламацию:</h3>
                                <CreateRec defaultURL={props.defaultURL}
                                />
                            </>
                        )}

                    </div>
                )}

                <h3 className={'myH'}>Результат поиска:</h3>
                <div className={'textInCarSearch'}>
                    <span>Информация о жалобах</span>
                    {/*<span>характеристиках техники</span>*/}
                </div>
            </div>
            {
                (isFiltered && (autos.length >= 1) && (rejection.length >= 1) && (recovery.length >= 1) && (company.length >= 1) && filteredTo) ? (
                    <Rec allRec={filteredTo}
                         autos={autos}
                         rejection={rejection}
                         recovery={recovery}
                         company={company}
                         groupName={props.groupName}

                    />
                ) : (allRec && (autos.length >= 1) && (rejection.length >= 1) && (recovery.length >= 1) && (company.length >= 1)) ? (
                    <Rec allRec={allRec}
                         autos={autos}
                         rejection={rejection}
                         recovery={recovery}
                         company={company}
                         groupName={props.groupName}
                    />
                ) : ''
            }
        </>
    )
}
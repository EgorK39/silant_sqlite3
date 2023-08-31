import * as React from 'react';
import '../../styles/CarSearch.scss';
import {useState, useEffect} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import Tos from "./Tos";
import CarCreate from "../ForManager/CarCreate";
import CreateTo from "./CreateTo";

export default function ToMain(props) {
    const [vin, setVin] = useState('');
    const [isFiltered, setIsFiltered] = useState(false);
    const [allTo, setAllTo] = useState<any>(null);
    const [filteredTo, setFilteredTo] = useState(null);

    const [type, setType] = useState<any>([])
    const [autos, setAutos] = useState<any>([])
    const [company, setCompany] = useState<any>([])

    const [typeMod, setTypeMod] = useState<any>('')
    const [toggleType, setToggleType] = useState<boolean>(false)
    const [toggleTypeTwo, setToggleTypeTwo] = useState(false)


    const [whoMod, setWhoMod] = useState<any>('')
    const [toggleWho, setToggleWho] = useState<boolean>(false)
    const [toggleWhoTwo, setToggleWhoTwo] = useState(false)


    const [companyMod, setCompanyMod] = useState<any>('')
    const [toggleCompany, setToggleCompany] = useState<boolean>(false)
    const [toggleCompanyTwo, setToggleCompanyTwo] = useState(false)


    const [isReady, setIsReady] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)


    const [addTo, setAddTo] = useState<boolean>(false)
    const navigate = useNavigate();

    useEffect(() => {
        console.log(isReady)
        if (isReady) {
            const token = JSON.parse(localStorage.getItem('token'))
            if (token.access) {
                console.log(isReady)
                if (!type.length) {
                    fetch(props.defaultURL + 'to/type', {
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
                            setType(data.type);

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
            fetch(props.defaultURL + 'to', {
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
                        setAllTo(await res.json());
                        setIsReady(true)
                    }
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
            fetch(`${props.defaultURL}to/?to__in=${typeMod}&car__vin__iendswith=${vin}&whoMakeTo__in=${whoMod}&whoMakeTo__name__icontains=&serviceCompany__in=${companyMod}&serviceCompany__name__icontains=`,
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
    const myTypeToggleFunc = (target) => {
        const typeId = type.find(type => type.name === target.textContent).id
        setTypeMod(typeId)
    }
    const myWhoToggleFunc = (target) => {
        const companyId = company.find(company => company.name === target.textContent).id
        setWhoMod(companyId)
    }
    const myCompanyToggleFunc = (target) => {
        const companyId = company.find(company => company.name === target.textContent).id
        setCompanyMod(companyId)
    }

    const myEngineFunc = (target) => {
        switch (target.name) {
            case 'typeTo':
                setTypeMod('')
                if (/./.test(target.value.replace(/\s/g, ""))) {
                    setTypeMod('')
                }
                break;
            case 'who':
                setWhoMod('')
                if (/./.test(target.value.replace(/\s/g, ""))) {
                    setWhoMod('')
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
                {isAuthenticated ? <h3 className={'myH'}>Информация о проведенных ТО Вашей техники</h3> :
                    <h3 className={'myH'}>Информация о проведенных ТО</h3>}
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
                               name={'typeTo'}
                            // disabled={true}
                               value={typeMod}
                               onChange={event => {

                                   myEngineFunc(event.target)
                               }}
                               placeholder={'Вид ТО'}
                               onClick={e => {
                                   setToggleType(!toggleType)
                                   setToggleWho(false)
                                   setToggleCompany(false)
                               }}
                               onBlur={event => {
                                   setToggleType(false)
                               }}
                        />

                        {(toggleType || toggleTypeTwo) && (
                            <ul onClick={event => {
                                myTypeToggleFunc(event.target)

                            }}
                                onMouseOver={event => {
                                    setToggleTypeTwo(true)
                                }}
                                tabIndex={-1}
                                onMouseLeave={event => {
                                    setToggleTypeTwo(false)
                                }}
                                className={"searchUl"}

                            >
                                {type.length ? type.map((el, i) =>
                                    <li key={el.id}>{el.name}</li>
                                ) : ''}
                            </ul>
                        )}
                    </div>
                    <div className={'myRelative'}>
                        <input className={'vinInput'}
                               name={'who'}
                               value={whoMod}
                               onChange={event => {

                                   myEngineFunc(event.target)
                               }}
                               placeholder={'Организация, проводившая ТО'}
                               onClick={e => {
                                   setToggleWho(!toggleWho)
                                   setToggleType(false)
                                   setToggleCompany(false)
                               }}
                               onBlur={event => {
                                   setToggleWho(false)

                               }}
                        />
                        {(toggleWho || toggleWhoTwo) && (
                            <ul onClick={event => {
                                myWhoToggleFunc(event.target)
                            }}
                                onMouseOver={event => {
                                    setToggleWhoTwo(true)
                                }}
                                tabIndex={-1}
                                onMouseLeave={event => {
                                    setToggleWhoTwo(false)
                                }}
                                className={"searchUl"}>
                                {company ? company.map((el, i) =>
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
                                   setToggleWho(false)
                                   setToggleType(false)
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
                        (vin || typeMod || whoMod || companyMod)
                            ? btn() : setIsFiltered(false)
                    }} className={'btnVin'}>Поиск
                    </button>
                </div>
                <div>
                    <button className={'btnAddCar'}
                            onClick={e => {
                                setAddTo(!addTo)
                            }}>Добавить новое ТО
                    </button>
                    {addTo && (
                        <>
                            <h3 className={'myH'}>Добавить TO:</h3>
                            <CreateTo defaultURL={props.defaultURL}
                            />
                        </>
                    )}

                </div>
                <h3 className={'myH'}>Результат поиска:</h3>
                <div className={'textInCarSearch'}>
                    <span>Информация о проведенных ТО Вашей техники</span>
                    {/*<span>характеристиках техники</span>*/}
                </div>
            </div>
            {
                (isFiltered && (autos.length > 1) && (type.length > 1) && (company.length > 1) && filteredTo) ? (
                    <Tos allTo={filteredTo}
                         autos={autos}
                         type={type}
                         company={company}
                    />
                ) : (allTo && (autos.length > 1) && (type.length > 1) && (company.length > 1)) ? (
                    <Tos allTo={allTo}
                         autos={autos}
                         type={type}
                         company={company}
                    />
                ) : ''
            }
        </>
    )
}
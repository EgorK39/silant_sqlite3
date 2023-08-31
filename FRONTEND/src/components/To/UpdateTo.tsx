import * as React from 'react';
import '../../styles/CarEdit.scss';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';

export default function UpdateTo(props) {
    const [to, setTo] = useState(null);

    const [isReady, setIsReady] = useState(false)

    const [type, setType] = useState<any>([])
    const [company, setCompany] = useState<any>([])
    const [autos, setAutos] = useState<any>([])


    const [typeMod, setTypeMod] = useState<any>('')
    const [toggleType, setToggleType] = useState<boolean>(false)
    const [toggleTypeTwo, setToggleTypeTwo] = useState(false)


    const [autosMod, setAutosMod] = useState<any>('')
    const [toggleAutos, setToggleAutos] = useState<boolean>(false)
    const [toggleAutosTwo, setToggleAutosTwo] = useState(false)

    const [whoMod, setWhoMod] = useState<any>('')
    const [toggleWho, setToggleWho] = useState<boolean>(false)
    const [toggleWhoTwo, setToggleWhoTwo] = useState(false)


    const [companyMod, setCompanyMod] = useState<any>('')
    const [toggleCompany, setToggleCompany] = useState<boolean>(false)
    const [toggleCompanyTwo, setToggleCompanyTwo] = useState(false)

    const [dateOfToMod, setDateOfToMod] = useState<any>('')
    const [workMod, setWorkMod] = useState<any>('')
    const [orderMod, setOrderMod] = useState<any>('')
    const [dateOfOrderMod, setDateOfOrderMod] = useState<any>('')

    const {id} = useParams();
    const navigate = useNavigate();
    const [isManager, setIsManager] = useState<boolean>(false)


    // TODO

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

    // TODO
    const dropPassword = () => {
        localStorage.setItem('token', JSON.stringify(''))
        navigate('/auth', {replace: true})
        navigate(0)
    }
    useEffect(() => {
        if (props.groupName) {
            if (props.groupName === 'manager') {
                setIsManager(true)
            }
        }
    }, [])

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'))
        if (token.access) {
            console.log('auth')
            fetch(`${props.defaultURL}to/${id}`,
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
                        return await res.json();
                    }
                })
                .then(data => {
                    setTo(data)
                    setIsReady(true)

                })

                .catch(err =>
                    console.log(err))
        }
    }, [])


    const myTypeToggleFunc = (target) => {
        const typeId = type.find(type => type.name === target.textContent).id
        setTypeMod(typeId)
    }
    const myAutosToggleFunc = (target) => {
        const autosId = autos.find(autos => autos.name === target.textContent).id
        setAutosMod(autosId)
    }
    const myCompanyToggleFunc = (target) => {
        const companyId = company.find(company => company.name === target.textContent).id
        setCompanyMod(companyId)
    }

    const myWhoToggleFunc = (target) => {
        const whoId = company.find(company => company.name === target.textContent).id
        setWhoMod(whoId)
    }

    // TODO

    // const normalizeNumber = (value) => {
    //     return value.replace(/\s/g, "")
    // }
    const myNormFunc = (target) => {
        switch (target.name) {
            case 'work':
                setWorkMod(target.value)
                if (target.value.length < 1) {
                    setWorkMod('')
                }
                break;
            case 'order':
                setOrderMod(target.value)
                if (target.value.length < 1) {
                    setOrderMod('')
                }
                break;
            case 'companyMod':
                setCompanyMod(target.value)
                if (target.value.length < 1) {
                    setCompanyMod('')
                }
                break;


        }
    }

    const sendReq = () => {
        let typeMod2 = typeMod ? typeMod : to.to;
        let dateOfToMod2 = dateOfToMod ? dateOfToMod : to.dateOfTo;
        let workMod2 = workMod ? workMod : to.work;
        let orderMod2 = orderMod ? orderMod : to.order;
        let dateOfOrderMod2 = dateOfOrderMod ? dateOfOrderMod : to.dateOfOrder;
        let whoMod2 = whoMod ? whoMod : to.whoMakeTo;
        // let autosMod2 = autosMod ? autosMod : to.car;
        // let companyMod2 = companyMod ? companyMod : to.serviceCompany;


        const token = JSON.parse(localStorage.getItem('token'))
        if (token.access) {
            console.log('auth')
            fetch(`${props.defaultURL}to/${id}/`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token.access}`
                    },
                    body: JSON.stringify({
                        'to': typeMod2,
                        'dateOfTo': dateOfToMod2,
                        'work': workMod2,
                        'order': orderMod2,
                        'dateOfOrder': dateOfOrderMod2,
                        'whoMakeTo': whoMod2,
                        'car': to.car,
                        'serviceCompany': to.serviceCompany,

                    })
                })
                .then(async res => {
                    if (res.status != 200) {
                        console.log(res)
                        console.log(res.status)
                        console.log(typeof res.status)
                        dropPassword()
                    } else {
                        return await res.json();
                    }
                })
                .then(data => {
                    setTo(data)
                    setIsReady(true)
                    navigate(0)

                })
                .catch(err =>
                    console.log(err))
        }
    }

    const setNullData = (target) => {
        switch (target.name) {
            case 'typeMod':
                setTypeMod('')
                if (/./.test(target.value.replace(/\s/g, ""))) {
                    setTypeMod('')
                }
                break;
            case 'whoMakeTo':
                setWhoMod('')
                if (/./.test(target.value.replace(/\s/g, ""))) {
                    setWhoMod('')
                }
                break;
            case 'car':
                setAutosMod('')
                if (/./.test(target.value.replace(/\s/g, ""))) {
                    setAutosMod('')
                }
                break;

        }
    }
    const goBack = () => navigate(-1);

    return (
        <div
            className={'carEdit'}>{(to && (type.length > 1) && (company.length > 1) && (autos.length > 1)) ? (
            <>
                <h3>Обновить информацию о ТО</h3>
                <button className={'btnVin'} onClick={e => goBack()}>Назад</button>
                <div className={'myMainEdit'}>
                    <div className={'carEditDiv'}>
                        <p>Вид ТО</p>
                        <input className={'vinInput hovered'}
                               name={'typeMod'}
                               value={typeMod ? typeMod : type.length > 1 ? type.find(
                                   type => type.id === to['to']
                               ).name : to['to']}
                               placeholder={'Вид ТО'}
                               onClick={e => {
                                   setToggleType(!toggleType)

                                   setToggleCompany(false)
                                   setToggleAutos(false)
                                   setToggleWho(false)

                               }}
                               onBlur={event => {
                                   setToggleType(false)
                               }}
                               onChange={event => {

                                   setNullData(event.target)
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
                                {type ? type.map((el, i) =>
                                    <li key={el.id}>{el.name}</li>
                                ) : ''}
                            </ul>
                        )}
                    </div>
                    <div className={'carEditDiv'}>
                        <p>Дата проведения ТО</p>
                        <input className={'vinInput'}
                               name={'dateOfTo'}
                               value={dateOfToMod ? dateOfToMod : to['dateOfTo'] ? to['dateOfTo'] : '-'}
                               autoComplete={'off'}
                               placeholder={'Дата проведения ТО'}
                               maxLength={25}
                               onChange={event => {
                                   setDateOfToMod(event.target.value)
                               }}
                               type={"date"}

                        />
                    </div>
                    <div className={'carEditDiv'}>
                        <p>Наработка, м/час</p>
                        <input className={'vinInput'}
                               name={'work'}
                               value={workMod ? workMod : to['work'] ? to['work'] : '-'}
                               autoComplete={'off'}
                               placeholder={'Наработка, м/час'}
                               maxLength={5}
                               onChange={event => {
                                   myNormFunc(event.target)
                                   // setVinMod(event.target.value)
                               }}

                        />
                    </div>
                    <div className={'carEditDiv'}>
                        <p>№ заказ-наряда</p>
                        <input className={'vinInput'}
                               name={'order'}
                               value={orderMod ? orderMod : to['order'] ? to['order'] : '-'}
                               autoComplete={'off'}
                               placeholder={'№ заказ-наряда'}
                               maxLength={25}
                               onChange={event => {
                                   myNormFunc(event.target)
                                   // setVinMod(event.target.value)
                               }}

                        />
                    </div>
                    <div className={'carEditDiv'}>
                        <p>Дата заказ-наряда</p>
                        <input className={'vinInput'}
                               name={'dateOfOrder'}
                               value={dateOfOrderMod ? dateOfOrderMod : to['dateOfOrder'] ? to['dateOfOrder'] : '-'}
                               autoComplete={'off'}
                               placeholder={'Дата заказ-наряда'}
                               maxLength={25}
                               onChange={event => {
                                   setDateOfOrderMod(event.target.value)
                               }}
                               type={"date"}

                        />
                    </div>

                    <div className={'carEditDiv'}>
                        <p>Организация, проводившая ТО</p>
                        <input className={'vinInput hovered'}
                               name={'whoMakeTo'}
                               value={whoMod ? whoMod : company.length > 1 ? company.find(
                                   company => company.id === to['whoMakeTo']
                               ).name : to['whoMakeTo']}
                               placeholder={'Организация, проводившая ТО'}
                               onClick={e => {
                                   setToggleWho(!toggleWho)

                                   setToggleCompany(false)
                                   setToggleAutos(false)
                                   setToggleType(false)

                               }}
                               onBlur={event => {
                                   setToggleWho(false)
                               }}
                               onChange={event => {

                                   setNullData(event.target)
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
                                className={"searchUl"}

                            >
                                {company ? company.map((el, i) =>
                                    <li key={el.id}>{el.name}</li>
                                ) : ''}
                            </ul>
                        )}
                    </div>
                    {isManager ? (
                            <>
                                <div className={'carEditDiv'}>
                                    <p>Машина</p>
                                    <input className={'vinInput hovered'}
                                           name={'car'}
                                           value={autosMod ? autosMod : autos.length > 1 ? autos.find(
                                               autos => autos.id === to['car']
                                           ).vin : to['car']}
                                           placeholder={'Машина'}
                                           onClick={e => {
                                               setToggleAutos(!toggleAutos)

                                               setToggleCompany(false)
                                               setToggleWho(false)
                                               setToggleType(false)

                                           }}
                                           onBlur={event => {
                                               setToggleAutos(false)
                                           }}
                                           onChange={event => {

                                               setNullData(event.target)
                                           }}

                                    />
                                    {(toggleAutos || toggleAutosTwo) && (
                                        <ul onClick={event => {
                                            myAutosToggleFunc(event.target)

                                        }}
                                            onMouseOver={event => {
                                                setToggleAutosTwo(true)
                                            }}
                                            tabIndex={-1}
                                            onMouseLeave={event => {
                                                setToggleAutosTwo(false)
                                            }}
                                            className={"searchUl"}>
                                            {autos ? autos.map((el, i) =>
                                                <li key={el.id}>{el.vin}</li>
                                            ) : ''}
                                        </ul>
                                    )}
                                </div>
                                <div className={'carEditDiv'}>
                                    <p>Сервисная компания</p>
                                    <input className={'vinInput hovered'}
                                           name={'companyMod'}
                                           value={companyMod ? companyMod : company.length > 1 ? company.find(
                                               company => company.id === to['serviceCompany']
                                           ).name : to['serviceCompany']}
                                           placeholder={'Сервисная компания'}
                                           onClick={e => {
                                               setToggleCompany(!toggleCompany)

                                               setToggleWho(false)
                                               setToggleAutos(false)
                                               setToggleType(false)

                                           }}
                                           onBlur={event => {
                                               setToggleCompany(false)
                                           }}
                                           onChange={event => {

                                               setNullData(event.target)
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
                                            className={"searchUl"}

                                        >
                                            {company ? company.map((el, i) =>
                                                <li key={el.id}>{el.name}</li>
                                            ) : ''}
                                        </ul>
                                    )}
                                </div>
                            </>
                        ) :
                        <>
                            <div className={'carEditDiv'}>
                                <p>Машина</p>
                                <input className={'vinInput hovered'}
                                       name={'car'}
                                       value={autosMod ? autosMod : autos.length > 1 ? autos.find(
                                           autos => autos.id === to['car']
                                       ).vin : to['car']}
                                       placeholder={'Машина'}
                                       readOnly={true}

                                />

                            </div>
                            <div className={'carEditDiv'}>
                                <p>Сервисная компания</p>
                                <input className={'vinInput hovered'}
                                       name={'companyMod'}
                                       value={companyMod ? companyMod : company.length > 1 ? company.find(
                                           company => company.id === to['serviceCompany']
                                       ).name : to['serviceCompany']}
                                       placeholder={'Сервисная компания'}
                                       readOnly={true}
                                />

                            </div>
                        </>
                    }


                </div>
                <button onClick={e => {
                    sendReq()
                }} className={'btnVin'}>Сохранить изменения
                </button>

            </>
        ) : ''}

        </div>
    )
}
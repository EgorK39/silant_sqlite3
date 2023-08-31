import * as React from 'react';
import '../../styles/CarEdit.scss';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';

export default function CreateTo(props) {
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
        if (typeMod && autosMod && whoMod && dateOfToMod &&
            workMod && orderMod && dateOfOrderMod) {
            setIsReady(true)
        } else {
            setIsReady(false)
        }
    }, [typeMod, autosMod, whoMod, dateOfToMod,
        workMod, orderMod, dateOfOrderMod
    ])


    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            if (token.access) {
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

                // todo
                if (!autos.length) {
                    console.log('auto')
                    fetch(props.defaultURL + 'cars', {
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
                                checkCar()
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
                const checkCar = () => {
                    console.log('auto')
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
    }, [])

    // TODO
    const dropPassword = () => {
        localStorage.setItem('token', JSON.stringify(''))
        navigate('/auth', {replace: true})
        navigate(0)
    }


    const myTypeToggleFunc = (target) => {
        const typeId = type.find(type => type.name === target.textContent).id
        setTypeMod(typeId)
    }
    const myAutosToggleFunc = (target) => {
        const autosId = autos.find(autos => autos.vin === target.textContent).id
        setAutosMod(autosId)
    }
    // const myCompanyToggleFunc = (target) => {
    //     const companyId = company.find(company => company.name === target.textContent).id
    //     setCompanyMod(companyId)
    // }

    const myWhoToggleFunc = (target) => {
        const whoId = company.find(company => company.name === target.textContent).id
        setWhoMod(whoId)
    }

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

    const sendReq = () => {
        // let typeMod2 = typeMod ? typeMod : to.to;
        // let dateOfToMod2 = dateOfToMod ? dateOfToMod : to.dateOfTo;
        // let workMod2 = workMod ? workMod : to.work;
        // let orderMod2 = orderMod ? orderMod : to.order;
        // let dateOfOrderMod2 = dateOfOrderMod ? dateOfOrderMod : to.dateOfOrder;
        // let whoMod2 = whoMod ? whoMod : to.whoMakeTo;
        // let autosMod2 = autosMod ? autosMod : to.car;
        // let companyMod2 = companyMod ? companyMod : to.serviceCompany;


        const token = JSON.parse(localStorage.getItem('token'))
        if (token.access) {
            console.log('auth')
            fetch(`${props.defaultURL}to/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token.access}`
                    },
                    body: JSON.stringify({
                        'to': typeMod,
                        'dateOfTo': dateOfToMod,
                        'work': workMod,
                        'order': orderMod,
                        'dateOfOrder': dateOfOrderMod,
                        'whoMakeTo': whoMod,
                        'car': autosMod,
                        // 'serviceCompany': to.serviceCompany,
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
                    setTo(data)
                    // navigate('/manager')
                    console.log(data)
                    navigate('/to')

                })
                .catch(err =>
                    console.log(err))
        }
    }

    const goBack = () => navigate(-1);

    const [today, setToday] = useState<string>('')
    const [dateErrorDateOfTo, setDateErrorDateOfTo] = useState<string>('')
    const [dateErrorDateOfOrder, setDateErrorDateOfOrder] = useState<string>('')


    useEffect(() => {
        setToday(new Date().toISOString().substring(0, 10))
    }, [])
    const changeDate = (target) => {
        switch (target.name) {
            case 'dateOfTo':
                if (Date.parse(target.value) > Date.parse(today)) {
                    setDateErrorDateOfTo('Введите корректные данные')
                    setDateOfToMod('')
                } else {
                    setDateOfToMod(target.value)
                    setDateErrorDateOfTo('')
                }
                break;
            case 'dateOfOrder':
                if (Date.parse(target.value) > Date.parse(today)) {
                    setDateErrorDateOfOrder('Введите корректные данные')
                    setDateOfOrderMod('')
                } else {
                    setDateOfOrderMod(target.value)
                    setDateErrorDateOfOrder('')
                }
                break;
        }
    }

    return (
        <>
            <div
                className={'carEdit'}>{(type && company && autos) ? (
                <>
                    <h3>Создать ТО</h3>
                    <button className={'btnVin'} onClick={e => goBack()}>Назад</button>
                    <div className={'myMainEdit'}>
                        <div className={'carEditDiv'}>
                            <p>Вид ТО</p>
                            <input className={'vinInput hovered'}
                                   name={'typeMod'}
                                   value={typeMod}
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
                                   value={dateOfToMod}
                                   autoComplete={'off'}
                                   placeholder={'Дата проведения ТО'}
                                   maxLength={25}
                                   onChange={event => {
                                       // setDateOfToMod(event.target.value)
                                       changeDate(event.target)
                                   }}
                                   type={"date"}

                            />
                            {dateErrorDateOfTo && (
                                <p className={'errorP'}>{dateErrorDateOfTo}</p>
                            )}
                        </div>
                        <div className={'carEditDiv'}>
                            <p>Наработка, м/час</p>
                            <input className={'vinInput'}
                                   name={'work'}
                                   value={workMod}
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
                                   value={orderMod}
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
                                   value={dateOfOrderMod}
                                   autoComplete={'off'}
                                   placeholder={'Дата заказ-наряда'}
                                   maxLength={25}
                                   onChange={event => {
                                       // setDateOfOrderMod(event.target.value)
                                       changeDate(event.target)
                                   }}
                                   type={"date"}

                            />
                            {dateErrorDateOfOrder && (
                                <p className={'errorP'}>{dateErrorDateOfOrder}</p>
                            )}
                        </div>
                        <div className={'carEditDiv'}>
                            <p>Организация, проводившая ТО</p>
                            <input className={'vinInput hovered'}
                                   name={'whoMakeTo'}
                                   value={whoMod}
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

                        <div className={'carEditDiv'}>
                            <p>Машина</p>
                            <input className={'vinInput hovered'}
                                   name={'car'}
                                   value={autosMod}
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


                    </div>
                    <button
                        onClick={e => {
                            sendReq()
                        }}
                        className={'btnVin'}
                        disabled={!isReady}
                    >Добавить машину
                    </button>

                </>
            ) : ''}

            </div>
        </>
    )
}
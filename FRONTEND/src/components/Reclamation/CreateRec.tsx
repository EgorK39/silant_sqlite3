import * as React from 'react';
import '../../styles/CarEdit.scss';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';

export default function CreateRec(props) {
    const [rec, setRec] = useState(null);

    const [isReady, setIsReady] = useState(false)
    const [isCompany, setIsCompany] = useState<boolean>(false)

    const [rejection, setRejection] = useState<any>([])
    const [recovery, setRecovery] = useState<any>([])
    const [company, setCompany] = useState<any>([])
    const [autos, setAutos] = useState<any>([])


    const [dateOfRejectionMod, setDateOfRejectionMod] = useState<any>('')
    const [workMod, setWorkMod] = useState<any>('')
    const [descriptionMod, setDescriptionMod] = useState<any>('')
    const [sparePartsMod, setSparePartsMod] = useState<any>('')
    const [dateOfRestorationMod, setDateOfRestoration] = useState<any>('')
    const [downtimeMod, setDowntime] = useState<any>('')


    const [rejectionMod, setRejectionMod] = useState<any>('')
    const [toggleRejection, setToggleRejection] = useState<boolean>(false)
    const [toggleRejectionTwo, setToggleRejectionTwo] = useState(false)

    const [recoveryMod, setRecoveryMod] = useState<any>('')
    const [toggleRecovery, setToggleRecovery] = useState<boolean>(false)
    const [toggleRecoveryTwo, setToggleRecoveryTwo] = useState(false)

    const [autosMod, setAutosMod] = useState<any>('')
    const [toggleAutos, setToggleAutos] = useState<boolean>(false)
    const [toggleAutosTwo, setToggleAutosTwo] = useState(false)

    const [companyMod, setCompanyMod] = useState<any>('')
    const [toggleCompany, setToggleCompany] = useState<boolean>(false)
    const [toggleCompanyTwo, setToggleCompanyTwo] = useState(false)


    const {id} = useParams();
    const navigate = useNavigate();
    const [isClient, setIsClient] = useState<boolean>(false)
    const [clientURL, setClientURL] = useState<string>('')


    // TODO

    useEffect(() => {
        if (dateOfRejectionMod && workMod && descriptionMod && sparePartsMod &&
            dateOfRestorationMod && downtimeMod && rejectionMod &&
            recoveryMod && autosMod) {
            setIsReady(true)
        } else {
            setIsReady(false)
        }
    }, [dateOfRejectionMod, workMod, descriptionMod, sparePartsMod,
        dateOfRestorationMod, downtimeMod, rejectionMod,
        recoveryMod, autosMod
    ])


    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            if (token.access) {
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
    const myCarToggleFunc = (target) => {
        const carId = autos.find(autos => autos.vin === target.textContent).id
        setAutosMod(carId)
    }

    const myNormFunc = (target) => {
        switch (target.name) {
            case 'work':
                setWorkMod(target.value)
                if (target.value.length < 1) {
                    setWorkMod('')
                }
                break;
            case 'description':
                setDescriptionMod(target.value)
                if (target.value.length < 1) {
                    setDescriptionMod('')
                }
                break;
            case 'spareParts':
                setSparePartsMod(target.value)
                if (target.value.length < 1) {
                    setSparePartsMod('')
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
            case 'nodeOfRejection':
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
            fetch(`${props.defaultURL}rec/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token.access}`
                    },
                    body: JSON.stringify({
                        'dateOfRejection': dateOfRejectionMod,
                        'work': workMod,
                        'nodeOfRejection': [rejectionMod],
                        'description': descriptionMod,
                        'recovery': [recoveryMod],
                        'spareParts': sparePartsMod,
                        'DateOfRestoration': dateOfRestorationMod,
                        'downtime': downtimeMod,
                        'car': autosMod,
                        // 'serviceCompany': companyMod,

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
                    setRec(data)
                    setIsReady(true)
                    navigate('/rec')

                })
                .catch(err =>
                    console.log(err))
        }
    }

    const goBack = () => navigate(-1);

    const [today, setToday] = useState<string>('')
    const [dateErrorDateOfRejection, setDateErrorDateOfRejection] = useState<string>('')
    const [dateErrorDateOfRestoration, setDateErrorDateOfRestoration] = useState<string>('')


    useEffect(() => {
        setToday(new Date().toISOString().substring(0, 10))
    }, [])
    const changeDate = (target) => {
        switch (target.name) {
            case 'dateOfRejection':
                if (Date.parse(target.value) > Date.parse(today)) {
                    setDateErrorDateOfRejection('Введите корректные данные')
                    setDateOfRejectionMod('')
                } else {
                    setDateOfRejectionMod(target.value)
                    setDateErrorDateOfRejection('')
                }
                break;
            case 'DateOfRestoration':
                if (Date.parse(target.value) > Date.parse(today)) {
                    setDateErrorDateOfRestoration('Введите корректные данные')
                    setDateOfRestoration('')
                } else {
                    setDateOfRestoration(target.value)
                    setDateErrorDateOfRestoration('')
                }
                break;
        }
    }

    return (
        <>
            <div
                className={'carEdit'}>{(rejection && recovery && company && autos) ? (
                <>
                    <h3>Обновить информацию о рекламации</h3>
                    <button className={'btnVin'} onClick={e => goBack()}>Назад</button>
                    <div className={'myMainEdit'}>
                        <div className={'carEditDiv'}>
                            <p>Дата отказа</p>
                            <input className={'vinInput'}
                                   name={'dateOfRejection'}
                                   value={dateOfRejectionMod}
                                   autoComplete={'off'}
                                   placeholder={'Дата отказа'}
                                   maxLength={25}
                                   onChange={event => {
                                       // setDateOfRejectionMod(event.target.value)
                                       changeDate(event.target)
                                   }}
                                   type={"date"}

                            />
                            {dateErrorDateOfRejection && (
                                <p className={'errorP'}>{dateErrorDateOfRejection}</p>
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
                            <p>Узел отказа</p>
                            <input className={'vinInput hovered'}
                                   name={'nodeOfRejection'}
                                   value={rejectionMod}
                                   placeholder={'Узел отказа'}
                                   onClick={e => {
                                       setToggleRejection(!toggleRejection)

                                       setToggleCompany(false)
                                       setToggleAutos(false)
                                       setToggleRecovery(false)

                                   }}
                                   onBlur={event => {
                                       setToggleRejection(false)
                                   }}
                                   onChange={event => {

                                       setNullData(event.target)
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
                                    {rejection ? rejection.map((el, i) =>
                                        <li key={el.id}>{el.name}</li>
                                    ) : ''}
                                </ul>
                            )}
                        </div>
                        <div className={'carEditDiv'}>
                            <p>Описание отказа</p>
                            <input className={'vinInput'}
                                   name={'description'}
                                   value={descriptionMod}
                                   autoComplete={'off'}
                                   placeholder={'Описание отказа'}
                                   onChange={event => {
                                       myNormFunc(event.target)
                                   }}

                            />
                        </div>
                        <div className={'carEditDiv'}>
                            <p>Способ восстановления</p>
                            <input className={'vinInput hovered'}
                                   name={'recovery'}
                                   value={recoveryMod}
                                   placeholder={'Способ восстановления'}
                                   onClick={e => {
                                       setToggleRecovery(!toggleRecovery)

                                       setToggleCompany(false)
                                       setToggleAutos(false)
                                       setToggleRejection(false)

                                   }}
                                   onBlur={event => {
                                       setToggleRecovery(false)
                                   }}
                                   onChange={event => {

                                       setNullData(event.target)
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
                                    {recovery ? recovery.map((el, i) =>
                                        <li key={el.id}>{el.name}</li>
                                    ) : ''}
                                </ul>
                            )}
                        </div>
                        <div className={'carEditDiv'}>
                            <p>Используемые запасные части</p>
                            <input className={'vinInput'}
                                   name={'spareParts'}
                                   value={sparePartsMod}
                                   autoComplete={'off'}
                                   placeholder={'Используемые запасные части'}
                                   onChange={event => {
                                       myNormFunc(event.target)
                                   }}

                            />
                        </div>
                        <div className={'carEditDiv'}>
                            <p>Дата восстановления</p>
                            <input className={'vinInput'}
                                   name={'DateOfRestoration'}
                                   value={dateOfRestorationMod}
                                   autoComplete={'off'}
                                   placeholder={'Дата восстановления'}
                                   maxLength={25}
                                   onChange={event => {
                                       // setDateOfRestoration(event.target.value)
                                       changeDate(event.target)
                                   }}
                                   type={"date"}

                            />
                            {dateErrorDateOfRestoration && (
                                <p className={'errorP'}>{dateErrorDateOfRestoration}</p>
                            )}
                        </div>
                        <div className={'carEditDiv'}>
                            <p>Время простоя техники</p>
                            <input className={'vinInput'}
                                   name={'downtime'}
                                   value={downtimeMod}
                                   autoComplete={'off'}
                                   placeholder={'Время простоя техники'}
                                   onChange={event => {
                                       setDowntime(event.target.value)
                                   }}
                            />
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
                                       setToggleRejection(false)
                                       setToggleRecovery(false)

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
                                    myCarToggleFunc(event.target)

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
                    >Добавить рекламацию
                    </button>

                </>
            ) : ''}

            </div>
        </>
    )
}
import * as React from 'react';
import '../../styles/CarEdit.scss';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';

export default function UpdateRec(props) {
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

    // TODO
    const dropPassword = () => {
        localStorage.setItem('token', JSON.stringify(''))
        navigate('/auth', {replace: true})
        navigate(0)
    }


    useEffect(() => {
        if (props.groupName) {
            if (props.groupName === 'manager') {
                setIsCompany(false)
            } else if (props.groupName === 'organization') {
                setIsCompany(true)
            }
        }
    }, [])

    useEffect(() => {
        if (props.groupName) {
            if (props.groupName === 'client') {
                console.log('client')
                setIsClient(true)
                setClientURL('rec/client/')
            } else if (props.groupName === 'manager' || props.groupName === 'organization') {
                console.log('manOrOrgan')
                setIsClient(true)
                setClientURL('rec/')
            }
        }
    }, [])

    useEffect(() => {
        if (clientURL) {
            const token = JSON.parse(localStorage.getItem('token'))
            if (token.access) {
                console.log(token.access)
                fetch(props.defaultURL + clientURL + id, {
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
                            setRec(await res.json());
                            setIsReady(true)
                        }
                    })

                    .catch(err =>
                        console.log(err))
            }
        }

    }, [clientURL])


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

    const sendReq = () => {
        let dateOfRejectionMod2 = dateOfRejectionMod ? dateOfRejectionMod : rec.dateOfRejection;
        let workMod2 = workMod ? workMod : rec.work;
        let rejectionMod2 = rejectionMod ? rejectionMod : rec.nodeOfRejection[0];
        let descriptionMod2 = descriptionMod ? descriptionMod : rec.description;
        let recoveryMod2 = recoveryMod ? recoveryMod : rec.recovery[0];
        let sparePartsMod2 = sparePartsMod ? sparePartsMod : rec.spareParts;
        let dateOfRestorationMod2 = dateOfRestorationMod ? dateOfRestorationMod : rec.DateOfRestoration;
        let downtimeMod2 = downtimeMod ? downtimeMod : rec.downtime;
        let autosMod2 = autosMod ? autosMod : rec.car;
        let companyMod2 = companyMod ? companyMod : rec.serviceCompany;


        const token = JSON.parse(localStorage.getItem('token'))
        if (token.access) {
            console.log('auth')
            fetch(`${props.defaultURL}rec/${id}/`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token.access}`
                    },
                    body: JSON.stringify({
                        'dateOfRejection': dateOfRejectionMod2,
                        'work': workMod2,
                        'nodeOfRejection': [rejectionMod2],
                        'description': descriptionMod2,
                        'recovery': [recoveryMod2],
                        'spareParts': sparePartsMod2,
                        'DateOfRestoration': dateOfRestorationMod2,
                        'downtime': downtimeMod2,
                        'car': autosMod2,
                        'serviceCompany': companyMod2,

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
                    setRec(data)
                    setIsReady(true)
                    navigate('/rec')

                })
                .catch(err =>
                    console.log(err))
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
    const goBack = () => navigate(-1);

    return (
        <div
            className={'carEdit'}>{(rec && (rejection.length > 1) && (company.length > 1) && (autos.length > 1)) ? (
            <>
                <h3>Обновить информацию о рекламации</h3>
                <button className={'btnVin'} onClick={e => goBack()}>Назад</button>
                <div className={'myMainEdit'}>
                    <div className={'carEditDiv'}>
                        <p>Дата отказа</p>
                        <input className={'vinInput'}
                               name={'dateOfRejection'}
                               value={dateOfRejectionMod ? dateOfRejectionMod : rec['dateOfRejection'] ? rec['dateOfRejection'] : '-'}
                               autoComplete={'off'}
                               placeholder={'Дата отказа'}
                               maxLength={25}
                               onChange={event => {
                                   setDateOfRejectionMod(event.target.value)
                               }}
                               type={"date"}

                        />
                    </div>
                    <div className={'carEditDiv'}>
                        <p>Наработка, м/час</p>
                        <input className={'vinInput'}
                               name={'work'}
                               value={workMod ? workMod : rec['work'] ? rec['work'] : '-'}
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
                               // value={rejectionMod ? rejectionMod : rejection.length > 1 ? rec['nodeOfRejection'].map((e, i) =>
                               //     <span key={i}>
                               //          {rejection.find(rejection => rejection.id === e).name}
                               //      </span>
                               // ) : rec['nodeOfRejection'][0]}
                               // value={recoveryMod ? recoveryMod : recovery.length > 1 ? rec['recovery'][0] : rec['recovery'][0]}
                               value={rejectionMod ? rejectionMod : rejection.length > 1 ? rejection.find(
                                   rejection => rejection.id === rec['nodeOfRejection'][0]
                               ).name : rec['nodeOfRejection'][0]}
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
                               value={descriptionMod ? descriptionMod : rec['description'] ? rec['description'] : '-'}
                               autoComplete={'off'}
                               placeholder={'Описание отказа'}
                               onChange={event => {
                                   myNormFunc(event.target)
                                   // setVinMod(event.target.value)
                               }}

                        />
                    </div>
                    <div className={'carEditDiv'}>
                        <p>Способ восстановления</p>
                        <input className={'vinInput hovered'}
                               name={'recovery'}
                               // value={recoveryMod ? recoveryMod : recovery.length > 1 ? rec['recovery'][0] : rec['recovery'][0]}
                               value={recoveryMod ? recoveryMod : rejection.length > 1 ? recovery.find(
                                   recovery => recovery.id === rec['recovery'][0]
                               ).name : rec['recovery'][0]}
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
                               value={sparePartsMod ? sparePartsMod : rec['spareParts'] ? rec['spareParts'] : '-'}
                               autoComplete={'off'}
                               placeholder={'Используемые запасные части'}
                               onChange={event => {
                                   myNormFunc(event.target)
                                   // setVinMod(event.target.value)
                               }}

                        />
                    </div>
                    <div className={'carEditDiv'}>
                        <p>Дата восстановления</p>
                        <input className={'vinInput'}
                               name={'DateOfRestoration'}
                               value={dateOfRestorationMod ? dateOfRestorationMod : rec['DateOfRestoration'] ? rec['DateOfRestoration'] : '-'}
                               autoComplete={'off'}
                               placeholder={'Дата восстановления'}
                               maxLength={25}
                               onChange={event => {
                                   setDateOfRestoration(event.target.value)
                               }}
                               type={"date"}

                        />
                    </div>
                    <div className={'carEditDiv'}>
                        <p>Время простоя техники</p>
                        <input className={'vinInput'}
                               name={'downtime'}
                               value={downtimeMod ? downtimeMod : rec['downtime'] ? rec['downtime'] : '-'}
                               autoComplete={'off'}
                               placeholder={'Время простоя техники'}
                               readOnly={true}

                        />
                    </div>
                    {isCompany ? <>
                            <div className={'carEditDiv'}>
                                <p>Машина</p>
                                <input className={'vinInput hovered'}
                                       name={'car'}
                                       value={autosMod ? autosMod : autos.length > 1 ? autos.find(
                                           autos => autos.id === rec['car']
                                       ).vin : rec['car']}
                                       placeholder={'Машина'}
                                       readOnly={true}

                                />

                            </div>
                            <div className={'carEditDiv'}>
                                <p>Сервисная компания</p>
                                <input className={'vinInput hovered'}
                                       name={'companyMod'}
                                       value={companyMod ? companyMod : company.length > 1 ? company.find(
                                           company => company.id === rec['serviceCompany']
                                       ).name : rec['serviceCompany']}
                                       placeholder={'Сервисная компания'}
                                       readOnly={true}

                                />

                            </div>
                        </> :
                        (
                            <>
                                <div className={'carEditDiv'}>
                                    <p>Машина</p>
                                    <input className={'vinInput hovered'}
                                           name={'car'}
                                           value={autosMod ? autosMod : autos.length > 1 ? autos.find(
                                               autos => autos.id === rec['car']
                                           ).vin : rec['car']}
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
                                <div className={'carEditDiv'}>
                                    <p>Сервисная компания</p>
                                    <input className={'vinInput hovered'}
                                           name={'companyMod'}
                                           value={companyMod ? companyMod : company.length > 1 ? company.find(
                                               company => company.id === rec['serviceCompany']
                                           ).name : rec['serviceCompany']}
                                           placeholder={'Сервисная компания'}
                                           onClick={e => {
                                               setToggleCompany(!toggleCompany)

                                               setToggleRejection(false)
                                               setToggleAutos(false)
                                               setToggleRecovery(false)

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
                        )

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
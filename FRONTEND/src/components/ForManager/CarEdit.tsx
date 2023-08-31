import * as React from 'react';
import '../../styles/CarEdit.scss';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';

export default function CarEdit(props) {
    const [car, setCar] = useState(null);

    const [isReady, setIsReady] = useState(false)

    const [client, setClient] = useState<any>([])
    const [company, setCompany] = useState<any>([])
    const [technic, setTechnic] = useState<any>([])
    const [engine, setEngine] = useState<any>([])
    const [transmission, setTransmission] = useState<any>([])
    const [drivingbridge, setDrivingbridge] = useState<any>([])
    const [controlledbridge, setControlledbridge] = useState<any>([])

    const [vinMod, setVinMod] = useState<any>('')
    const [engineNoMod, setEngineNoMod] = useState<any>('')
    const [transmissionNoMod, setTransmissionNoMod] = useState<any>('')
    const [drivingBridgeNoMod, setDrivingBridgeNoMod] = useState<any>('')
    const [controlledBridgeNoMod, setControlledBridgeNoMod] = useState<any>('')
    const [dateOfShipmentMod, setDateOfShipmentMod] = useState<any>('')
    const [contractMod, setContractMod] = useState<any>('')
    const [consigneeMod, setConsigneeMod] = useState<any>('')
    const [deliveryAddressMod, setDeliveryAddressMod] = useState<any>('')
    const [equipmentMod, setEquipmentMod] = useState<any>('')


    const [engineMod, setEngineMod] = useState<any>('')
    const [toggleEngine, setToggleEngin] = useState<boolean>(false)
    const [toggleEngineTwo, setToggleEnginTwo] = useState(false)


    const [technicMod, setTechnicMod] = useState<any>('')
    const [toggleTechnic, setToggleTechnic] = useState<boolean>(false)
    const [toggleTechnicTwo, setToggleTechnicTwo] = useState(false)

    const [transmissionMod, setTransmissionMod] = useState<any>('')
    const [toggleTransmission, setToggleTransmission] = useState<boolean>(false)
    const [toggleTransmissionTwo, setToggleTransmissionTwo] = useState(false)


    const [drivingbridgeMod, setdrivingbridgeMod] = useState<any>('')
    const [toggleDrivingbridge, setToggleDrivingbridge] = useState<boolean>(false)
    const [toggleDrivingbridgeTwo, setToggleDrivingbridgeTwo] = useState(false)


    const [controlledbridgeMod, setControlledbridgeMod] = useState<any>('')
    const [toggleControlledbridge, setToggleControlledbridge] = useState<boolean>(false)
    const [toggleControlledbridgeTwo, setToggleControlledbridgeTwo] = useState(false)

    const [clientMod, setClientMod] = useState<any>('')
    const [toggleClient, setToggleClient] = useState<boolean>(false)
    const [toggleClientTwo, setToggleClientTwo] = useState(false)


    const [companyMod, setCompanyMod] = useState<any>('')
    const [toggleCompany, setToggleCompany] = useState<boolean>(false)
    const [toggleCompanyTwo, setToggleCompanyTwo] = useState(false)

    const {id} = useParams();
    const navigate = useNavigate();

    // TODO

    useEffect(() => {
        console.log(isReady)
        if (isReady) {
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
        }

    }, [isReady])

    // TODO
    const dropPassword = () => {
        localStorage.setItem('token', JSON.stringify(''))
        navigate('/auth', {replace: true})
        navigate(0)
    }

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'))
        if (token.access) {
            console.log('auth')
            fetch(`${props.defaultURL}cars/${id}`,
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
                    setCar(data)
                    setIsReady(true)

                })

                .catch(err =>
                    console.log(err))
        }
    }, [])


    const myTechnicToggleFunc = (target) => {
        const technicId = technic.find(technic => technic.name === target.textContent).id
        setTechnicMod(technicId)
    }
    const myClientToggleFunc = (target) => {
        const clientId = client.find(client => client.name === target.textContent).id
        setClientMod(clientId)
    }
    const myCompanyToggleFunc = (target) => {
        const companyId = company.find(company => company.name === target.textContent).id
        setCompanyMod(companyId)
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

    // const normalizeNumber = (value) => {
    //     return value.replace(/\s/g, "")
    // }
    const myEngineFunc = (target) => {
        switch (target.name) {
            case 'vinMod':
                setVinMod(target.value)
                if (target.value.length < 1) {
                    setVinMod('')
                }
                // setVinMod(target.value.replace(/\s/g, ""))
                break;
            case 'engineNoMod':
                setEngineNoMod(target.value)
                if (target.value.length < 1) {
                    setEngineNoMod('')
                }
                // setEngineNoMod(target.value.replace(/\s/g, ""))
                break;
            case 'transmissionNoMod':
                setTransmissionNoMod(target.value)
                if (target.value.length < 1) {
                    setTransmissionNoMod('')
                }
                // setTransmissionNoMod(target.value.replace(/\s/g, ""))
                break;
            case 'drivingBridgeNoMod':
                setDrivingBridgeNoMod(target.value)
                if (target.value.length < 1) {
                    setDrivingBridgeNoMod('')
                }
                // setDrivingBridgeNoMod(target.value.replace(/\s/g, ""))
                break;
            case 'controlledBridgeNoMod':
                setControlledBridgeNoMod(target.value)
                if (target.value.length < 1) {
                    setControlledBridgeNoMod('')
                }
                // setControlledBridgeNoMod(target.value.replace(/\s/g, ""))
                break;
            case 'contractMod':
                setContractMod(target.value)
                if (target.value.length < 1) {
                    setContractMod('')
                }
                // setContractMod(target.value.replace(/\s/g, ""))
                break;
            case 'consigneeMod':
                setConsigneeMod(target.value)
                if (target.value.length < 1) {
                    setConsigneeMod('')
                }
                // setConsigneeMod(target.value.replace(/\s/g, ""))
                break;
            case 'deliveryAddressMod':
                setDeliveryAddressMod(target.value)
                if (target.value.length < 1) {
                    setDeliveryAddressMod('')
                }
                // setDeliveryAddressMod(target.value.replace(/\s/g, ""))
                break;
            case 'equipmentMod':
                setEquipmentMod(target.value)
                if (target.value.length < 1) {
                    setEquipmentMod('')
                }
                // setEquipmentMod(target.value.replace(/\s/g, ""))
                break;
        }
    }

    const sendReq = () => {
        let vinMod1 = vinMod ? vinMod : car.vin;
        let engineNoMod1 = engineNoMod ? engineNoMod : car.engineNo;
        let transmissionNoMod1 = transmissionNoMod ? transmissionNoMod : car.transmissionNo;
        let drivingBridgeNoMod1 = drivingBridgeNoMod ? drivingBridgeNoMod : car.drivingBridgeNo;
        let controlledBridgeNoMod1 = controlledBridgeNoMod ? controlledBridgeNoMod : car.controlledBridgeNo;
        let dateOfShipmentMod1 = dateOfShipmentMod ? dateOfShipmentMod : car.dateOfShipment;
        let contractMod1 = contractMod ? contractMod : car.contract;
        let consigneeMod1 = consigneeMod ? consigneeMod : car.consignee;
        let deliveryAddressMod1 = deliveryAddressMod ? deliveryAddressMod : car.deliveryAddress;
        let equipmentMod1 = equipmentMod ? equipmentMod : car.equipment;


        let engineMod1 = engineMod ? engineMod : car.engine;
        let technicMod1 = technicMod ? technicMod : car.technic;
        let transmissionMod1 = transmissionMod ? transmissionMod : car.transmission;
        let drivingbridgeMod1 = drivingbridgeMod ? drivingbridgeMod : car.drivingBridge;
        let controlledbridgeMod1 = controlledbridgeMod ? controlledbridgeMod : car.controlledBridge;
        let clientMod1 = clientMod ? clientMod : car.client;
        let companyMod1 = companyMod ? companyMod : car.serviceCompany;

        const token = JSON.parse(localStorage.getItem('token'))
        if (token.access) {
            console.log('auth')
            fetch(`${props.defaultURL}cars/${id}/`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token.access}`
                    },
                    body: JSON.stringify({
                        'vin': vinMod1,
                        'engineNo': engineNoMod1,
                        'transmissionNo': transmissionNoMod1,
                        'drivingBridgeNo': drivingBridgeNoMod1,
                        'controlledBridgeNo': controlledBridgeNoMod1,
                        'contract': contractMod1,
                        'dateOfShipment': dateOfShipmentMod1,
                        'consignee': consigneeMod1,
                        'deliveryAddress': deliveryAddressMod1,
                        'equipment': equipmentMod1,
                        'technic': technicMod1,
                        'engine': engineMod1,
                        'transmission': transmissionMod1,
                        'drivingBridge': drivingbridgeMod1,
                        'controlledBridge': controlledbridgeMod1,
                        'client': clientMod1,
                        'serviceCompany': companyMod1
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
                    setCar(data)
                    setIsReady(true)
                    navigate(0)

                })
                .catch(err =>
                    console.log(err))
        }
    }

    const setDatas = (target) => {
        switch (target.name) {
            case 'clientMod':
                setClientMod('')
                if (/./.test(target.value.replace(/\s/g, ""))) {
                    setClientMod('')
                }
                break;
            case 'companyMod':
                setCompanyMod('')
                if (/./.test(target.value.replace(/\s/g, ""))) {
                    setCompanyMod('')
                }
                break;
            case 'technicMod':
                setTechnicMod('')
                if (/./.test(target.value.replace(/\s/g, ""))) {
                    setTechnicMod('')
                }
                break;
            case 'engineMod':
                setEngineMod('')
                if (/./.test(target.value.replace(/\s/g, ""))) {
                    setEngineMod('')
                }
                break;
            case 'transmissionMod':
                setTransmissionMod('')
                if (/./.test(target.value.replace(/\s/g, ""))) {
                    setTransmissionMod('')
                }
                break;
            case 'drivingbridgeMod':
                setdrivingbridgeMod('')
                if (/./.test(target.value.replace(/\s/g, ""))) {
                    setdrivingbridgeMod('')
                }
                break;
            case 'controlledbridgeMod':
                setControlledbridgeMod('')
                if (/./.test(target.value.replace(/\s/g, ""))) {
                    setControlledbridgeMod('')
                }
                break;
        }
    }
    const goBack = () => navigate(-1);

    return (
        <div
            className={'carEdit'}>{(car && (client.length > 1) && (company.length > 1) && (technic.length > 1) && (engine.length > 1) && (transmission.length > 1) && (drivingbridge.length > 1) && (controlledbridge.length > 1)) ? (
            <>
                <h3>Обновить информацию о машине</h3>
                <button className={'btnVin'} onClick={e => goBack()}>Назад</button>
                <div className={'myMainEdit'}>
                    <div className={'carEditDiv'}>
                        <p>Зав. № машины</p>
                        <input className={'vinInput'}
                               name={'vinMod'}
                               value={vinMod ? vinMod : car['vin'] ? car['vin'] : '-'}
                               autoComplete={'off'}
                               placeholder={'Зав. № машины'}
                               maxLength={25}
                               onChange={event => {
                                   myEngineFunc(event.target)
                                   // setVinMod(event.target.value)
                               }}

                        />
                    </div>
                    <div className={'carEditDiv'}>
                        <p>Зав. № двигателя</p>
                        <input className={'vinInput'}
                               name={'engineNoMod'}
                               value={engineNoMod ? engineNoMod : car['engineNo'] ? car['engineNo'] : '-'}
                               autoComplete={'off'}
                               placeholder={'Зав. № двигателя'}
                               maxLength={25}
                               onChange={event => {
                                   myEngineFunc(event.target)

                                   // setEngineNoMod(event.target.value)
                               }}

                        />
                    </div>
                    <div className={'carEditDiv'}>
                        <p>Зав. № трансмиссии</p>
                        <input className={'vinInput'}
                               name={'transmissionNoMod'}
                               value={transmissionNoMod ? transmissionNoMod : car['transmissionNo'] ? car['transmissionNo'] : '-'}
                               autoComplete={'off'}
                               placeholder={'Зав. № трансмиссии'}
                               maxLength={25}
                               onChange={event => {
                                   myEngineFunc(event.target)

                                   // setTransmissionNoMod(event.target.value)
                               }}

                        />
                    </div>
                    <div className={'carEditDiv'}>
                        <p>Зав. № ведущего моста</p>
                        <input className={'vinInput'}
                               name={'drivingBridgeNoMod'}
                               value={drivingBridgeNoMod ? drivingBridgeNoMod : car['drivingBridgeNo'] ? car['drivingBridgeNo'] : '-'}
                               autoComplete={'off'}
                               placeholder={'Зав. № ведущего моста'}
                               maxLength={25}
                               onChange={event => {
                                   myEngineFunc(event.target)

                                   // setDrivingBridgeNoMod(event.target.value)
                               }}

                        />
                    </div>
                    <div className={'carEditDiv'}>
                        <p>Зав. № управляемого моста</p>
                        <input className={'vinInput'}
                               name={'controlledBridgeNoMod'}
                               value={controlledBridgeNoMod ? controlledBridgeNoMod : car['controlledBridgeNo'] ? car['controlledBridgeNo'] : '-'}
                               autoComplete={'off'}
                               placeholder={'Зав. № управляемого моста'}
                               maxLength={25}
                               onChange={event => {
                                   myEngineFunc(event.target)

                                   // setControlledBridgeNoMod(event.target.value)
                               }}

                        />
                    </div>
                    <div className={'carEditDiv'}>
                        <p>Договор поставки</p>
                        <input className={'vinInput'}
                               name={'contractMod'}
                               value={contractMod ? contractMod : car['contract'] ? car['contract'] : '-'}
                               autoComplete={'off'}
                               placeholder={'Договор поставки'}
                               maxLength={25}
                               onChange={event => {
                                   myEngineFunc(event.target)

                                   // setContractMod(event.target.value)
                               }}

                        />
                    </div>
                    <div className={'carEditDiv'}>
                        <p>Дата отгрузки с завода</p>
                        <input className={'vinInput'}
                               name={'contractMod'}
                               value={dateOfShipmentMod ? dateOfShipmentMod : car['dateOfShipment'] ? car['dateOfShipment'] : '-'}
                               autoComplete={'off'}
                               placeholder={'Дата отгрузки с завода'}
                               maxLength={25}
                               onChange={event => {
                                   setDateOfShipmentMod(event.target.value)
                               }}
                               type={"date"}

                        />
                    </div>
                    <div className={'carEditDiv'}>
                        <p>Грузополучатель</p>
                        <input className={'vinInput'}
                               name={'consigneeMod'}
                               value={consigneeMod ? consigneeMod : car['consignee'] ? car['consignee'] : '-'}
                               autoComplete={'off'}
                               placeholder={'Грузополучатель'}
                               maxLength={25}
                               onChange={event => {
                                   myEngineFunc(event.target)

                                   // setConsigneeMod(event.target.value)
                               }}
                        />
                    </div>
                    <div className={'carEditDiv'}>
                        <p>Адрес поставки</p>
                        <input className={'vinInput'}
                               name={'deliveryAddressMod'}
                               value={deliveryAddressMod ? deliveryAddressMod : car['deliveryAddress'] ? car['deliveryAddress'] : '-'}
                               autoComplete={'off'}
                               placeholder={'Адрес поставки'}
                               maxLength={25}
                               onChange={event => {
                                   myEngineFunc(event.target)

                                   // setDeliveryAddressMod(event.target.value)
                               }}

                        />
                    </div>
                    <div className={'carEditDiv'}>
                        <p>Комплектация</p>
                        <input className={'vinInput'}
                               name={'equipmentMod'}
                               value={equipmentMod ? equipmentMod : car['equipment'] ? car['equipment'] : '-'}
                               autoComplete={'off'}
                               placeholder={'Комплектация'}
                               maxLength={25}
                               onChange={event => {
                                   myEngineFunc(event.target)

                                   // setEquipmentMod(event.target.value)
                               }}

                        />
                    </div>
                    <div className={'carEditDiv'}>
                        <p>Клиент</p>
                        <input className={'vinInput hovered'}
                               name={'clientMod'}
                               value={clientMod ? clientMod : client.length > 1 ? client.find(
                                   client => client.id === car['client']
                               ).name : car['client']}
                               placeholder={'Клиент'}
                               onClick={e => {
                                   setToggleClient(!toggleClient)
                                   setToggleCompany(false)
                                   setToggleControlledbridge(false)
                                   setToggleDrivingbridge(false)
                                   setToggleTransmission(false)
                                   setToggleTechnic(false)
                                   setToggleEngin(false)
                               }}
                               onBlur={event => {
                                   setToggleClient(false)
                               }}
                               onChange={event => {

                                   setDatas(event.target)
                               }}

                        />
                        {(toggleClient || toggleClientTwo) && (
                            <ul onClick={event => {
                                myClientToggleFunc(event.target)

                            }}
                                onMouseOver={event => {
                                    setToggleClientTwo(true)
                                }}
                                tabIndex={-1}
                                onMouseLeave={event => {
                                    setToggleClientTwo(false)
                                }}
                                className={"searchUl"}

                            >
                                {client ? client.map((el, i) =>
                                    <li key={el.id}>{el.name}</li>
                                ) : ''}
                            </ul>
                        )}
                    </div>
                    <div className={'carEditDiv'}>
                        <p>Сервисная компания</p>
                        <input className={'vinInput hovered'}
                               name={'companyMod'}
                               value={companyMod ? companyMod : company.length > 1 ? company.find(
                                   company => company.id === car['serviceCompany']
                               ).name : car['serviceCompany']}
                               placeholder={'Организация'}
                               onClick={e => {
                                   setToggleCompany(!toggleCompany)
                                   setToggleClient(false)
                                   setToggleControlledbridge(false)
                                   setToggleDrivingbridge(false)
                                   setToggleTransmission(false)
                                   setToggleTechnic(false)
                                   setToggleEngin(false)
                               }}
                               onBlur={event => {
                                   setToggleCompany(false)
                               }}
                               onChange={event => {

                                   setDatas(event.target)
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
                    <div className={'carEditDiv'}>
                        <p>Модель техники</p>
                        <input className={'vinInput hovered'}
                               name={'technicMod'}
                               value={technicMod ? technicMod : technic.length > 1 ? technic.find(
                                   technic => technic.id === car['technic']
                               ).name : car['technic']}
                               placeholder={'Модель техники'}
                               onClick={e => {
                                   setToggleTechnic(!toggleTechnic)
                                   setToggleClient(false)
                                   setToggleControlledbridge(false)
                                   setToggleDrivingbridge(false)
                                   setToggleTransmission(false)
                                   setToggleCompany(false)
                                   setToggleEngin(false)
                               }}
                               onBlur={event => {
                                   setToggleTechnic(false)
                               }}
                               onChange={event => {

                                   setDatas(event.target)
                               }}

                        />
                        {(toggleTechnic || toggleTechnicTwo) && (
                            <ul onClick={event => {
                                myTechnicToggleFunc(event.target)

                            }}
                                onMouseOver={event => {
                                    setToggleTechnicTwo(true)
                                }}
                                tabIndex={-1}
                                onMouseLeave={event => {
                                    setToggleTechnicTwo(false)
                                }}
                                className={"searchUl"}

                            >
                                {technic ? technic.map((el, i) =>
                                    <li key={el.id}>{el.name}</li>
                                ) : ''}
                            </ul>
                        )}
                    </div>
                    <div className={'carEditDiv'}>
                        <p>Модель двигателя</p>
                        <input className={'vinInput hovered'}
                               name={'engineMod'}
                               value={engineMod ? engineMod : engine.length > 1 ? engine.find(
                                   engine => engine.id === car['engine']
                               ).name : car['engine']}
                               placeholder={'Модель двигателя'}
                               onClick={e => {
                                   setToggleEngin(!toggleEngine)
                                   setToggleClient(false)
                                   setToggleControlledbridge(false)
                                   setToggleDrivingbridge(false)
                                   setToggleTransmission(false)
                                   setToggleCompany(false)
                                   setToggleTechnic(false)
                               }}
                               onBlur={event => {
                                   setToggleEngin(false)
                               }}
                               onChange={event => {

                                   setDatas(event.target)
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
                    <div className={'carEditDiv'}>
                        <p>Модель трансмиссии</p>
                        <input className={'vinInput hovered'}
                               name={'transmissionMod'}
                               value={transmissionMod ? transmissionMod : transmission.length > 1 ? transmission.find(
                                   transmission => transmission.id === car['transmission']
                               ).name : car['transmission']}
                               placeholder={'Модель трансмиссии'}
                               onClick={e => {
                                   setToggleTransmission(!toggleTransmission)
                                   setToggleClient(false)
                                   setToggleControlledbridge(false)
                                   setToggleDrivingbridge(false)
                                   setToggleEngin(false)
                                   setToggleCompany(false)
                                   setToggleTechnic(false)
                               }}
                               onBlur={event => {
                                   setToggleTransmission(false)
                               }}
                               onChange={event => {

                                   setDatas(event.target)
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
                    <div className={'carEditDiv'}>
                        <p>Модель ведущего моста</p>
                        <input className={'vinInput hovered'}
                               name={'drivingbridgeMod'}
                               value={drivingbridgeMod ? drivingbridgeMod : drivingbridge.length > 1 ? drivingbridge.find(
                                   drivingbridge => drivingbridge.id === car['drivingBridge']
                               ).name : car['drivingBridge']}
                               placeholder={'Модель ведущего моста'}
                               onClick={e => {
                                   setToggleDrivingbridge(!toggleDrivingbridge)
                                   setToggleClient(false)
                                   setToggleControlledbridge(false)
                                   setToggleTransmission(false)
                                   setToggleEngin(false)
                                   setToggleCompany(false)
                                   setToggleTechnic(false)
                               }}
                               onBlur={event => {
                                   setToggleDrivingbridge(false)
                               }}
                               onChange={event => {

                                   setDatas(event.target)
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
                    <div className={'carEditDiv'}>
                        <p>Модель управляемого моста</p>
                        <input className={'vinInput hovered'}
                               name={'controlledbridgeMod'}
                               value={controlledbridgeMod ? controlledbridgeMod : controlledbridge.length > 1 ? controlledbridge.find(
                                   controlledbridge => controlledbridge.id === car['controlledBridge']
                               ).name : car['controlledBridge']}
                               placeholder={'Модель управляемого моста'}
                               onClick={e => {
                                   setToggleControlledbridge(!toggleDrivingbridge)
                                   setToggleClient(false)
                                   setToggleDrivingbridge(false)
                                   setToggleTransmission(false)
                                   setToggleEngin(false)
                                   setToggleCompany(false)
                                   setToggleTechnic(false)
                               }}
                               onBlur={event => {
                                   setToggleDrivingbridge(false)
                               }}
                               onChange={event => {

                                   setDatas(event.target)
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
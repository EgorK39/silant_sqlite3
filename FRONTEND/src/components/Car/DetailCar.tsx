import * as React from 'react';
import {useEffect, useState} from "react";
import {Link, useParams} from 'react-router-dom';
import OneOfCars from "./OneOfCars";
import * as service from "../Services/Services";

export default function DetailCar(props) {
    const [allCar, setAllCar] = useState<object>(null);

    const [technic, setTechnic] = useState<any>([])
    const [engine, setEngine] = useState<any>([])
    const [transmission, setTransmission] = useState<any>([])
    const [drivingbridge, setDrivingbridge] = useState<any>([])
    const [controlledbridge, setControlledbridge] = useState<any>([])


    const {id} = useParams();
    useEffect(() => {
        const technic1 = service.getService(technic, props.defaultURL, 'technic');
        const engine1 = service.getService(engine, props.defaultURL, 'engine');
        const transmission1 = service.getService(transmission, props.defaultURL, 'transmission');
        const drivingbridge1 = service.getService(drivingbridge, props.defaultURL, 'drivingbridge');
        const controlledbridge1 = service.getService(controlledbridge, props.defaultURL, 'controlledbridge');


        const printService = (service, type) => {
            service.then((serviceName) => {
                switch (type) {
                    case 'technic':
                        console.log(serviceName);
                        setTechnic(serviceName)
                        break;
                    case 'engine':
                        console.log(serviceName);
                        setEngine(serviceName)
                        break;
                    case 'transmission':
                        console.log(serviceName);
                        setTransmission(serviceName)
                        break;
                    case 'drivingbridge':
                        console.log(serviceName);
                        setDrivingbridge(serviceName)
                        break;
                    case 'controlledbridge':
                        console.log(serviceName);
                        setControlledbridge(serviceName)
                        break;
                }
            })
        }
        printService(technic1, 'technic');
        printService(engine1, 'engine');
        printService(transmission1, 'transmission');
        printService(drivingbridge1, 'drivingbridge');
        printService(controlledbridge1, 'controlledbridge');


        // if (!technic.length) {
        //     fetch(props.defaultURL + 'car/user/technic', {
        //         method: 'GET',
        //     })
        //         .then(async res => {
        //             return await res.json()
        //         })
        //         .then(data => {
        //             setTechnic(data.technic)
        //         })
        //         .catch(err =>
        //             console.log(err))
        // }
        //
        // if (!engine.length) {
        //     fetch(props.defaultURL + 'car/user/engine', {
        //         method: 'GET',
        //     })
        //         .then(async res => {
        //             return await res.json()
        //         })
        //         .then(data => {
        //             setEngine(data.engine)
        //         })
        //         .catch(err =>
        //             console.log(err))
        // }
        // if (!transmission.length) {
        //     fetch(props.defaultURL + 'car/user/transmission', {
        //         method: 'GET',
        //     })
        //         .then(async res => {
        //             return await res.json()
        //         })
        //         .then(data => {
        //             setTransmission(data.transmission)
        //         })
        //         .catch(err =>
        //             console.log(err))
        // }
        // if (!drivingbridge.length) {
        //     fetch(props.defaultURL + 'car/user/drivingbridge', {
        //         method: 'GET',
        //     })
        //         .then(async res => {
        //             return await res.json()
        //         })
        //         .then(data => {
        //             setDrivingbridge(data.drivingbridge)
        //         })
        //         .catch(err =>
        //             console.log(err))
        // }
        // if (!controlledbridge.length) {
        //     fetch(props.defaultURL + 'car/user/controlledbridge', {
        //         method: 'GET',
        //     })
        //         .then(async res => {
        //             return await res.json()
        //         })
        //         .then(data => {
        //             setControlledbridge(data.controlledbridge)
        //         })
        //         .catch(err =>
        //             console.log(err))
        // }


    }, [])

    useEffect(() => {
        if (!allCar) {
            fetch(props.defaultURL + 'car/user/' + id, {
                method: 'GET',
            })
                .then(async res => {
                    setAllCar(await res.json());
                })

                .catch(err =>
                    console.log(err))
        }
    }, [])

    useEffect(() => {
        console.log(technic, [technic])
    }, [technic])

    useEffect(() => {
        console.log(engine.engine, [engine])
    }, [engine])
    useEffect(() => {
        console.log(typeof allCar, allCar)
    }, [allCar])

    return (

        <OneOfCars allCar={allCar}
                   technic={technic}
                   engine={engine}
                   transmission={transmission}
                   drivingbridge={drivingbridge}
                   controlledbridge={controlledbridge}
        />
    )
}
import * as React from 'react';
import {useEffect, useState} from "react";
import {Link, useParams} from 'react-router-dom';
import OneOfCars from "./OneOfCars";

export default function DetailCar(props) {
    const [allCar, setAllCar] = useState<object>(null);

    const [technic, setTechnic] = useState<any>([])
    const [engine, setEngine] = useState<any>([])
    const [transmission, setTransmission] = useState<any>([])
    const [drivingbridge, setDrivingbridge] = useState<any>([])
    const [controlledbridge, setControlledbridge] = useState<any>([])


    const {id} = useParams();
    useEffect(() => {
        if (!technic.length) {
            fetch(props.defaultURL + 'car/user/technic', {
                method: 'GET',
            })
                .then(async res => {
                    return await res.json()
                })
                .then(data => {
                    setTechnic(data.technic)
                })
                .catch(err =>
                    console.log(err))
        }

        if (!engine.length) {
            fetch(props.defaultURL + 'car/user/engine', {
                method: 'GET',
            })
                .then(async res => {
                    return await res.json()
                })
                .then(data => {
                    setEngine(data.engine)
                })
                .catch(err =>
                    console.log(err))
        }
        if (!transmission.length) {
            fetch(props.defaultURL + 'car/user/transmission', {
                method: 'GET',
            })
                .then(async res => {
                    return await res.json()
                })
                .then(data => {
                    setTransmission(data.transmission)
                })
                .catch(err =>
                    console.log(err))
        }
        if (!drivingbridge.length) {
            fetch(props.defaultURL + 'car/user/drivingbridge', {
                method: 'GET',
            })
                .then(async res => {
                    return await res.json()
                })
                .then(data => {
                    setDrivingbridge(data.drivingbridge)
                })
                .catch(err =>
                    console.log(err))
        }
        if (!controlledbridge.length) {
            fetch(props.defaultURL + 'car/user/controlledbridge', {
                method: 'GET',
            })
                .then(async res => {
                    return await res.json()
                })
                .then(data => {
                    setControlledbridge(data.controlledbridge)
                })
                .catch(err =>
                    console.log(err))
        }


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
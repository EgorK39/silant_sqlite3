import * as React from 'react';
import '../styles/App.scss';
import Header from './Header/Header';
import CarMain from './Car/CarMain';
import {
    Route, Routes, useNavigate
} from 'react-router-dom';
import Api from './Api/Api';
import DetailCar from './Car/DetailCar';
import ShowTechnic from './Car/Services/ShowTechnic';
import ShowEngine from './Car/Services/ShowEngine';
import ShowTransmission from './Car/Services/ShowTransmission';
import ShowDrivingbridge from './Car/Services/ShowDrivingbridge';
import ShowControlledbridge from './Car/Services/ShowControlledbridge';
import AuthPage from './Auth/AuthPage';
import {useEffect, useState} from 'react';
import ManagerMain from './ForManager/ManagerMain';
import ShowClient from "./Car/Services/ShowClient";
import ShowCompany from "./Car/Services/ShowCompany";
import CarEdit from './ForManager/CarEdit';
import ToMain from "./To/ToMain";
import ReclamationMain from "./Reclamation/ReclamationMain";
import ShowRejection from "./Reclamation/Services/ShowRejection";
import ShowRecovery from "./Reclamation/Services/ShowRecovery";
import ShowType from "./To/Services/ShowType";
import NavBar from "./Header/NavBar";
import UpdateTo from "./To/UpdateTo";
import UpdateRec from "./Reclamation/UpdateRec";
import Guide from "./ForManager/Guide";
import Create from "./ForManager/Services/Create";

export default function App(props) {

    const defaultURL = 'http://127.0.0.1:8000/api/v1/'

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userName, setUserName] = useState<string>('')
    const [groupName, setGroupName] = useState<string>('')

    const navigate = useNavigate();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token) {
            if (token.access) {
                console.log(token)
                console.log(token.access)
                setIsAuthenticated(true)
            } else {
                const interval = setInterval(() => {
                    const token = JSON.parse(localStorage.getItem('token'));
                    if (token.access) {
                        setIsAuthenticated(true)
                        clearInterval(interval)
                    }
                }, 1500)
            }
        } else {
            localStorage.setItem('token', JSON.stringify(''))
        }
    }, []);

    const dropPassword = () => {
        localStorage.setItem('token', JSON.stringify(''))
        navigate('/auth', {replace: true})
        navigate(0)
    }
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            if (token.access) {
                console.log('auth')
                fetch(`${defaultURL}car/getname`,
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
                            return await res.json();
                        }
                    })
                    .then(data => {
                        console.log(data.name)
                        setUserName(data.name)
                        setGroupName(data.group)
                    })

                    .catch(err =>
                        console.log(err))
            }
        }
    }, [])

    return (
        <>
            <Routes>
                <Route path={'/'} element={<Header isAuthenticated={isAuthenticated}/>}>
                    <Route index element={<CarMain defaultURL={defaultURL} isAuthenticated={isAuthenticated}
                                                   userName={userName}/>}/>
                    <Route path={'car/:id'}
                           element={<DetailCar defaultURL={defaultURL} isAuthenticated={isAuthenticated}/>}/>
                    <Route path={'car/technic/:id'}
                           element={<ShowTechnic defaultURL={defaultURL} isAuthenticated={isAuthenticated}/>}/>
                    <Route path={'car/engine/:id'}
                           element={<ShowEngine defaultURL={defaultURL} isAuthenticated={isAuthenticated}/>}/>
                    <Route path={'car/transmission/:id'}
                           element={<ShowTransmission defaultURL={defaultURL} isAuthenticated={isAuthenticated}/>}/>
                    <Route path={'car/drivingbridge/:id'}
                           element={<ShowDrivingbridge defaultURL={defaultURL} isAuthenticated={isAuthenticated}/>}/>
                    <Route path={'car/controlledbridge/:id'}
                           element={<ShowControlledbridge defaultURL={defaultURL} isAuthenticated={isAuthenticated}/>}/>
                    <Route path={'auth'} element={<AuthPage defaultURL={defaultURL}/>}/>
                    {isAuthenticated && (
                        <>
                            <Route path={'car/client/:id'}
                                   element={<ShowClient defaultURL={defaultURL} isAuthenticated={isAuthenticated}/>}/>
                            <Route path={'car/company/:id'}
                                   element={<ShowCompany defaultURL={defaultURL} isAuthenticated={isAuthenticated}/>}/>
                            <Route path={'manager'} element={<ManagerMain defaultURL={defaultURL}/>}>
                                <Route index element={<NavBar defaultURL={defaultURL} userName={userName}/>}/>
                            </Route>
                            <Route path={'manager/car/:id'} element={<CarEdit defaultURL={defaultURL}/>}/>
                            <Route path={'to'} element={<ToMain defaultURL={defaultURL} groupName={groupName}/>}>
                                <Route index element={<NavBar defaultURL={defaultURL} userName={userName}/>}/>

                            </Route>
                            <Route path={'to/:id'}
                                   element={<UpdateTo defaultURL={defaultURL} userName={userName}
                                                      groupName={groupName}/>}/>
                            {/*<Route path={'to/'}*/}
                            <Route path={'to/show/type/:id'} element={<ShowType defaultURL={defaultURL}/>}/>
                            <Route path={'rec'}
                                   element={<ReclamationMain defaultURL={defaultURL} groupName={groupName}/>}>
                                <Route index element={<NavBar defaultURL={defaultURL} userName={userName}/>}/>
                            </Route>
                            <Route path={'rec/:id'} element={<UpdateRec defaultURL={defaultURL} userName={userName}
                                                                        groupName={groupName}/>}/>
                            <Route path={'rec/show/rejection/:id'} element={<ShowRejection defaultURL={defaultURL}/>}/>
                            <Route path={'rec/show/recovery/:id'} element={<ShowRecovery defaultURL={defaultURL}/>}/>
                            <Route path={'manager/guide'} element={<Guide defaultURL={defaultURL} userName={userName}
                                                                          groupName={groupName}/>}/>


                            <Route path={'manager/guide/createTechnic'}
                                   element={<Create defaultURL={defaultURL} userName={userName}
                                                    groupName={groupName}/>}/>
                            <Route path={'manager/guide/technic/:id'}
                                   element={<Create defaultURL={defaultURL} userName={userName}
                                                    groupName={groupName}/>}/>
                            <Route path={'manager/guide/createEngine'}
                                   element={<Create defaultURL={defaultURL} userName={userName}
                                                    groupName={groupName}/>}/>
                            <Route path={'manager/guide/engine/:id'}
                                   element={<Create defaultURL={defaultURL} userName={userName}
                                                    groupName={groupName}/>}/>
                            <Route path={'manager/guide/createTransmission'}
                                   element={<Create defaultURL={defaultURL} userName={userName}
                                                    groupName={groupName}/>}/>
                            <Route path={'manager/guide/transmission/:id'}
                                   element={<Create defaultURL={defaultURL} userName={userName}
                                                    groupName={groupName}/>}/>
                            <Route path={'manager/guide/createDrbridge'}
                                   element={<Create defaultURL={defaultURL} userName={userName}
                                                    groupName={groupName}/>}/>
                            <Route path={'manager/guide/drbridge/:id'}
                                   element={<Create defaultURL={defaultURL} userName={userName}
                                                    groupName={groupName}/>}/>
                            <Route path={'manager/guide/createCobridge'}
                                   element={<Create defaultURL={defaultURL} userName={userName}
                                                    groupName={groupName}/>}/>
                            <Route path={'manager/guide/cobridge/:id'}
                                   element={<Create defaultURL={defaultURL} userName={userName}
                                                    groupName={groupName}/>}/>
                            <Route path={'manager/guide/createType'}
                                   element={<Create defaultURL={defaultURL} userName={userName}
                                                    groupName={groupName}/>}/>
                            <Route path={'manager/guide/type/:id'}
                                   element={<Create defaultURL={defaultURL} userName={userName}
                                                    groupName={groupName}/>}/>
                            <Route path={'manager/guide/createRejection'}
                                   element={<Create defaultURL={defaultURL} userName={userName}
                                                    groupName={groupName}/>}/>
                            <Route path={'manager/guide/rejection/:id'}
                                   element={<Create defaultURL={defaultURL} userName={userName}
                                                    groupName={groupName}/>}/>
                            <Route path={'manager/guide/createRecovery'}
                                   element={<Create defaultURL={defaultURL} userName={userName}
                                                    groupName={groupName}/>}/>
                            <Route path={'manager/guide/recovery/:id'}
                                   element={<Create defaultURL={defaultURL} userName={userName}
                                                    groupName={groupName}/>}/>
                        </>
                    )}
                </Route>
                <Route path={'/api'} element={<Api/>}/>
            </Routes>

        </>


    )
};
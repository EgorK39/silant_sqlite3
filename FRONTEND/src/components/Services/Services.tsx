import * as React from 'react';

export async function getName(token, defaultURL) {
    interface aboutUser {
        userName: string;
        groupName: string;
        dropPass: boolean;
    }

    // let userName: Promise<void> = null;
    let aboutUser: aboutUser = {
        userName: '',
        groupName: '',
        dropPass: false
    };
    if (token) {
        if (token.access) {
            console.log('auth')
            await fetch(`${defaultURL}car/getname`,
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
                        // dropPassword()
                        aboutUser.dropPass = true

                    } else {
                        console.log(res)
                        return await res.json();
                    }
                })
                .then(async data => {
                    console.log(data.name)
                    // setUserName(data.name)
                    // setGroupName(data.group)
                    // return await data.name;
                    aboutUser.groupName = await data.group;
                    aboutUser.userName = await data.name;

                })

                .catch(err =>
                    console.log(err)
                )
        }
    }


    console.log(aboutUser)
    if (aboutUser) {
        console.log(aboutUser)
        return aboutUser;
    }
    return {'error': 'no', 'textError': 'Пользователь не найден'};
}


export async function getService(serviceName, defaultURL, type) {
    let someContext: any = [];
    console.log(typeof serviceName);
    console.log(defaultURL);
    console.log(type);
    let myUrl: string = '';
    switch (type) {
        case 'technic':
            myUrl = 'technic'
            break;
        case 'engine':
            myUrl = 'engine'
            break;
        case 'transmission':
            myUrl = 'transmission'
            break;
        case 'drivingbridge':
            myUrl = 'drivingbridge'
            break;
        case 'controlledbridge':
            myUrl = 'controlledbridge'
            break;

    }

    if (!serviceName.length) {
        await fetch(defaultURL + 'car/user/' + myUrl, {
            method: 'GET',
        })
            .then(async res => {
                return await res.json()
            })
            .then(async data => {
                // setTechnic(data.technic)
                console.log(data[myUrl])
                someContext = await data[myUrl]

            })
            .catch(err =>
                console.log(err))
    }
    console.log(someContext);
    return someContext
}


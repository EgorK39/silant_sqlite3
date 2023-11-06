import * as React from 'react';

export const getServices = async (service, defaultURL, token, type) => {
    let result: any = [];
    let myURL: string = '';
    switch (type) {
        case 'client':
            myURL = 'client'
            break;
        case 'company':
            myURL = 'company'
            break;
        case 'technic':
            myURL = 'technic'
            break;
        case 'engine':
            myURL = 'engine'
            break;
        case 'transmission':
            myURL = 'transmission'
            break;
        case 'drivingbridge':
            myURL = 'drbridge'
            break;
        case 'controlledbridge':
            myURL = 'cobridge'
            break;
        case 'type':
            myURL = 'type'
            break;
        case 'rejection':
            myURL = 'rejection'
            break;
        case 'recovery':
            myURL = 'recovery'
            break;
    }
    if (!service.length) {
        console.log('service')

        await fetch(defaultURL + 'services/' + myURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(async res => {
                if (res.status != 200) {
                    console.log(res)
                    console.log(res.status)
                    console.log(typeof res.status)
                    result = false;
                    // return false;
                } else {
                    return await res.json();
                }
            })
            .then(async data => {
                console.log(data)
                result = await data;
            })
            .catch(err =>
                console.log(err))
    }

    if (result.length || typeof result == "boolean") {
        console.log(result);
        console.log(typeof result);
        return result;
    }
    return 'empty';
}
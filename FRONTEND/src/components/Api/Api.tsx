import * as React from 'react';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';


export default function Api() {
    return (
        <SwaggerUI url={'http://127.0.0.1:8000/openapi'}/>

    )
}

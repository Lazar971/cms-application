import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

export default withRouter((props: RouteComponentProps) => {
    console.log(props.match.params)
    return (
        <>

        </>
    );
})

import React from "react";
import { Route, Redirect } from 'react-router-dom';
import BubblePage from "./BubblePage";


const ProtectedRoute = () => {
    console.log('localstorage from protected', localStorage);


    return ( 
    <Route render={() => {
        if (localStorage.getItem("token")) {
            return <BubblePage />;
          } else {
            return <Redirect to="/login" />;
          }
    }}
    />
    );
};

export default ProtectedRoute
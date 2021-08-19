import React from 'react'
import { Switch, useRouteMatch } from 'react-router-dom'
import '../css/Container.css'
import { ProtectedRoute } from '../ProtectedRoute';
import Home from './Home'
import Pokemon from './Pokemon';
import Types from './Types';

function Container() {

    const {path} = useRouteMatch();
    

    return (
        <div className="Container">
            <Switch >
                <ProtectedRoute path={`${path}/pokemon/:name`}>
                    <Pokemon/>
                </ProtectedRoute>
                <ProtectedRoute path={`${path}/pokemon/:id`}>
                    <Pokemon/>
                </ProtectedRoute>
                <ProtectedRoute path={`${path}/:type`}>
                    <Types/>
                </ProtectedRoute>
                <ProtectedRoute path={path}>
                    <Home/>
                </ProtectedRoute>
            </Switch>
        </div>
    )
}

export default Container

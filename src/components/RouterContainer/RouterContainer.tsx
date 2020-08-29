import React, { ReactElement, createContext, useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import path from 'path';
import { routeConfig } from '@/config/router';
import Loadable from 'react-loadable';

const RouterContext = createContext<ReactElement | null>(null);

export const RouterContainer = () => {

    return (
        <BrowserRouter>
            <Router routers={routeConfig}></Router>
        </BrowserRouter>
    )
}

const Router = ({ routers }: { routers: any[] }) => {

    const defaultRouter = routers.find(item => item.default)

    return (
        <Switch>
            {routers.map((route: any, index: number) =>
                route.child.length ?
                    <RouterContext.Provider value={<Router routers={route.child} />} key={index}>
                        <Route exact={!!route.exact} path={route.path} render={() =>
                            route.noLazy ?
                                <route.component /> :
                                <LazyComponent componentPath={route.componentPath} />
                        }></Route>
                    </RouterContext.Provider>
                    :
                    <Route exact={!!route.exact} path={route.path} render={() =>
                        route.noLazy ?
                            <route.component /> :
                            <LazyComponent componentPath={route.componentPath} />
                    }></Route>
            )}
            <Route path='*' render={() => <>nomatch</>}></Route>
            {defaultRouter && <Redirect from={} to={defaultRouter.path}/>}
        </Switch>
    )
}


export const LazyComponent = ({ componentPath }: any) => {

    console.log(componentPath)

    const Async = Loadable({
        loader: () => import(`@/${componentPath}`),
        loading: () => <>loading...</>,
    })

    return <Async />
};

export const RouterView = () => {
    const Router = useContext(RouterContext);
    return Router
}

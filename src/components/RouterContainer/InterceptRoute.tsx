import React from 'react'
import { RouterContext, Routers } from "./Routers"
import { Route } from 'react-router-dom'
import { LazyComponent } from './LazyComponent'
import { InterceptRouteParams } from '.'

/**
 * 路由拦截器，对每个匹配的路由进行拦截（可以在这里做鉴权）
 * intercept是一个函数，函数返回值决定了是否拦截
 * 返回值如果为JSX.Element，即进行拦截并且返回该JSX
 * 返回值如果为Void，即通过拦截
 */
export const InteraptorRoute = ({ intercept, route, noMatch }: InterceptRouteParams) => {
    return (intercept && intercept(route)) || (
        <Route exact={!!route.exact} path={route.path} render={() =>
            <RouterContext.Provider
                value={route.child.length ? <Routers routers={route.child} noMatch={noMatch} /> : null}
            >
                <Component Component={route.component} componentPath={route.componentPath} />
            </RouterContext.Provider>
        }></Route>

    )
}


const Component = ({ componentPath, Component }: { componentPath: string, Component?: any }) => {
    return (
        Component ?
            <Component /> :
            <LazyComponent componentPath={componentPath} />
    )
}

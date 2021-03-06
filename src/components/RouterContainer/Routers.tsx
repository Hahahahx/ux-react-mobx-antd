import React, { createContext, ReactElement, FC, useContext } from "react";
import { RouterParams, RouteParams } from ".";
import { Switch, Route, Redirect } from "react-router-dom";
import { LazyComponent } from "./LazyComponent";

export const RouterContext = createContext<ReactElement | null>(null);

/**
 * 路由对象，接收一个拦截处理函数和路由表
 * 子路由会再次调用该对象，嵌套路由。
 */
export const Routers: FC<RouterParams> = ({ intercept, routers, noMatch }) => {

    const defaultRouter = routers.find(item => item.default && item.path)

    let fromPath: RegExpMatchArray | null | undefined | string
        = defaultRouter && defaultRouter.path.match(/^\/[a-z]+/g)
    if (fromPath) {
        fromPath.pop();
        fromPath = fromPath.length ? fromPath.join('') : '/';
    }

    return (
        <Switch>
            {routers.map((route: RouteParams, index: number) =>
                // 此处返回拦截路由，详见InterceptRoute，由于再次包装以后Switch无法识别Route了，所以不使用InterceptRoute而直接使用其解构。
                (intercept && intercept(route)) || (
                    <Route exact={!!route.exact} path={route.path} key={index} render={() =>
                        <RouterContext.Provider
                            value={route.child.length ? <Routers routers={route.child} noMatch={noMatch} /> : null}
                        >
                            <Component Component={route.component} componentPath={route.componentPath} />
                        </RouterContext.Provider>
                    }></Route>

                )
            )}
            {defaultRouter && <Redirect exact from={fromPath || '/'} to={defaultRouter.path} />}
            <Route path='/*' render={noMatch} />
        </Switch>
    )
}

const Component = ({ componentPath, Component }: { componentPath: string, Component?: any }) => {
    return (
        Component ?
            <Component /> :
            <LazyComponent componentPath={componentPath} />
    )
}
/**
 * 对外暴露的子集路由
 */
export const RouterView = () => {
    const Router = useContext(RouterContext);
    return Router ? Router : <></>
}

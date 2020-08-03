import {FC, useEffect} from 'react';
import React from 'react';
import {LazyComponentProps, LazyRouteProps} from './index';
import { Route } from 'react-router-dom';
import {Routers} from '@/components/Router/Routers';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Loadable from 'react-loadable'

/**
 * @File: LazyLoad.ts/LazyComponent
 * @Author: Ux
 * @Date: 2020/7/29
 * @Description: 懒（动态，按需）加载组件
 * @param componentPath 组件位置page/**
 * @param hasChild  如果存在子路由，则向下传递路由，在所定义的父组件中接收children来嵌套路由
 * @param children
 * @constructor
 */
export const LazyComponent: FC<LazyComponentProps> = ({componentPath, hasChild}) => {
    const Async = Loadable({
        loader: () => import(`@/${componentPath}`),
        loading: ()=>  <LoadingPage/>
    })

    return hasChild
        ? <Async children={<Routers routers={hasChild.routers} isLogin={hasChild.isLogin} defaultPath={hasChild.defaultPath}/>}/>
        : <Async/>
};

const LoadingPage: FC = () => {
    useEffect(() => {
        NProgress.start()
        return () => {
            NProgress.done()
        }
    }, [])
    return (
        <div className="load-component" />
    )
}


/**
 * @File: LazyLoad.ts/LazyRoute
 * @Author: Ux
 * @Date: 2020/7/29
 * @Description: 懒（动态，按需）加载路由
 * @param urlPath 路由
 * @param componentPath 组件位置page/**
 * @param childRouters 配置组件子路由
 * @constructor
 */
export const LazyRoute:FC<LazyRouteProps> = ({urlPath,componentPath,hasChild})=>{
    return <Route exact path={urlPath} render={()=><LazyComponent componentPath={componentPath} hasChild={hasChild}/>}/>
}
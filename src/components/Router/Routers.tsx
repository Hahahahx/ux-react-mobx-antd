import React, {FC} from 'react';
import {RoutersProps} from '.';
import {PrivateRoute} from './PrivateRoute';
import {LazyRoute} from './LazyLoad';

/**
 * @File: Routers.ts
 * @Author: Ux
 * @Date: 2020/7/29
 * @Description: Routers组件，加载配置
 * @param routers 路由列表
 * @param isLogin 鉴权限制，如果未登录则无法访问一些router
 * @param defaultPath 鉴权限制，如果未登录，则跳转到该路由，请确保该路由没有配置authority
 * @param children
 * @constructor
 */
export const Routers: FC<RoutersProps> = ({routers, isLogin, defaultPath, children}) => {

    const router = routers.map((route,index) => {
        const {authority, componentPath, urlPath, childRoutes} = route;
        // 向下传递，组件接受children ————> LazyLoad.tsx/LazyComponent
        let hasChild:RoutersProps|undefined = undefined
        if(childRoutes){
            hasChild = {
                defaultPath,
                isLogin,
                routers:childRoutes
            }
        }
        // 鉴权组件默认就是懒加载
        if (authority) {
            return (
                <PrivateRoute defaultUrlPath={defaultPath} hasAuthority={isLogin} urlPath={urlPath}
                              componentPath={componentPath} hasChild={hasChild} key={index}/>
            );
        } else {
            return (
                <LazyRoute urlPath={urlPath} componentPath={componentPath} hasChild={hasChild} key={index}/>
            );
        }
    });

    return (
        <>{router}</>
    );
};
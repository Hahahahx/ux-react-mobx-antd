import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {LazyComponent} from './LazyLoad';
import {PrivateRouteProps} from './index';

/**
 * @File: PrivateRoute.ts
 * @Author: Ux
 * @Date: 2020/7/29
 * @Description: 鉴权组件，判断是否通过鉴权（isLogin），否则跳转到默认路由中
 * @param componentPath
 * @param defaultUrlPath
 * @param hasAuthority
 * @param childRouters
 * @param urlPath
 * @constructor
 */
export const PrivateRoute = ({componentPath, defaultUrlPath, hasAuthority, hasChild, urlPath}: PrivateRouteProps) => {

    return (
        <Route exact path={urlPath} render={() => hasAuthority ?
            (<LazyComponent componentPath={componentPath} hasChild={hasChild}/>) :
            <Redirect to={defaultUrlPath}/>}/>
    );
};
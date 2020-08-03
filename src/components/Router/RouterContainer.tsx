import React, {FC, useEffect, useState} from 'react';
import {RouterContainerProps, RouterNode} from '@/components/Router/index';
import {Routers} from '@/components/Router/Routers';
import {routerConfig} from '@/config/routerConfig';
import {BrowserRouter,Route} from 'react-router-dom';
/**
 * @File: RouterContainer
 * @Author: Ux
 * @Date: 2020/7/30
 * @Description:
 */
export const RouterContainer:FC<RouterContainerProps> =({routers, isLogin, defaultPath, noMatch})=>{

    const [path,setPath] = useState(false);

    useEffect(()=>{
        setPath(getPaths(routers,new Array<string>()).includes(window.location.pathname))
    },[path, routers])

    return (
        <BrowserRouter>
            <Routers routers={routerConfig.routers} isLogin={false} defaultPath={routerConfig.defaultPath} />
            {
                !path && noMatch()
            }
        </BrowserRouter>
    )
}

const getPaths =(routers:Array<RouterNode>,path:Array<string>)=>{
    path = path? path:new Array<string>()
    routers.forEach(item=>{
        path.push(item.urlPath);
        if(item.childRoutes){
            getPaths(item.childRoutes,path)
        }
    })
    return path;
}
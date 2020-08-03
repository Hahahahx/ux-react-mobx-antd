import {ComponentElement, FC, ReactElement} from 'react';
/**
 * @File: index.ts
 * @Author: Ux
 * @Date: 2020/7/29
 * @Description: router接口定义
 */

// routers组件配置文件定义
export interface RoutersConfig {
    routers: Array<RouterNode>,
    defaultPath:string
}

/**
 * routers组件的props定义
 * routers、isLogin、defaultPath
 */
export interface RoutersProps {
    routers: Array<RouterNode>,
    isLogin:boolean,
    defaultPath:string,
}

export interface RouterContainerProps {
    routers: Array<RouterNode>,
    isLogin:boolean,
    defaultPath:string,
    noMatch:()=>ReactElement|FC|ComponentElement<any, any>
}

/**
 * routers中的每个节点定义
 */
export interface RouterNode {
    urlPath: string,
    componentPath: string,
    authority?: boolean,
    childRoutes?: Array<RouterNode>
}

/**
 * 懒加载组件props定义
 */
export interface LazyComponentProps {
    componentPath:string
    hasChild?:RoutersProps
}

/**
 * 懒加载路由
 */
export interface LazyRouteProps extends LazyComponentProps{
    urlPath: string
}

/**
 * 鉴权组件props定义
 */
export interface PrivateRouteProps extends LazyRouteProps{
    defaultUrlPath:string,
    hasAuthority:boolean,
}

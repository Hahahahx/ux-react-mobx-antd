import { ReactElement, FC, CSSProperties } from 'react';

export interface RouteParams {
    path: string
    exact?: boolean
    authority?: boolean
    default?: boolean
    noLazy?: boolean
    child: Array<RouteParams>
    componentPath: string
    component?: any
}

export interface RouterParams {
    intercept?: (route: RouteParams) => void | JSX.Element | ReactElement
    routers: Array<RouteParams>
    noMatch?: () => ReactElement | JSX.Element
}

export interface InterceptRouteParams {
    intercept?: (route: RouteParams) => void | JSX.Element | ReactElement
    route: RouteParams
}

export interface LinkToParams {
    to: string
    intercept?: (data: LinkInterceptParams) => boolean | Promise<boolean>
    style?: CSSProperties
    className?: string
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

interface LinkInterceptParams {
    to: string
    location: Location
    isThis: boolean
}

export interface PatchLinkParams {
    to: string
    style?: CSSProperties
    className?: string
    componentPath: string
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}
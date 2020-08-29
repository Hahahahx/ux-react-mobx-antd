import React, { memo, useEffect } from 'react';
import { RouterView } from "@/components/RouterContainer/RouterContainer"
import { NavLink, Redirect } from 'react-router-dom';


const Index = () => {
    useEffect(() => {

        console.log('首页')
    }, [])

    return (
        <>
            <RouterView />
        </>
    )
}
export default memo(Index, () => true);
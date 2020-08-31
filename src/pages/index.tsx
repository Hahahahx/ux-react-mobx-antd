import React, { memo, useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { RouterView } from '@/components/RouterContainer/Routers';
import { LinkTo } from '@/components/RouterContainer/LinkTo';
import { Layout, Button } from 'antd';
import { usePageStore } from '@/components/Provider/PageProvider';
import { PatchLink } from '@/components/RouterContainer/PatchLink';
import { Heart } from './__Component/Heart';
import Selection from '@/components/Selection/Selection';


const Index = () => {

    const { isLoading, setLoading } = usePageStore(({ PageModule }) => ({
        isLoading: PageModule.isLoading,
        setLoading: PageModule.setLoading
    }))

    return (
        <Selection>
            <Layout className='layout'>
                <div className='logo'>
                    <div className='text'>UX</div>
                    <Heart />
                </div>
                <div className='bread'>
                    <PatchLink
                        to='/main'
                        componentPath='pages/main/index.tsx'
                        onClick={() => { setLoading(true) }}
                    >main</PatchLink> /
                    <PatchLink
                        to='/login'
                        componentPath='pages/login/index.tsx'
                        onClick={() => { setLoading(true) }}
                    >login</PatchLink> /
                    <PatchLink
                        to='/some'
                        componentPath='pages/some/index.tsx'
                        onClick={() => { setLoading(true) }}
                    >some</PatchLink>
                </div>
                <RouterView />
            </Layout>
        </Selection>
    )
}
export default memo(Index, () => true);


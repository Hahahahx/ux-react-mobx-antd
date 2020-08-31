import React, { useEffect } from 'react'
import { usePageStore } from '@/components/Provider/PageProvider';


const Login = () => {

    const { setLoading } = usePageStore(({ PageModule }) => ({
        setLoading: PageModule.setLoading
    }))

    useEffect(() => {
        setLoading(false)
    }, [])


    return <div className='page'>Login-Page</div>
}


export default React.memo(Login, () => true);
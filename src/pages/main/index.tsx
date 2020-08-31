import React, { useEffect } from 'react'
import { usePageStore } from '@/components/Provider/PageProvider'



const Main = () => {

    const { setLoading } = usePageStore(({ PageModule }) => ({
        setLoading: PageModule.setLoading
    }))

    useEffect(() => {
        setLoading(false)
    }, [])


    return <div className='page'>Main-Page</div>
}



export default React.memo(Main, () => true);
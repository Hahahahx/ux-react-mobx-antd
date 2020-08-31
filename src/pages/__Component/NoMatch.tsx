import React, { useEffect } from 'react'
import { usePageStore } from '@/components/Provider/PageProvider'



const NoMatch = () => {

    const { setLoading } = usePageStore(({ PageModule }) => ({
        setLoading: PageModule.setLoading
    }))

    useEffect(() => {
        setLoading(false)
    }, [])


    return <div className='page'>NoMatch-404</div>
}



export default React.memo(NoMatch, () => true);
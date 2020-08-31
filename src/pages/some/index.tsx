import React, { useEffect } from 'react'
import { usePageStore } from '@/components/Provider/PageProvider'



const Some = () => {

    const { setLoading } = usePageStore(({ PageModule }) => ({
        setLoading: PageModule.setLoading
    }))

    useEffect(() => {
        setLoading(false)
    }, [])


    return <div className='page'>Some-Page</div>
}


export default React.memo(Some,()=>true);
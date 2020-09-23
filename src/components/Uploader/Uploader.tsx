import React, { createContext, FC, useContext, useState } from "react"
import { Upload } from "./Upload"


const uploaderContext = createContext<Upload | null>(null)

const Uploader = ({ children }: any) => {

    // const [upload, setUpload] = useState()


    return (
        <uploaderContext.Provider value={new Upload({
            pieceSize: 5 * 1024 * 1024,
        })}>
            {children}
        </uploaderContext.Provider>
    )
}


export const useUpload = () => {
    const uploader = useContext(uploaderContext)
    return uploader as Upload
}


export default React.memo(Uploader)
import React from "react"
import Image from "next/image"
import { Button } from "./ui/button"


interface ButtonProps {
    isLoading?: boolean
    className?: string
    children?: React.ReactNode
}
const SubmitButton = ({isLoading, className, children}: ButtonProps) => {

    return (
        <Button type="submit" disabled={isLoading} className={className ??
            'shad-primary-btn w-full' }>
                {isLoading ? (
                    //image maybe next.js
                <div className="flex items-center gap-4">
                    <img src="/assets/icons/loader.svg" alt="loader" 
                    width={24} height={24} className="animate-spin"/>
                    Loading ...
                </div>

                ): children}
        
        </Button>
    )
}

export default SubmitButton
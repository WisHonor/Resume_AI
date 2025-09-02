"use client"


import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  

  return (
    <Sonner
      
      className="toaster group bg-pink-800 "
   
      {...props}
    />
  )
}

export { Toaster }

'use client'

import { signIn } from "next-auth/react"
import { Button } from "../ui/button"
import { BsGoogle } from "react-icons/bs"
import { DEFAULT_LOGIN_REDIRECT } from "@/route"


const Social = () => {
  const onClick =  (provider: "google") => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT })
  }
  return (
    <div className="flex w-full items-center  gap-x-2"> 
    <Button
    className="w-full"
    size='lg'
    onClick={() => onClick("google")}
    variant='outline'
    >
      <BsGoogle className="h-5 w-5" />
    </Button>
    </div>
  )
}

export default Social
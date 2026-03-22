'use client'

import { signIn } from "next-auth/react"
import { Button } from "../ui/button"
import { FcGoogle } from "react-icons/fc"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"


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
      <FcGoogle className="h-5 w-5" />
    </Button>
    </div>
  )
}

export default Social
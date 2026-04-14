"use server"

import * as z from "zod"

import { ResetSchema } from "@/schemas"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"
import { sendPasswordResetEmail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/lib/token"


export const reset = async(values : z.infer<typeof ResetSchema> )=> {
    const validatedFields = ResetSchema.safeParse(values)

    if(!validatedFields.success){
        return{error : "Invalid email!"}
    }

    const {email} = validatedFields.data

    const existingUser = await db.user.findUnique({
      where: { email },
      select: { id: true }
    });

    if(!existingUser){
      return { error : "Email not found!"}
    }

    //Todo Generate token and send

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token,
    )
    return {success : "Reset email sent!"}
}
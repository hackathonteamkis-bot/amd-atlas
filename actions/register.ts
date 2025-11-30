'use server';
import { db } from '@/lib/db';
  
import bcrypt from 'bcryptjs'; 
import * as z from 'zod';
import { RegisterSchema } from '@/schemas';
// import { generateVerificationToken } from '@/lib/token';
import { getUserByEmail } from '@/data/user';
// import { sendVerificationEmail } from '@/lib/mail';


export const register = async (values: z.infer<typeof RegisterSchema>) => {
   const validateFields = RegisterSchema.safeParse(values);

   if (!validateFields.success) {
      return { error: "Invalid Fields!" };
   }

   const {email, password, name} = validateFields.data;
   // const {email, password, name, role} = validateFields.data;
   const hashedPassword = await bcrypt.hash(password,10)
   const existingUser = await getUserByEmail(email);
   if(existingUser){
      return{error: 'Email already Exists'}
   }

   await db.user.create({
      data:{
         name,
         email,
         // role,
         password: hashedPassword
      }
   })

   // const verificationToken = await generateVerificationToken(email);

   //    await sendVerificationEmail(
   //       verificationToken.email,
   //       verificationToken.token,
   //    );

   return { success: "Confirmation email sent" }

}
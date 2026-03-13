'use client'
import * as z from 'zod'
import React, { useTransition } from 'react'
import { CardWrapper } from './card-wrapper'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormMessage, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { NewPasswordSchema } from '@/schemas'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { newPassword } from '@/actions/new-passord'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

export const NewPasswordForm = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
    }
  })

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    startTransition(() => {
      newPassword(values, token)
        .then((data) => {
          if (data?.error) toast.error(data.error);
          if (data?.success) toast.success(data.success);
        })
    });
  };

  return (
    <CardWrapper
      headerLabel='Enter a New Password'
      backButtonHref='/auth/login'
      backButtonLabel='Back to login button'
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='******'
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={isPending}
            onClick={() => { }}
            type='submit'
            className='w-full'>
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

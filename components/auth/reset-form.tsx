'use client'
import * as z from 'zod'
import React, { useTransition } from 'react'
import { CardWrapper } from './card-wrapper'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormMessage, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { ResetSchema } from '@/schemas'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { reset } from '@/actions/reset'
import { toast } from 'sonner'

export const ResetForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    }
  })

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    startTransition(() => {
      reset(values)
        .then((data) => {
          if (data?.error) toast.error(data.error);
          if (data?.success) toast.success(data.success);
        })
    });
  };

  return (
    <CardWrapper
      headerLabel='Forgot your password ?'
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
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='example@gmail.com'
                      type="email"
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
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {ScreenContainer} from '@components/organisms';
import {Button, Text, TextInput} from '@components/atoms';
import {forgotSchema, ForgotValues} from '../schemas/authSchemas';
import {authApi} from '../api/authApi';
import {useUIStore} from '@app/store/uiStore';
export function ForgotPasswordScreen() {const show = useUIStore(s => s.showToast); const {control, handleSubmit, formState: {errors, isSubmitting}} = useForm<ForgotValues>({resolver: zodResolver(forgotSchema), defaultValues: {email: ''}}); const submit = handleSubmit(async ({email}) => {await authApi.forgotPassword(email); show('If an account exists, reset instructions were sent.');}); return <ScreenContainer><Text variant="display">Reset password</Text><Text>We’ll send instructions to your work email.</Text><Controller control={control} name="email" render={({field}) => <TextInput label="Email" value={field.value} onBlur={field.onBlur} onChangeText={field.onChange} error={errors.email?.message}/>}/><Button title="Send instructions" onPress={submit} loading={isSubmitting}/></ScreenContainer>;}

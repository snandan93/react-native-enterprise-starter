import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScreenContainer} from '@components/organisms';
import {Button, PasswordInput, Text, TextInput} from '@components/atoms';
import {loginSchema, LoginValues} from '../schemas/authSchemas';
import {authApi} from '../api/authApi';
import {secureSession} from '@services/storage/secureStorage';
import {authActions} from '../store/authSlice';
import {useAppDispatch} from '@hooks/redux';
import type {AuthStackParams} from '@app/navigation/types';
export function LoginScreen({navigation}: NativeStackScreenProps<AuthStackParams, 'Login'>) {const dispatch = useAppDispatch(); const [apiError, setApiError] = useState(''); const {control, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginValues>({resolver: zodResolver(loginSchema), defaultValues: {email: 'demo@enterprise.dev', password: 'Password123!'}}); const submit = handleSubmit(async values => {setApiError(''); const result = await authApi.login(values.email, values.password); if (!result.success) {setApiError(result.error.message); return;} await secureSession.set(result.data); dispatch(authActions.signedIn(result.data));}); return <ScreenContainer testID="login-screen"><Text variant="display">Welcome back</Text><Text>Sign in to manage your team’s work.</Text><Controller control={control} name="email" render={({field}) => <TextInput label="Email" keyboardType="email-address" autoCapitalize="none" value={field.value} onBlur={field.onBlur} onChangeText={field.onChange} error={errors.email?.message} testID="email-input"/>}/><Controller control={control} name="password" render={({field}) => <PasswordInput label="Password" value={field.value} onBlur={field.onBlur} onChangeText={field.onChange} error={errors.password?.message} testID="password-input"/>}/>{apiError ? <Text color="#BA1A1A">{apiError}</Text> : null}<Button title="Sign in" onPress={submit} loading={isSubmitting} testID="login-submit"/><Button title="Forgot password?" variant="secondary" onPress={() => navigation.navigate('ForgotPassword')}/><Text variant="caption">Demo: demo@enterprise.dev / Password123!</Text></ScreenContainer>;}

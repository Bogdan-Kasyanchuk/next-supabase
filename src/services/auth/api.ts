import { CONSTANTS } from '@/datasets/constants';
import createSupabaseClient from '@/lib/supabase/client';
import { pagesAuthUpdatePasswordUrl } from '@/routes';
import normalizeUrl from '@/utils/normalizeUrl';

import { Result } from './types';
import {
    ForgotPasswordFormSchema,
    LoginFormSchema,
    SignUpFormSchema,
    UpdatePasswordFormSchema
} from './validationSchemas';

export async function signUp(
    email: string,
    password: string,
    repeatPassword: string,
    firstName: string,
    lastName?: string
): Promise<Result> {
    const validatedFields = SignUpFormSchema.safeParse({
        email: email.trim(),
        password,
        repeatPassword,
        firstName: firstName.trim(),
        lastName: lastName?.trim() || undefined
    });

    if (!validatedFields.success) {
        const errors = validatedFields.error.issues
            .map(issue => issue.message)
            .join('\n');

        return {
            success: false,
            error: errors
        };
    }

    const supabase = createSupabaseClient();

    const { data: existsData, error: existsErr } = await supabase.rpc(
        'user_email_exists',
        { check_email: validatedFields.data.email }
    );

    if (existsErr) {
        return {
            success: false,
            error: existsErr.message
        };
    }

    if (existsData) {
        return {
            success: false,
            error: 'User with this email already exists'
        };
    }

    const avatarName = [
        validatedFields.data.firstName,
        validatedFields.data.lastName
    ].filter(Boolean).join('+');

    const { error } = await supabase.auth.signUp({
        email: validatedFields.data.email,
        password: validatedFields.data.password,
        options: {
            data: {
                first_name: validatedFields.data.firstName,
                last_name: validatedFields.data.lastName,
                avatar_url: normalizeUrl(`${ CONSTANTS.AVATAR_URL }/?background=d8fa99&color=222&bold=true&font-size=0.5&name=${ avatarName }`)
            }
        }
    });

    if (error) {
        return {
            success: false,
            error: error.message
        };
    }

    return { success: true };
}

export async function login(email: string, password: string): Promise<Result> {
    const validatedFields = LoginFormSchema.safeParse({
        email: email.trim(),
        password
    });

    if (!validatedFields.success) {
        const errors = validatedFields.error.issues
            .map(issue => issue.message)
            .join('\n');

        return {
            success: false,
            error: errors
        };
    }

    const supabase = createSupabaseClient();

    const { error } = await supabase.auth.signInWithPassword({
        email: validatedFields.data.email,
        password: validatedFields.data.password
    });
            
    if (error) {
        return {
            success: false,
            error: error.message
        };
    }

    return { success: true };
}

export async function forgotPassword(email: string): Promise<Result> {
    const validatedFields = ForgotPasswordFormSchema.safeParse({ email: email.trim() });

    if (!validatedFields.success) {
        return {
            success: false,
            error: validatedFields.error.issues[ 0 ].message
        };
    }

    const supabase = createSupabaseClient();

    const { error } = await supabase.auth.resetPasswordForEmail(
        validatedFields.data.email, {
            redirectTo: normalizeUrl(
                `${ window.location.origin }/${ pagesAuthUpdatePasswordUrl() }`
            )
        });

    if (error) {
        return {
            success: false,
            error: error.message
        };
    }

    return { success: true };
}

export async function updatePassword(password: string): Promise<Result> {
    const validatedFields = UpdatePasswordFormSchema.safeParse({ password });

    if (!validatedFields.success) {
        return {
            success: false,
            error: validatedFields.error.issues[ 0 ].message
        };
    }
    
    const supabase = createSupabaseClient();

    const { error } = await supabase.auth.updateUser({
        password: validatedFields.data.password
    });

    if (error) {
        return {
            success: false,
            error: error.message
        };
    }

    return { success: true };
}
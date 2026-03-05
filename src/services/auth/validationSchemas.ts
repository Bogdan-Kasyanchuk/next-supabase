import z from 'zod';

export const SignUpFormSchema = z.object({
    email: z.email('Please enter a valid email.'),
    password: z.string().min(6, 'Password should be at least 6 characters.'),
    repeatPassword: z.string(),
    firstName: z.string().min(3, 'First name should be at least 3 characters.'),
    lastName: z.string().optional()
}).superRefine((data, ctx) => {
    if (data.password !== data.repeatPassword) {
        ctx.addIssue({
            code: 'custom',
            message: 'Passwords do not match',
            path: [ 'repeatPassword' ]
        });
    }
});

export const LoginFormSchema = z.object({
    email: z.email('Please enter a valid email.'),
    password: z.string().min(6, 'Password should be at least 6 characters.')
});

export const ForgotPasswordFormSchema = z.object({
    email: z.email('Please enter a valid email.')
});

export const UpdatePasswordFormSchema = z.object({
    password: z.string().min(6, 'Password should be at least 6 characters.')
});
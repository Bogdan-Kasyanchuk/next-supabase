export const pagesHomeUrl = () => '/';

export const pagesDashboardUrl = () => '/admin/dashboard';

export const pagesCompaniesUrl = () => '/admin/companies';

export const pagesCompanyUrl = (id: string) => `/admin/companies/${ id }`;

export const pagesCompanyNewUrl = () => '/admin/companies/company-new';

export const pagesPromotionsUrl = () => '/admin/promotions';

export const pagesPromotionUrl = (id: string) => `/admin/promotions/${ id }`;

export const pagesPromotionNewUrl = (id: string) => `/admin/companies/${ id }/promotion-new`;

export const pagesAuthLoginUrl = () => '/auth/login';

export const pagesAuthSignUpUrl = () => '/auth/sign-up';

export const pagesAuthErrorUrl = () => '/auth/error';

export const pagesAuthUpdatePasswordUrl = () => '/auth/update-password';

export const pagesAuthForgotPasswordUrl = () => '/auth/forgot-password';

export const pagesAuthSignUpSuccessUrl = () => '/auth/sign-up-success';
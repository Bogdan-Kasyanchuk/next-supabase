export const pagesHomeUrl = () => '/';

// ---------

export const pagesAuthLoginUrl = () => '/auth/login';

export const pagesAuthSignUpUrl = () => '/auth/sign-up';

export const pagesAuthErrorUrl = () => '/auth/error';

export const pagesAuthUpdatePasswordUrl = () => '/auth/update-password';

export const pagesAuthForgotPasswordUrl = () => '/auth/forgot-password';

export const pagesAuthSignUpSuccessUrl = () => '/auth/sign-up-success';

// ---------

export const pagesDashboardUrl = () => '/admin/dashboard';

export const pagesCompaniesUrl = () => '/admin/companies';

export const pagesPromotionsUrl = () => '/admin/promotions';

export const pagesCompanyUrl = (id: string) => `/admin/companies/${ id }`;

export const pagesPromotionUrl = (id: string) => `/admin/promotions/${ id }`;

export const pagesCompanyNewUrl = () => '/admin/companies/company-new';

export const pagesPromotionNewUrl = (id: string) => `/admin/companies/${ id }/promotion-new`;

export const pagesCompanyUpdateUrl = (id: string) => `/admin/companies/${ id }/company-update`;

export const pagesPromotionUpdateUrl = (id: string) => `/admin/promotions/${ id }/promotion-update`;
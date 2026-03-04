'use server';

import { createCompany, deleteCompany, updateCompany } from '@/services/companiesApi';

export async function createCompanyAction( formData: FormData) {
    return await createCompany(formData);
}

export async function updateCompanyAction(id: string, formData: FormData) {
    return await updateCompany(id, formData);
}

export async function deleteCompanyAction(id: string) {
    return await deleteCompany(id);
}
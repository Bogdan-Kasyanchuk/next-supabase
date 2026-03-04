'use server';

import { createPromotion, deletePromotion, updatePromotion } from '@/services/promotionsApi';

export async function createPromotionAction(companyId: string, formData: FormData) {
    return await createPromotion(companyId, formData);
}

export async function updatePromotionAction(id: string, formData: FormData) {
    return await updatePromotion(id, formData);
}

export async function deletePromotionAction(id: string) {
    return await deletePromotion(id);
}
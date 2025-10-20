// import { notFound } from 'next/navigation';

// import { actionUpdatePromotion } from '@/lib/actions';
// import { fetchPromotion } from '@/lib/data';
// import PromotionForm from '@/ui/promotion-form';

// type Props = {
//     params: Promise<{ id: string }>
// };

// export default async function Page(props: Props) {
//     const { id } = await props.params;

//     const promotion = await fetchPromotion(id);

//     if (!promotion) {
//         notFound();
//     }

//     const actionUpdatePromotionWithId = actionUpdatePromotion.bind(null, id);

//     return (
//         <div className="l-page__content">
//             <div className="col-span-12">
//                 <PromotionForm
//                     title="Update promotion"
//                     action={ actionUpdatePromotionWithId }
//                     initialValues={
//                         {
//                             title: promotion.title,
//                             discount: promotion.discount,
//                             description: promotion.description
//                         }
//                     }
//                 />
//             </div>
//         </div>
//     );
// }

export default async function Page() {
    return <div className="font-bold text-10xl bg-amber-200 h-20">Promotion Update</div>;
}
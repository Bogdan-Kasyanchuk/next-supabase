// import { actionCreatePromotion } from '@/lib/actions';
// import PromotionForm from '@/ui/promotion-form';

// type Props = {
//     params: Promise<{ id: string }>
// };

// export default async function Page(props: Props) {
//     const { id } = await props.params;

//     const createPromotionWithCompanyId = actionCreatePromotion.bind(null, id);

//     return (
//         <div className='l-page__content'>
//             <div className='col-span-12'>
//                 <PromotionForm
//                     title='Add new promotion'
//                     action={createPromotionWithCompanyId}
//                 />
//             </div>
//         </div>
//     );
// }

export default async function Page() {
    return <div className="font-bold text-10xl bg-amber-200 h-20">Promotion New</div>;
}
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

import styles from './styles.module.scss';


type StripeSessionProps = {
    id: string;
    mode: string;
    currency: string;
    customer: string;
    expires_at: Date;
    amount_total: Number;
    payment_status: string;
    amount_subtotal: number;
    allow_promotion_codes: boolean;

};

export function SubscribeButton({ priceId }: { priceId: string }) {
    const { data } = useSession();
    const router = useRouter();


    async function handleSubscribe() {
        if (!data) {
            signIn('github')
            return;
        }


        if (data.activeSubscription) {
            router.push('/posts');
            return;
        }
        try {
            const {data : stripeSession} = await api.post<StripeSessionProps>(
                "/subscribe",
                {
                    user: data.user,
                    priceId,
                }
            );

            const stripe = await getStripeJs()

            await stripe.redirectToCheckout({sessionId : stripeSession.id});
        }

        //criação da checkout session
        catch (err) {
            alert(err.message);
        }
    }
    return (
        <button
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscribe}>
            {data && data.activeSubscription ? 'View posts': 'Subscribe Now'}
        </button>
    );
}
import { signIn, useSession } from 'next-auth/react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

import styles from './styles.module.scss';



interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
    const session  = useSession();

    async function handleSubscribe() {
        if (!session) {
            signIn('github')
            return;
        }
        try {
            const response = await api.post('/subscribe')

            const { sessionId } = response.data;

            const stripe = await getStripeJs()

            stripe.redirectToCheckout({ sessionId })
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
            Subscribe Now
        </button>
    )
}
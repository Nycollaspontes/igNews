import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js'

import styles from './styles.module.scss';

// Tipagem da StripeSessionProps
interface  SubscribeButtonProps {
    priceId : string;
}


// Exportando a  funcao como subscribe button
export function SubscribeButton() {
    const session  = useSession();      
    const router = useRouter();

    console.log(session)


    async function handleSubscribe() {
        if (!session) {
            signIn('github')
            
        }

        if (session.data.activeSubscription) {
            router.push('/posts');
            return;
        }
        try {
            const response = await api.post('/subscribe')
            const  {sessionId: {id}}  = response.data;

            const  stripe = await getStripeJs()

            await  stripe.redirectToCheckout({sessionId: id})
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
            View Posts
        </button>
    );
}
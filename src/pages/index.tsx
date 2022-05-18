import styles from './home.module.scss'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'


//Interface Do que vai ser passado como propriedade pro Home  
interface HomeProps {
  product: {
    priceId: string;
    amount: Number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Ig.News | Home</title>
      </Head>

      <main className={styles.contentContainer}>
        <section>
          <span>👏 Hey, welcome!</span>
          <h1>News about  the <span> React</span> world.</h1>
          <p>
            Get acess to all the publications
            <br />
              <span>
              for {product.amount} month
              </span>
          

          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img className={styles.hero} src="/images/avatar.svg" alt="Girl Coding" />

      </main>
    </>
  )
}


// Utilizando a Api do Stripe para capturar o valor do produto
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KxyMpEQ3WEejB9clPP2D6o9', {
    expand: ['product']
  })

  // Crio o produto recebendo os valores vindos da api que estao guarados na variavel price 

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('pt-BR',
      { style: 'currency', currency: 'BRL' })
      .format(price.unit_amount / 100)
  }
  // Retorno das Props Para o Component
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24 //24 Hours
  }
}
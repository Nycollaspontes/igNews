// import Prismic from '@prismicio/client';

// export function getPrismicClient() {
//    const prismic = Prismic.client(
//      process.env.PRISMIC_ENDPOINT,
//     {
//       accessToken: process.env.PRISMIC_ACESS_TOKEN
//     }
//   )

//   return prismic;
// }
import * as prismic from "@prismicio/client";

/**
 * Retorna instância de Prismic client
 * @returns
 */
export function getPrismicClient() {
  const client = prismic.createClient(process.env.PRISMIC_ENDPOINT, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });
  return client;
}
import * as prismic from '@prismicio/client';

export const repositoryName = process.env.PRISMIC_ACESS_TOKEN;


export default function getPrismicClient(req? : unknown){
    
    const client = prismic.createClient(repositoryName, {
        accessToken : process.env.PRISMIC_ACESS_TOKEN,
    })



    return client;

}






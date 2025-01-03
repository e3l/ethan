import { Bebas_Neue, Montserrat, Open_Sans, Roboto_Flex } from 'next/font/google'; 

export const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400', variable: '--font-bebas-neue', fallback: ['sans-serif'] })
export const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })
export const opensans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans' })
export const roboto = Roboto_Flex({ subsets: ['latin'], variable: '--font-roboto-flex' })

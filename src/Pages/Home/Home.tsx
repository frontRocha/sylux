import { Link } from 'react-router-dom'

import { DeviceMobileCamera, Gauge, Money } from 'phosphor-react'

import phoneImage from '../../Assets/celulares.png'

export default function Home() {
    return (
        <main>
            <section className="bg-[url('Assets/Rectangle1.png')] bg-no-repeat bg-banner-mobile sm:bg-banner bg-cover w-full h-screen px-10">
                <div className="fontRal flex sm:flex-row flex-col justify-around sm:items-center h-screen max-w-[1400px] mx-auto">
                    <div>
                        <h1 className='text-4xl lg:text-6xl text-white font-thin leading-tight'>Gerencie <strong className='text-black font-bold'>seu</strong> <br /> <strong className='text-black font-bold'>bolso</strong> com <strong className='font-bold'>apenas</strong> <br /> <strong className='font-bold'>um clique</strong>!</h1>
                        <p className='text-white text-xl mt-5 mb-5'>Gerenciar seu dinheiro <br />
                            nunca foi tão fácil!</p>
                        <button className='text-primary bg-black rounded-2xl py-1 px-5'><Link to='/login'>Começar agora</Link></button>
                    </div>
                    <img className='hidden sm:block min-w-[150px] w-[25%]' src={phoneImage} alt="componentes" />
                </div>
            </section>
            <section className='mb-20 px-10 py-10'>
                <div className='max-w-[1400px] fontRal mx-auto'>
                    <h2 className='text-primary text-sm mb-3 font-bold'>Nosso sistema</h2>
                    <p className='text-xl sm:text-3xl font-semibold mb-10'>Uma forma rápida e fácil <br />
                        para que você tenha o <br />
                        necessário para se organizar</p>
                    <div className='flex flex-col md:flex-row max-w-[70%] divide-y-2 md:divide-y-0 md:divide-x-2 divide-primary gap-5'>
                        <p className='text-sm'>Pensado em produtividade e facilidade, a <strong>syLux</strong> trás a você
                            um sistema financeiro simples e acessível de qualquer lugar,
                            de uma forma totalmente <strong>GRATUITA</strong>, além de acompanhar um sistema para anotações para caso você precise anotar algo.</p>
                        <p className='text-sm pt-5 md:pt-0 md:pl-10'>Pensado em sua segurança, não pedimos nenhum
                            dado pessoal como CPF,RG ou qualquer tipo de número
                            de cartão de crédito ou débito.
                            Com apenas alguns cliques e ajustes, nosso sistema financeiro
                            estará rodando ao seu dispor.</p>
                    </div>
                </div>
            </section>
            <section className='bg-[url("Assets/Rectangle3.png")] bg-no-repeat bg-cover w-full h-screen flex items-center justify-center mb-20 px-10'>
                <div className='max-w-[1400px] flex flex-wrap items-center justify-center fontRal gap-2 sm:gap-20 text-white'>
                    <div className='max-w-[200px] flex flex-col items-center justify-center text-center gap-5 sm:gap-10'>
                        <div className='w-[50px] h-[50px] bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-2xl'><DeviceMobileCamera /></div>
                        <p className='text-sm'>Acesse nosso sistema sob qualquer dispositivo </p>
                    </div>
                    <div className='max-w-[200px] flex flex-col items-center justify-center text-center gap-5 sm:gap-10'>
                        <div className='w-[50px] h-[50px] bg-green-100 rounded-full text-2xl text-green-700 flex items-center justify-center'><Gauge /></div>
                        <p className='text-sm'>Trabalhe com um sistema de rápido acesso e resposta</p>
                    </div>
                    <div className='max-w-[200px] flex flex-col items-center justify-center text-center gap-5 sm:gap-10'>
                        <div className='w-[50px] h-[50px] bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center text-2xl'><Money /></div>
                        <p className='text-sm'>Oferecemos um sistema totalmente gratuito e acessivel</p>
                    </div>
                </div>
            </section>
            <section className='mb-40 px-10 bg-[url("Assets/dollars.png")] bg-contain'>
                <div className='fontRal max-w-[1400px] mx-auto'>
                    <h2 className='text-center text-2xl font-semibold'>Quais são os <strong className='text-primary font-semibold'>Benefícios</strong>?</h2>
                    <div className='mt-20'>
                        <h3 className='text-2xl mb-5'>A importância do <strong>controle financeiro</strong></h3>
                        <p className='max-w-[600px] text-sm'>O controle financeiro pessoal é a forma mais básica de cuidar do seu dinheiro.
                            Ao conhecer sobre a sua renda e seus gastos, você sabe o que pode ser melhorado
                            para sobrar mais dinheiro no fim do mês. Ou seja, se preocupar menos com as contas.
                            A maioria das pessoas não sabem quanto ganham e quanto gastam por mês. A consequência disso são descontrole financeiro, dívidas, falta de planejamento,
                            desmotivação e procrastinação de decisões que poderiam trazer mais conforto.
                            Quando estabelecer uma rotina de controle financeiro,
                            você vai mudar a sua forma de pensar em dinheiro e começa
                            a beneficiar-se de uma vida mais controlada.</p>
                    </div>
                    <div className='mt-20 text-right flex flex-col items-end'>
                        <h3 className='text-2xl mb-5'>Defina suas <strong>metas</strong></h3>
                        <p className='max-w-[600px] text-sm'>Essas reflexões são importantes para acrescentar motivação e significado no cumprimento
                            dos seus objetivos. Agora que você já tem uma ideia para onde ir, defina suas metas.
                            Faça uma lista de ações que precisam ser tomadas, em uma sequência lógica. Um degrau
                            de cada vez.</p>
                    </div>
                    <div className='mt-20'>
                        <h3 className='text-2xl mb-5'><strong>Mude</strong> seus <strong>hábitos</strong></h3>
                        <p className='max-w-[600px] text-sm'>Mentalize seus objetivos, sua imagem mental e o seu sucesso. Depois,
                            tenha força e resiliência para mudar seus hábitos. Isso significa:
                        </p>
                        <ul className='text-sm list-disc ml-4 mt-4'>
                            <li>Pensar duas vezes antes de comprar algo;</li>
                            <li>Comparar preços;</li>
                            <li>Negociar descontos;</li>
                            <li>Pagar à vista;</li>
                            <li>Abrir mão de algumas coisas.</li>
                        </ul>
                    </div>
                </div>
            </section>
        </main>
    )
}
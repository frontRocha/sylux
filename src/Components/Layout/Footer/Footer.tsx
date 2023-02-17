import {AiFillGithub, AiFillLinkedin} from 'react-icons/ai'
import { RiWhatsappFill } from 'react-icons/ri'

export default function Footer() {
    return (
        <footer className="bg-black py-20 fontRal mt-20">
            <h4 className="text-white text-center text-4xl">SyLux</h4>
            <p className="text-white font-sm text-center my-10">Uma jornada de mil quilômetros precisa <br />
                começar com um simples passo.</p>
            <div className="flex items-center justify-center flex-wrap gap-5 px-10">
                <a href="https://github.com/frontRocha" target='_blank' className='text-2xl text-white'><AiFillGithub /></a>
                <a href="https://api.whatsapp.com/send?phone=5543998293565" target='_blank' className='text-2xl text-white'><RiWhatsappFill /></a>
                <a href="https://www.linkedin.com/in/frontRocha" target='_blank' className='text-2xl text-white'><AiFillLinkedin /></a>
            </div>
        </footer>
    )
}
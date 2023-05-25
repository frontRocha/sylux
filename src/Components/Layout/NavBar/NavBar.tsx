import { Link } from 'react-router-dom'
import logo from '../../../Assets/logo.png'

export default function NavBar() {

    return(
        <header className='h-auto bg-primary px-10 relative py-4'>
            <nav className='flex items-center justify-center sm:justify-between flex-wrap fontPop gap-5'>
                <Link to="/"><img className='h-14' src={logo} alt="Sylux"/></Link>
                <ul className='text-white flex items-center gap-5 text-sm'>
                    <Link to="/feedback"><li>Feedback</li></Link>
                    <Link to="/talkme"><li>Fale conosco</li></Link>
                    <Link className='bg-white py-1 px-5 text-black rounded-xl' to="/login">Começar</Link>
                </ul>
            </nav>
        </header>
    )
}
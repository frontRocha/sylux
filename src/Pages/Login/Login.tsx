import { useContext } from 'react'

import { AuthFirebase } from '../../Context/Auth'

import imageLogin from '../../Assets/imageLogin.png'
import googleLogin from '../../Assets/google.png'

export default function Login() {

    const { runAuth } = useContext(AuthFirebase)

    const handleData = async (): Promise<void> => {
        runAuth()
    }

    return (
        <section className='bg-[#F6F9FC]'>
            <div className='flex justify-between h-auto min-h-screen fontPop'>
                <h1 className='hidden md:block text-primary text-2xl font-bold py-5 px-5 relative z-50'>SyLux</h1>
                <div className='hidden w-screen md:flex justify-center items-center z-10'>
                    <img className='md:w-[400px] lg:w-[500px]' src={imageLogin} alt="ilustração" />
                </div>
                <div className='w-full md:w-[500px] bg-primary md:ml-14'>
                    <h3 className='text-center text-white text-3xl pt-20'>LOGIN</h3>
                    <div className='flex flex-col-reverse items-center justify-center h-[600px] gap-3 text-sm'>
                        <button onClick={handleData} className='flex items-center gap-3 bg-white rounded-3xl py-2 px-4 border border-black'>
                            <img className='w-7' src={googleLogin} alt="google" />
                            <p className='font-semibold'>Fazer login com google</p>
                        </button>
                    </div>
                    <h1 className='block md:hidden text-center font-bold text-white text-xl'>SyLux</h1>
                </div>
            </div>
        </section>
    )
}
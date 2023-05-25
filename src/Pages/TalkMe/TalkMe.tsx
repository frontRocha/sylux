import { RiGithubFill, RiLinkedinFill, RiWhatsappFill } from "react-icons/ri";
import NavBar from "../../Components/Layout/NavBar/NavBar";

export default function TalkMe() {
    return (
        <div>
            <NavBar />
            <section className="h-[700px] min-h-screen flex flex-col justify-center items-center">
                <div className="w-full text-center">
                    <h2 className="text-xl fontPop py-4">Entre em contato comigo!</h2>
                    <div className="w-ful h-[300px] bg-primary flex items-center justify-center gap-10">
                        <a className="text-2xl text-white bg-black py-2 px-2 rounded-full" href="https://github.com/frontRocha" target='_blank' ><RiGithubFill /></a>
                        <a className="text-2xl text-white bg-black py-2 px-2 rounded-full" href="https://www.linkedin.com/in/frontRocha" target='_blank'><RiLinkedinFill /></a>
                        <a className="text-2xl text-white bg-black py-2 px-2 rounded-full" href="https://api.whatsapp.com/send?phone=5543998293565" target='_blank'><RiWhatsappFill /></a>
                    </div>
                </div>
            </section>
        </div>
    )
}
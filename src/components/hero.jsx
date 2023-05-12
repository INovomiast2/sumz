import { logo } from "../assets";


const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="sumz_logo" className="w-28 object-contain" draggable="false"/>
        <button type="button" onClick={() => window.open('https://github.com/INovomiast-IESFuengirola1/sumz')} className="black_btn">
          GitHub
        </button>
      </nav>

      <h1 className="head_text">
        Resume Articulos con <br className="max-md:hidden"/>
        <span className="orange_gradient">
          OpenAI GPT-4          
        </span>
      </h1>
      <h2 className="desc">
        Simplifica tu lectura con <span className="grad_one">Sumz</span>, una herramienta
        Open-Source que con la tecnología de GPT-4 te resume
        cualquier artículo largo y pesado en un resumen claro
        y conciso.
      </h2>
    </header>
  )
}

export default Hero
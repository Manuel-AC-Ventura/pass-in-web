import nlwUniteIcon from "../assets/nwl-unite-icon.svg"
import { NavLink } from "./navLink"

export const Header = ()=>{
  <a className="font-medium text-zinc-300 text-sm" href="">Eventos</a>

  return(
    <div className="flex items-center gap-5 py-2">
      <img src={nlwUniteIcon} />

      <nav className="flex items-center gap-5">
        <NavLink href="/eventos">Eventos</NavLink>
        <NavLink href="/participantes">Participantes</NavLink>
      </nav>
    </div>
  )
}
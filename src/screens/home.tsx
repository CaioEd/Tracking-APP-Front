import Header from "@/components/Header";
import { Link } from "react-router-dom";

import bgimage from "../assets/bg-initial.avif"

export default function Home() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgimage})`, // .src pega o caminho da imagem importada
      }}
    >
      <Header />

      <main className="mt-10 flex flex-col row-start-2 items-center sm:items-start">

        <div className="flex flex-col itens-center justify-center items-center flex-col text-white m-auto">
          <Link to="/new-route">
            <button className="btn-base"> Criar Nova rota</button>
          </Link>

          <Link to="/driver">
            <button className="btn-base">Iniciar uma rota</button>
          </Link>

          <Link to="/admin">
            <button className="btn-base">Mapa - Admin</button>
          </Link>
        </div>

      </main>
    </div>
  );
}

import React, { useContext, useState } from "react";
import { productContexto } from "./Contexto";
import coin from "./assets/icons/coin.svg";
import derecha from "./assets/icons/arrow-right.svg";
import izquierda from "./assets/icons/arrow-left.svg";
export default function History() {
  const { his } = useContext(productContexto);
  let sum = 0;
  his.forEach((value) => {
    sum += value.cost;
  });

  const [pagina, setPagina] = useState([0, 8]);

  function avance() {
    pagina[1] >= 8 && pagina[1] + 8 <= his.length
      ? setPagina(pagina.map((value) => value + 8))
      : setPagina(pagina.map((value) => value + (his.length - pagina[1])));
  }

  function atras() {
    pagina[1] > 8 && pagina[1] % 8 === 0
      ? setPagina(pagina.map((value) => value - 8))
      : setPagina(pagina.map((value) => value - (pagina[1] % 8)));
  }

  return (
    <div>
      <div className="w-100">
        <div className="row m-auto mt-2 w">
          <h3 className="col m-auto">Gastado</h3>
          <div className="col align-items-center row x ">
            <p id="s" className=" col-6 ">
              {sum}
            </p>
            <img className="col-6 s" src={coin} alt="moneda" />
          </div>
        </div>
      </div>

      <h3 className="mt-5">History</h3>
      <hr />

      <div className="row align-items-center justify-content-center">
        <h3 className="col-9">
          {pagina[1]} of {his.length} products
        </h3>
        <button
          onClick={() => atras()}
          className={pagina[1] > 8 ? "col-1" : "d-none"}
        >
          <img src={izquierda} alt="siguiente" />
        </button>
        <button
          onClick={() => avance()}
          className={pagina[1] < his.length ? "col-1" : "d-none"}
        >
          <img src={derecha} alt="siguiente" />
        </button>
      </div>

      <div>
        {his.slice(pagina[0], pagina[1]).map((value, index) => (
          <div key={index} className="row justify-content-center">
            <div className="col-12 row justify-content-center align-items-center">
              <img src={value.img.url} className="col-4 imagen" alt="foto" />
              <p className="col-4" id="p">
                {value.name}
              </p>
              <div className="col-4 d-flex align-items-center">
                <p className="align-items-center text-center" id="p">
                  {value.cost}
                </p>
                <img className="qwe" src={coin} alt="" />
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

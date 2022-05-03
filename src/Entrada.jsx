import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { productContexto } from "./Contexto";
import aerolab from "./assets/icons/aerolab-logo.svg";
import coin from "./assets/icons/coin.svg";
import imagen1 from "./assets/icons/header-x1.png";
export default function Entrada() {
  const { usuario, token, setUsuario } = useContext(productContexto);
  function point() {
    fetch("https://coding-challenge-api.aerolab.co/user/points", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ amount: 1000 }),
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data))
      .then(() => {
        fetch("https://coding-challenge-api.aerolab.co/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((resp) => resp.json())
          .then((data) => setUsuario(data));
      })
      .catch((e) => console.log(e));
  }
  return (
    <div>
      <div className="nav container m-auto d-flex justify-content-between">
        <Link
          className="logo d-flex justify-content-center align-items-center"
          to="/"
        >
          <div>
            <img src={aerolab} alt="ig" />
          </div>
        </Link>
        <div className="d-flex justify-content-center" id="ficha">
          <div className="usuario d-flex align-items-center justify-content-center">
            <p id="s">{usuario.name}</p>
          </div>
          <div className="d-flex align-items-center justify-content-center m-2 link">
            <Link to="/history">Historial</Link>
          </div>
          <div className="d-flex m-1 align-items-center justify-content-center puntos">
            <p id="s" className="m-2">
              {usuario.points}
            </p>
            <img src={coin} alt="moneda" />
          </div>
          <button onClick={point}>+1000</button>
        </div>
      </div>
      <div className="entrada w-100">
        <img src={imagen1} alt="imagen de entrada" />
        <h3 className="Elec">Electronics</h3>
      </div>
    </div>
  );
}

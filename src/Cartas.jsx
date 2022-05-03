import React, { useContext, useState, useEffect } from "react";
import { productContexto } from "./Contexto";
import Card from "react-bootstrap/Card";
import coin from "./assets/icons/coin.svg";
import icon1 from "./assets/icons/buy-blue.svg";
import icon2 from "./assets/icons/buy-white.svg";
import derecha from "./assets/icons/arrow-right.svg";
import izquierda from "./assets/icons/arrow-left.svg";
export default function Cartas() {
  const { productos, usuario, token, setUsuario, setHis } =
    useContext(productContexto);

  const origen = [...productos];
  const menor = [...productos].sort((a, b) => a.cost - b.cost);
  const mayor = [...productos].sort((a, b) => b.cost - a.cost);

  const [orden, setOrden] = useState(productos);
  const [paginas, setPaginas] = useState([0, 16]);

  function sum() {
    paginas[1] !== Number(productos.length) &&
    Number(productos.length) - paginas[1] > 0
      ? setPaginas(paginas.map((value) => value + 16))
      : console.log("limite de la suma");
  }

  function rest() {
    paginas[1] === Number(productos.length) &&
    Number(productos.length) - paginas[1] === 0
      ? setPaginas(paginas.map((value) => value - 16))
      : console.log("limite de la resta");
  }

  useEffect(() => setOrden([...productos]), [productos]);

  function compra(ids) {
    fetch("https://coding-challenge-api.aerolab.co/redeem", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ productId: String(ids) }),
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
      .then(() => {
        fetch("https://coding-challenge-api.aerolab.co/user/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((resp) => resp.json())
          .then((data) => setHis(data));
      })
      .catch((e) => console.log(e));
  }
  return (
    <>
      <div className="row align-items-center w-75 m-auto pt-2">
        <h3 className="col-12 col-lg-3 producto linea">
          {paginas[1]} of {productos.length} products
        </h3>
        <div className="col row align-items-center sort">
          <h2 className="col-12 col-md-4 col-lg-2 producto">Sort by:</h2>
          <button
            className="m-2 h-auto col-10 col-md-3 col-lg-2 orden"
            onClick={() => setOrden(origen)}
          >
            Most recent
          </button>
          <button
            className="m-2 h-auto col-4 col-md-3 col-lg-2 orden"
            onClick={() => setOrden(menor)}
          >
            Lowest price
          </button>
          <button
            className="m-2 h-auto col-4 col-lg-2 orden"
            onClick={() => setOrden(mayor)}
          >
            Highest price
          </button>
          <button
            onClick={() => sum()}
            className={
              productos.length - paginas[1] !== 0
                ? "m-2 col-2 col-md-1 col-lg-1"
                : "m-2 col-2 col-md-1 col-lg-1 d-none"
            }
          >
            <img src={derecha} alt="" />
          </button>
          <button
            onClick={() => rest()}
            className={
              productos.length - paginas[1] === 0
                ? "m-2 col-2 col-md-1 col-lg-1"
                : "m-2 col-2 col-md-1 col-lg-1 d-none"
            }
          >
            <img src={izquierda} alt="" />
          </button>
        </div>
      </div>
      <hr className="w-75 m-auto" />
      <div className="m-auto row w-75 justify-content-center">
        {orden.slice(paginas[0], paginas[1]).map((value, index) => (
          <div
            className="col-12 col-sm-12 col-md-6 col-lg-4 col-lx-4 position-relative over pt-2"
            key={index}
          >
            <Card className="over1" style={{ width: "18rem" }}>
              <Card.Img variant="top" src={value.img.url} />
              <Card.Body>
                <Card.Title>{value.category}</Card.Title>
                <Card.Text>{value.name}</Card.Text>
              </Card.Body>
              <div className="position-absolute top-0 end-0 m-2">
                {usuario.points >= value.cost ? (
                  <img src={icon1} alt="icon" />
                ) : (
                  <div className="falta">
                    <span>You need {value.cost - usuario.points}</span>
                    <img src={coin} alt="coin" />
                  </div>
                )}
              </div>
              {usuario.points >= value.cost ? (
                <div className="position-absolute top-50 start-50 translate-middle overlay">
                  <img
                    className="position-absolute top-0 end-0 m-1"
                    src={icon2}
                    alt="icon2"
                  />
                  <div className="precio row">
                    <h2 className="col mt-2">{value.cost}</h2>
                    <img className="col align-self-start" src={coin} alt="" />
                  </div>
                  <button
                    className="redeem"
                    onClick={() => {
                      compra(value._id);
                    }}
                  >
                    Redeem now
                  </button>
                </div>
              ) : (
                ""
              )}
            </Card>
          </div>
        ))}
      </div>
      <div className="row align-items-center w-75 m-auto pt-2">
        <h3 className="col-12 col-lg-3 producto linea">
          {paginas[1]} of {productos.length} products
        </h3>
        <div className="col row align-items-center sort h">
          <button
            onClick={() => sum()}
            className={
              productos.length - paginas[1] !== 0
                ? "m-2 col-2 col-md-1 col-lg-1"
                : "m-2 col-2 col-md-1 col-lg-1 d-none"
            }
          >
            <img src={derecha} alt="" />
          </button>
          <button
            onClick={() => rest()}
            className={
              productos.length - paginas[1] === 0
                ? "m-2 col-2 col-md-1 col-lg-1"
                : "m-2 col-2 col-md-1 col-lg-1 d-none"
            }
          >
            <img src={izquierda} alt="" />
          </button>
        </div>
      </div>
      <div className="w-100">as</div>
    </>
  );
}

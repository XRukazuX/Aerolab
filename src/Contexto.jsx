import React, { createContext, useEffect, useState } from "react";

export const productContexto = createContext();

export default function Contexto({ children }) {
  const [usuario, setUsuario] = useState([]);
  const [productos, setProductos] = useState([]);
  const [his, setHis] = useState([]);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU0NzhiMjA2MWMwNDAwMjE0ZmRiZDQiLCJpYXQiOjE2NDk3MDMwOTB9.sIF2ePc1ViECmTilFNEc7eaCk0x7Fc2b7Zl3wJGfVW8";

  useEffect(() => {
    fetch("https://coding-challenge-api.aerolab.co/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => setProductos(data))
      .catch((e) => console.log(e));

    fetch("https://coding-challenge-api.aerolab.co/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => setUsuario(data))
      .catch((e) => console.log(e));

    fetch("https://coding-challenge-api.aerolab.co/user/history", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => resp.json())
      .then((data) => setHis(data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <productContexto.Provider
      value={{
        productos,
        setProductos,
        usuario,
        setUsuario,
        setHis,
        his,
        token,
      }}
    >
      {children}
    </productContexto.Provider>
  );
}

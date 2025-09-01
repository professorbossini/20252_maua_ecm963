import { useState } from 'react'

export default (valorInicial: number = 0) => {
  const [contador, setContador] = useState(valorInicial)

  const incrementar = () => setContador(contador + 1)

  const decrementar = () => setContador(contador - 1)

  const reiniciar = () => setContador(valorInicial)

  return {
    contador, incrementar, decrementar, reiniciar
  }
}
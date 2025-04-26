import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaPlus, FaMinus } from 'react-icons/fa';
import acidtrollfondo from '../assets/acidtrollfondo.png';

function ListaPersonas() {
  const [personas, setPersonas] = useState(() => {
    const storedPersonas = localStorage.getItem('listaPersonas');
    return storedPersonas ? JSON.parse(storedPersonas) : [];
  });
  const [nuevoNombre, setNuevoNombre] = useState('');

  useEffect(() => {
    if (personas.length > 0) {
      localStorage.setItem('listaPersonas', JSON.stringify(personas));
    } else if (localStorage.getItem('listaPersonas')) {
      localStorage.removeItem('listaPersonas');
    }
  }, [personas]);

  const agregarPersona = () => {
    if (nuevoNombre.trim()) {
      setPersonas([...personas, {
        id: uuidv4(),
        nombre: nuevoNombre,
        bebidas: 0,
        cervezas: 0,
        choripanes: 0,
        papasFritas: 0,
      }]);
      setNuevoNombre('');
    }
  };

  const actualizarCantidad = (idPersona, tipo, cantidad) => {
    setPersonas(personas.map(persona =>
      persona.id === idPersona
        ? { ...persona, [tipo]: Math.max(0, persona[tipo] + cantidad) }
        : persona
    ));
  };

  const eliminarPersona = (idPersona) => {
    setPersonas(personas.filter(persona => persona.id !== idPersona));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center p-4 sm:p-6"
      style={{ backgroundImage: `url(${acidtrollfondo})` }}
    >
      <div className="bg-white bg-opacity-80 p-6 sm:p-8 rounded-md shadow-md w-full max-w-lg">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">Lista de Personas y Consumos</h2>

        <div className="mb-4 flex flex-col sm:flex-row items-center gap-2">
          <input
            type="text"
            placeholder="Nombre de la persona"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline sm:ml-2"
            onClick={agregarPersona}
          >
            Añadir
          </button>
        </div>

        {personas.length === 0 && !localStorage.getItem('listaPersonas') ? (
          <p className="text-gray-700">No hay personas en la lista.</p>
        ) : personas.length === 0 && localStorage.getItem('listaPersonas') ? (
          <p className="text-gray-700">La lista está vacía.</p>
        ) : (
          <ul className="space-y-2">
            {personas.map(persona => (
              <li key={persona.id} className="bg-gray-100 bg-opacity-70 p-3 sm:p-4 border rounded-md">
                <div className="flex justify-between items-center mb-2 text-gray-800">
                  <h3 className="font-semibold text-lg sm:text-xl">{persona.nombre}</h3>
                  <button
                    className="text-red-500 hover:text-red-700 focus:outline-none text-sm sm:text-base"
                    onClick={() => eliminarPersona(persona.id)}
                  >
                    Eliminar
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base">Bebidas: {persona.bebidas}</span>
                    <div className="flex">
                      <button onClick={() => actualizarCantidad(persona.id, 'bebidas', 1)} className="text-green-500 hover:text-green-700 focus:outline-none text-sm sm:text-base"><FaPlus /></button>
                      <button onClick={() => actualizarCantidad(persona.id, 'bebidas', -1)} className="ml-1 text-red-500 hover:text-red-700 focus:outline-none text-sm sm:text-base"><FaMinus /></button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base">Cervezas: {persona.cervezas}</span>
                    <div className="flex">
                      <button onClick={() => actualizarCantidad(persona.id, 'cervezas', 1)} className="text-green-500 hover:text-green-700 focus:outline-none text-sm sm:text-base"><FaPlus /></button>
                      <button onClick={() => actualizarCantidad(persona.id, 'cervezas', -1)} className="ml-1 text-red-500 hover:text-red-700 focus:outline-none text-sm sm:text-base"><FaMinus /></button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base">Choripanes: {persona.choripanes}</span>
                    <div className="flex">
                      <button onClick={() => actualizarCantidad(persona.id, 'choripanes', 1)} className="text-green-500 hover:text-green-700 focus:outline-none text-sm sm:text-base"><FaPlus /></button>
                      <button onClick={() => actualizarCantidad(persona.id, 'choripanes', -1)} className="ml-1 text-red-500 hover:text-red-700 focus:outline-none text-sm sm:text-base"><FaMinus /></button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm sm:text-base">Papas Fritas: {persona.papasFritas}</span>
                    <div className="flex">
                      <button onClick={() => actualizarCantidad(persona.id, 'papasFritas', 1)} className="text-green-500 hover:text-green-700 focus:outline-none text-sm sm:text-base"><FaPlus /></button>
                      <button onClick={() => actualizarCantidad(persona.id, 'papasFritas', -1)} className="ml-1 text-red-500 hover:text-red-700 focus:outline-none text-sm sm:text-base"><FaMinus /></button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ListaPersonas;
import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaPlus, FaMinus } from 'react-icons/fa';
import acidtrollfondo from '../assets/acidtrollfondo.png';

function ListaPersonas() {
  const precios = {
    bebidas: 1500,
    cervezas: 1000,
    cervezasGrandes: 2000,
    energeticas: 2000,
    chocman: 500,
    choripanes: 1500,
    papasFritas: 1000,
  };

  const [personas, setPersonas] = useState(() => {
    const storedPersonas = localStorage.getItem('listaPersonas');
    return storedPersonas ? JSON.parse(storedPersonas) : [];
  });
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const personRefs = useRef({});

  useEffect(() => {
    const sortedPersonas = [...personas].sort((a, b) =>
      a.nombre.localeCompare(b.nombre)
    );
    localStorage.setItem('listaPersonas', JSON.stringify(sortedPersonas));
  }, [personas]);

  const agregarPersona = () => {
    if (nuevoNombre.trim()) {
      const nuevaPersona = {
        id: uuidv4(),
        nombre: nuevoNombre.toUpperCase(),
        bebidas: 0,
        cervezas: 0,
        cervezasGrandes: 0,
        energeticas: 0,
        chocman: 0,
        choripanes: 0,
        papasFritas: 0,
      };
      setPersonas(prevPersonas => {
        const updatedPersonas = [...prevPersonas, nuevaPersona];
        return updatedPersonas;
      });
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

  const calcularTotal = (persona) => {
    return (
      persona.bebidas * precios.bebidas +
      persona.cervezas * precios.cervezas +
      persona.cervezasGrandes * precios.cervezasGrandes +
      persona.energeticas * precios.energeticas +
      persona.chocman * precios.chocman +
      persona.choripanes * precios.choripanes +
      persona.papasFritas * precios.papasFritas
    );
  };

  const eliminarPersona = (idPersona) => {
    setPersonas(personas.filter(persona => persona.id !== idPersona));
  };

  const sortedPersonasForRender = [...personas].sort((a, b) =>
    a.nombre.localeCompare(b.nombre)
  );

  const handleSearch = () => {
    const foundPerson = sortedPersonasForRender.find(persona =>
      persona.nombre.includes(searchTerm.toUpperCase())
    );

    if (foundPerson && personRefs.current[foundPerson.id]) {
      personRefs.current[foundPerson.id].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
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

        <div className="mb-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="Buscar persona..."
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSearch}
          >
            Buscar
          </button>
        </div>

        {personas.length === 0 && !localStorage.getItem('listaPersonas') ? (
          <p className="text-gray-700">No hay personas en la lista.</p>
        ) : personas.length === 0 && localStorage.getItem('listaPersonas') ? (
          <p className="text-gray-700">La lista está vacía.</p>
        ) : (
          <ul className="space-y-4">
            {sortedPersonasForRender.map(persona => (
              <li
                key={persona.id}
                className="bg-gray-100 bg-opacity-70 p-6 sm:p-8 border rounded-md"
                ref={el => (personRefs.current[persona.id] = el)}
              >
                <div className="flex justify-between items-center mb-4 text-gray-800">
                  <h3 className="font-semibold text-lg sm:text-xl">{persona.nombre}</h3>
                  <button
                    className="text-red-500 hover:text-red-700 focus:outline-none text-sm sm:text-base"
                    onClick={() => eliminarPersona(persona.id)}
                  >
                    Eliminar
                  </button>
                </div>
                {/* ... (resto del código de la persona) ... */}
                <div className="grid grid-cols-2 gap-y-4 md:grid-cols-3 lg:grid-cols-4">
                  <div className="border rounded-md p-3 flex flex-col items-center">
                    <span className="text-sm sm:text-base mb-1">Bebidas</span>
                    <div className="flex">
                      <button onClick={() => actualizarCantidad(persona.id, 'bebidas', 1)} className="text-green-500 hover:text-green-700 focus:outline-none text-sm sm:text-base"><FaPlus /></button>
                      <span className="mx-2 text-gray-700 text-sm sm:text-base">{persona.bebidas}</span>
                      <button onClick={() => actualizarCantidad(persona.id, 'bebidas', -1)} className="text-red-500 hover:text-red-700 focus:outline-none text-sm sm:text-base"><FaMinus /></button>
                    </div>
                  </div>
                  <div className="border rounded-md p-3 flex flex-col items-center">
                    <span className="text-sm sm:text-base mb-1">Cervezas</span>
                    <div className="flex">
                      <button onClick={() => actualizarCantidad(persona.id, 'cervezas', 1)} className="text-green-500 hover:text-green-700 focus:outline-none text-sm sm:text-base"><FaPlus /></button>
                      <span className="mx-2 text-gray-700 text-sm sm:text-base">{persona.cervezas}</span>
                      <button onClick={() => actualizarCantidad(persona.id, 'cervezas', -1)} className="text-red-500 hover:text-red-700 focus:outline-none text-sm sm:text-base"><FaMinus /></button>
                    </div>
                  </div>
                  <div className="border rounded-md p-3 flex flex-col items-center">
                    <span className="text-sm sm:text-base mb-1">Cervezas G</span>
                    <div className="flex">
                      <button onClick={() => actualizarCantidad(persona.id, 'cervezasGrandes', 1)} className="text-green-500 hover:text-green-700 focus:outline-none text-sm sm:text-base"><FaPlus /></button>
                      <span className="mx-2 text-gray-700 text-sm sm:text-base">{persona.cervezasGrandes}</span>
                      <button onClick={() => actualizarCantidad(persona.id, 'cervezasGrandes', -1)} className="text-red-500 hover:text-red-700 focus:outline-none text-sm sm:text-base"><FaMinus /></button>
                    </div>
                  </div>
                  <div className="border rounded-md p-3 flex flex-col items-center">
                    <span className="text-sm sm:text-base mb-1">Energéticas</span>
                    <div className="flex">
                      <button onClick={() => actualizarCantidad(persona.id, 'energeticas', 1)} className="text-green-500 hover:text-green-700 focus:outline-none text-sm sm:text-base"><FaPlus /></button>
                      <span className="mx-2 text-gray-700 text-sm sm:text-base">{persona.energeticas}</span>
                      <button onClick={() => actualizarCantidad(persona.id, 'energeticas', -1)} className="text-red-500 hover:text-red-700 focus:outline-none text-sm sm:text-base"><FaMinus /></button>
                    </div>
                  </div>
                  <div className="border rounded-md p-3 flex flex-col items-center">
                    <span className="text-sm sm:text-base mb-1">Chocman</span>
                    <div className="flex">
                      <button onClick={() => actualizarCantidad(persona.id, 'chocman', 1)} className="text-green-500 hover:text-green-700 focus:outline-none text-sm sm:text-base"><FaPlus /></button>
                      <span className="mx-2 text-gray-700 text-sm sm:text-base">{persona.chocman}</span>
                      <button onClick={() => actualizarCantidad(persona.id, 'chocman', -1)} className="text-red-500 hover:text-red-700 focus:outline-none text-sm sm:text-base"><FaMinus /></button>
                    </div>
                  </div>
                  <div className="border rounded-md p-3 flex flex-col items-center">
                    <span className="text-sm sm:text-base mb-1">Choripanes</span>
                    <div className="flex">
                      <button onClick={() => actualizarCantidad(persona.id, 'choripanes', 1)} className="text-green-500 hover:text-green-700 focus:outline-none text-sm sm:text-base"><FaPlus /></button>
                      <span className="mx-2 text-gray-700 text-sm sm:text-base">{persona.choripanes}</span>
                      <button onClick={() => actualizarCantidad(persona.id, 'choripanes', -1)} className="text-red-500 hover:text-red-700 focus:outline-none text-sm sm:text-base"><FaMinus /></button>
                    </div>
                  </div>
                  <div className="border rounded-md p-3 flex flex-col items-center">
                    <span className="text-sm sm:text-base mb-1">Papas Fritas</span>
                    <div className="flex">
                      <button onClick={() => actualizarCantidad(persona.id, 'papasFritas', 1)} className="text-green-500 hover:text-green-700 focus:outline-none text-sm sm:text-base"><FaPlus /></button>
                      <span className="mx-2 text-gray-700 text-sm sm:text-base">{persona.papasFritas}</span>
                      <button onClick={() => actualizarCantidad(persona.id, 'papasFritas', -1)} className="text-red-500 hover:text-red-700 focus:outline-none text-sm sm:text-base"><FaMinus /></button>
                    </div>
                  </div>
                  <div className="mt-4 text-sm sm:text-base font-semibold text-gray-900 col-span-2 md:col-span-3 lg:col-span-4">
                    Total: ${calcularTotal(persona)}
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
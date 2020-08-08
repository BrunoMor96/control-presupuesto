import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';
import shortid from 'shortid'

const Formulario = ({ guardarGasto, guardarCrearGasto }) => {

    //AGREGANDO STATE
    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);


    //CUANDO EL USUARIO AGREGA UN GASTO
    const agregarGasto = e => {
        e.preventDefault();

        //VALIDAR
        if (cantidad < 1 || isNaN(cantidad) || nombre.trim() === '') {
            guardarError(true);
            return
        }

        //CONSTRUIR EL GASTO
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }

        //PASANDO EL GASTO AL COMPONENTE PRINCIPAL
        guardarGasto(gasto);
        guardarCrearGasto(true);

        //RESETEAR EL FORM
        guardarNombre('');
        guardarCantidad(0);
    }


    return (
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos aqui</h2>

            {error
                ? <Error mensaje="Ambos casos son obligatorios o presupuesto incorrecto" />
                : null
            }

            <div className="gasto">
                <label>Nombre gasto</label>

                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Transporte"
                    value={nombre}
                    onChange={e => guardarNombre(e.target.value)}
                />

                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 300"
                    value={cantidad}
                    onChange={e => guardarCantidad(parseInt(e.target.value, 10))}
                />

                <input
                    type="submit"
                    className="button-primary u-full-width"
                    calue="Agregar Gasto" />
            </div>
        </form>
    );
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired,
}
export default Formulario;
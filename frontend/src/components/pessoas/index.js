import React, { useEffect, useState } from "react";
import './styles.css';
import api from "../../services/api";

export default function Usuario(){  

    const [lista,setLista] = useState([]);

    useEffect(() => {
        if(lista.length <= 0){
            api.get('usuario').then(
                response => {
                    setLista(response.data);
                }
            )
        }
    })

    return (
        <div>
            <h1>Relação de Pessoas</h1>
            {
                lista.usuarios.map(pessoa => (
                    <span>{pessoa.nome} - {pessoa.email} <br /></span>
                ))
            }
        </div>
    )
}
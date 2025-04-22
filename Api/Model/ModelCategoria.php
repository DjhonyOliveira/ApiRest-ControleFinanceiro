<?php

namespace Api\Model;

/**
 * Modelo de categoria
 * @package Api
 * @subpackage Model
 * @author Djonatan R de Oliveira
 * @since 21/04/2025
 */
class ModelCategoria extends Model
{
    public function __construct()
    {
        parent::__construct('categoria', ['id'], ['nome', 'tipo']);
    }

    public  function fetchAll(): ?array
    {
        $this->query = 'SELECT * FROM ' . self::$entity;

        $aRetorno = $this->fetch(true);

        return $aRetorno;
    }

    public function criaCategoria(array $data): bool
    {
        if(!is_null($this->create($data))){
            return true;
        }

        return false;
    }

    public function atualizaCategoria(array $data, $idCategoria): bool
    {
        if(!is_null($this->update($data, "id = :id", "id={$idCategoria}"))){
            return true;
        }

        return false;
    }

}
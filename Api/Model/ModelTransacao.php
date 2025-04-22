<?php

namespace Api\Model;

/**
 * Modelo de transação
 * @package Api
 * @subpackage Model
 * @author Djonatan R de Oliveira
 * @since 21/04/2025
 */
class ModelTransacao extends Model
{
    public function __construct()
    {
        parent::__construct('transacao', ['id', 'user_id', 'categoria_id'], ['valor', 'data', 'descricao']);
    }

    /**
     * Retorna todos os dados da tabela
     * @return array|mixed|Model|null
     */
    public function fetchAll(): ?array
    {
        $this->query = 'SELECT * FROM ' . self::$entity;

        $aRetorno = $this->fetch(true);

        return $aRetorno;
    }

    /**
     * Cria uma transação
     * @param array $data
     * @return bool
     */
    public function criaTransacao(array $data): bool
    {
        if(!is_null($this->create($data))){
            return true;
        }

        return false;
    }

}
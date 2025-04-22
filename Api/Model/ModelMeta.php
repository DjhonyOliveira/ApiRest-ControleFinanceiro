<?php

namespace Api\Model;

/**
 * Model de meta
 * @package Api
 * @subpackage Model
 * @author Djonatan R de Oliveira
 * @since 21/04/2025
 */
class ModelMeta extends Model
{
    public function __construct()
    {
        parent::__construct('metas', ['id', 'user_id'], ['nome', 'valor_alvo', 'data_limite']);
    }

    public function fetchAll(): ?array
    {
        $this->query = 'SELECT * FROM ' . self::$entity;

        $aRetorno = $this->fetch(true);

        return $aRetorno;
    }

    public function criaMeta(array $aDados): bool
    {
        if(!is_null($this->create($aDados))){
            return true;
        }

        return false;
    }

    public function atualizaMeta(array $dados, int $idMeta)
    {
        if($this->update($dados, 'id=:id', "id={$idMeta}")){
            return true;
        }

        return false;
    }

}
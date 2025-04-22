<?php

namespace Api\Model;

class ModelUsuario extends Model
{

    public function __construct()
    {
        parent::__construct('usuarios', ['id'], ['nome', 'email']);
    }

    public function fetchAll()
    {
        $this->query = 'SELECT * FROM ' . self::$entity;
        
        $aRetorno = $this->fetch(true);

        return $aRetorno;
    }

    public function createUser(array $data): int|null
    {
        return $this->create($data);
    }
    
}
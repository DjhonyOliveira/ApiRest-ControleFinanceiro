<?php

use Api\Utils\Response;

/**
 * Retorna os dados da requisição
 * @return mixed
 */
function getRequest(): mixed
{   
    $request = null;

    if($_SERVER['CONTENT_TYPE'] === 'application/json') {
        $request = json_decode(file_get_contents('php://input'), true);
    }
    else{
        $request = $_POST;
    }

    return $request;
}

/**
 * Transforma os dados em JSON
 * @param array|stdClass $retorno
 * @return bool|string
 */
function toJson(array|stdClass $retorno): bool|string
{
    return json_encode($retorno);
}

/**
 * Decoda um objeto JSON
 * @param mixed $retorno
 * @return mixed
 */
function decode($retorno): mixed
{
    return json_decode($retorno);
}

/**
 * Valida se o array ou string possui valor
 * @param string|array $retorno
 * @return bool
 */
function emBranco(string|array $retorno): bool
{
    if(is_array($retorno)){
        return count($retorno) == 0;
    }

    if(is_string($retorno)){
        return trim($retorno) == '';
    }

    return false;
}
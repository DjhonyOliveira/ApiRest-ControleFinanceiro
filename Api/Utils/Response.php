<?php

namespace Api\Utils;

use stdClass;

/**
 * Classe de retorno de respostas
 * @package    API
 * @subpackage Utils
 * @author     Djonatan R. de Oliveira
 * @since      03/04/2025
 */
class Response 
{
    /**
     * Retorna a resposta final da requisição
     * @param mixed $data
     * @param int   $statusCode
     * @return void
     */
    public static function ResponseJson(array|stdClass $data, int $statusCode = 200): void 
    {
        header('Content-Type: application/json');
        http_response_code($statusCode);
        echo toJson($data);

        exit;
    }

}
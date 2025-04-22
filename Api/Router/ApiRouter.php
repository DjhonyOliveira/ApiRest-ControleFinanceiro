<?php

namespace Api\Router;

use Api\Utils\InstanceClass;

/**
 * Classe para roteamento dos endpoints
 * @package    API
 * @subpackage Router
 * @author     Djonatan R. de Oliveira
 * @since      07/04/2025 
 */
class ApiRouter 
{

    /**
     * Roteador da API, cria a instancia do controller com base na requisição recebida
     * @param mixed $method
     * @param mixed $uri
     * @return void
     */
    public function handleRequest($method, $uri) {
        $oInstanceClass = new InstanceClass($uri);

        if($oController = $oInstanceClass->getClass()){    
            $endpoint = explode('/', $uri);
            $id       = $endpoint[4] ? (int) $endpoint[4] : null;

            switch ($method) {
                case 'GET':                    
                    !is_null($id) ? $oController->find((int) $id) : $oController->find(0, true);

                    break;
                case 'POST':
                    $oController->create();
                    break;
                case 'PUT':
                    $oController->update($id);
                    break;
                case 'DELETE':
                    $oController->delete($id);
                    break;
                default:
                    header("HTTP/1.1 405 Method Not Allowed");
                    break;
                }
        }
        else {
            header("HTTP/1.1 404 Not Found");
            echo json_encode(["message" => "Endpoint not found"]);
        }
    }

}
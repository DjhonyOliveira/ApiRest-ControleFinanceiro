<?php

namespace Api\Utils;

use Exception;

/**
 * Classe para instancia dinâmica dos controllers da API com base na requisição recebida
 * @package    Api
 * @subpackage Utils
 * @author     Djonatan R. de Oliveira
 * @since      03/04/2025
 */
class InstanceClass
{

    private $class;

    function __construct($uri)
    {
        $this->buscaEndpointSolicitacao($uri);
    }

    /**
     * Get the value of class
     */ 
    public function getClass(): mixed
    {
        return $this->class;
    }

    /**
     * Set the value of class
     *
     * @return self
     */ 
    private function setClass($class): static
    {
        $this->class = $class;

        return $this;
    }

    /**
     * Identifica o controller a ser instanciado com base na requisição recebida
     * @param string $uri
     * @return void
     */
    private function buscaEndpointSolicitacao(string $uri): void
    {
        $namespace = 'Api\\Controller\\Controller';
        $endpoint  = explode('/', $uri);

        $endpoint    = $endpoint[3];
        $solicitacao = str_replace('/', '', $endpoint);
        $class       = $namespace . mb_convert_case($solicitacao, MB_CASE_TITLE, "UTF-8");

        $this->criaInstancia($class);
    }

    /**
     * Realiza a instância dinâmica da classe identificada na solicitação
     * @param mixed $class
     * @return void
     */
    private function criaInstancia($class): void
    {
        if(class_exists($class)){
            $oInstanceClass = new $class();

            $this->setClass($oInstanceClass);
        }
    }

}
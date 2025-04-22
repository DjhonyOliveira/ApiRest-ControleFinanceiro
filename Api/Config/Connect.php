<?php

namespace api\config;

use Api\Utils\Error;
use Api\Config\EnvLoader;

/**
 * Classe de conexão com o bando de dados
 * @package Api
 * @subpackage config
 * @author Djonatan R de Oliveira
 */
class Connect{

    private const options = [
        \PDO::ATTR_ERRMODE            => \PDO::ERRMODE_EXCEPTION,
        \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_OBJ,
        \PDO::ATTR_CASE               => \PDO::CASE_NATURAL
    ];

    /** 
     * @var \PDO 
     */
    private static $instance;

    /**
     *  @return \PDO 
     */
    public static function getInstance(): \PDO
    {
        if(empty(self::$instance)){
            EnvLoader::load();

            try{
                self::$instance = new \PDO(
                    "pgsql:host=" . EnvLoader::get('CONF_DB_HOST') . ";port=" . EnvLoader::get("CONF_DB_PORT") . ";dbname=" . EnvLoader::get("CONF_DB_NAME"),
                    EnvLoader::get("CONF_DB_USER"),
                    EnvLoader::get("CONF_DB_PASS"),
                    self::options
                );
            } catch(\PDOException $exception){
                Error::failConnect($exception);
            }
        }

        return self::$instance;
    }

    private final function __construct()
    {
        
    }

    private final function __clone()
    {

    }
}
<?php

namespace Api\Config;

/**
 * Classe para load das configurações do .env
 * @package Api
 * @subpackage Config
 * @author Djonatan R de Oliveira
 * @since 01/04/2025
 */
class EnvLoader 
{

    private static $path = __DIR__ . '/../../.env';
    private static $variables = [];

    public static function load() 
    {
        if (!file_exists(self::$path)) {
            throw new \RuntimeException('arquivo .env não encontrado');
        }

        $lines = file(self::$path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        
        foreach ($lines as $line) {
            if (strpos(trim($line), '#') === 0) {
                continue;
            }

            list($name, $value) = explode('=', $line, 2);
            $name = trim($name);
            $value = trim($value);

            if (!array_key_exists($name, $_SERVER) && !array_key_exists($name, $_ENV)) {
                putenv(sprintf('%s=%s', $name, $value));
                $_ENV[$name] = $value;
                $_SERVER[$name] = $value;
                
                self::$variables[$name] = $value;
            }
        }
    }

    public static function get($key, $default = null) 
    {
        if (isset(self::$variables[$key])) {
            return self::$variables[$key];
        }
        
        $value = getenv($key);
        return $value !== false ? $value : $default;
    }
}
<?php

namespace Api\Utils;

/**
 * Funções utils para tratamento de arrays em uso na API
 * @package API
 * @subpackage Utils
 * @author Djonatan R. de Oliveira
 * @since 19/04/2025
 */
class ArrayUtils
{

    /**
     * Valida o tipo de dado com base na possição do array
     * @param array $arr
     * @param string $key
     * @param string $tipoDado
     * @return bool
     */
    public static function validaTipoDadoPosicaoArray(array $arr, string $key, string $tipoDado): bool
    {
        switch($tipoDado){
            case 'string':
                if(is_string($arr[$key])){
                    return true;
                }
                break;
            case 'float':
                if(is_float($arr[$key])){
                    return true;
                }
                break;
            case 'int':
                if(is_integer($arr[$key])){
                    return true;
                }
                break;
            case 'bool':
                if(is_bool($arr[$key])){
                    return true;
                }
                break;
            case 'date':
                $data = explode('-', $arr[$key]);
                if(count($data) === 3 && checkdate($data[1], $data[2], $data[0])){
                    return true;
                }
                break;
            default:
                return false;
        }

        return false;
    }

    /**
     * Valida se a posição do array existe
     * @param array $arr
     * @param string $key
     * @return bool
     */
    public static function validaChaveExiste(array $arr, string $key): bool
    {
        if(array_key_exists($key, $arr)){
            return true;
        }

        return false;
    }

}
<?php

namespace Api\Utils;

use Api\Model\Enum\EnumResponse;

/**
 * Retorno de erros do sistema
 * @package    Api
 * @subpackage Utils
 * @author     Djonatan R de Oliveira
 * @since      03/05/2025
 */
class Error
{

    private $message;

    private $errCode;
    
    /**
     * Get the value of message
     */ 
    public function getMessage(): mixed
    {
        return $this->message;
    }

    /**
     * Set the value of message
     *
     * @return  self
     */ 
    public function setMessage($message): self
    {
        $this->message = $message;

        return $this;
    }

    /**
     * Get the value of errCode
     */ 
    public function getErrCode(): mixed
    {
        return $this->errCode;
    }

    /**
     * Set the value of errCode
     *
     * @return  self
     */ 
    public function setErrCode($errCode): self
    {
        $this->errCode = $errCode;

        return $this;
    }

    public static function failConnect(\PDOException $exception): void
    {
        Response::ResponseJson(['error' => $exception->getMessage()], EnumResponse::INTERNAL_SERVER_ERROR);
    }

    public function errorResponse(): void
    {
        Response::ResponseJson(['error'   => 'invalid data',
                                      'details' => $this->getMessage()], $this->getErrCode());
    }

}
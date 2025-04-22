<?php

namespace Api\Model\Enum;

/**
 * Enumerados de resposta da API
 * @package Api
 * @subpackage Model\Enum
 * @author Djonatan R de Oliveira
 */
class EnumResponse
{

    // Respostas de sucesso (2xx)
    const OK         = 200,
          CREATED    = 201,
          ACCEPTED   = 202,
          NO_CONTENT = 204;
    
    // Erros do cliente (4xx)
    const BAD_REQUEST          = 400,
          UNAUTHORIZED         = 401,
          FORBIDDEN            = 403,
          NOT_FOUND            = 404,
          METHOD_NOT_ALLOWED   = 405,
          CONFLICT             = 409,
          UNPROCESSABLE_ENTITY = 422,
          TOO_MANY_REQUESTS    = 429;

     // Erros de servidor (5xx)
    const INTERNAL_SERVER_ERROR = 500,
          NOT_IMPLEMENTED       = 501,
          BAD_GATEWAY           = 502,
          SERVICE_UNAVAILABLE   = 503,
          GATEWAY_TIMEOUT       = 504;
    
    // Mensagens Padrão
    const _OK                    = 'OK',
          _CREATED               = 'Created',
          _ACCEPTED              = 'Accepted',
          _NO_CONTENT            = 'No Content',
          _BAD_REQUEST           = 'Bad Request',
          _UNAUTHORIZED          = 'Unauthorized',
          _FORBIDDEN             = 'Forbidden',
          _NOT_FOUND             = 'Not Found',
          _METHOD_NOT_ALLOWED    = 'Method Not Allowed',
          _CONFLICT              = 'Conflict',
          _UNPROCESSABLE_ENTITY  = 'Unprocessable Entity',
          _TOO_MANY_REQUESTS     = 'Too Many Requests',
          _INTERNAL_SERVER_ERROR = 'Internal Server Error',
          _NOT_IMPLEMENTED       = 'Not Implemented',
          _BAD_GATEWAY           = 'Bad Gateway',
          _SERVICE_UNAVAILABLE   = 'Service Unavailable',
          _GATEWAY_TIMEOUT       = 'Gateway Timeout';

}
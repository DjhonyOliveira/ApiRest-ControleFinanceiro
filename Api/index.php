<?php

require __DIR__ . "/../vendor/autoload.php";

use Api\Router\ApiRouter;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Tratamento da requisição
$requestMethod = $_SERVER['REQUEST_METHOD'];
$uri           = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Roteamento
$router = new ApiRouter();
$router->handleRequest($requestMethod, $uri);
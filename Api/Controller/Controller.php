<?php

namespace Api\Controller;

use Api\Utils\Error;

/**
 * Controllador base do sistema
 * @package    Api
 * @subpackage Controller
 * @author     Djonatan R de oliveira
 * @since      03/04/2025
 */
abstract class Controller
{
    protected $model;
    protected $request;
    protected $error;

    public function __construct()
    {
        $this->request = getRequest();
        $this->error   = new Error();
        $this->setModel();
    }

    abstract protected function setModel();
    
    abstract public function find(int $id = 0, bool $all = false);

    abstract public function create();

    abstract public function update();

    abstract public function delete(int $id);

}
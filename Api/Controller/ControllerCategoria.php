<?php

namespace Api\Controller;

use Api\Model\Enum\EnumResponse;
use Api\Model\ModelCategoria;
use Api\Utils\ArrayUtils;
use Api\Utils\Response;
use stdClass;

/**
 * Controllador de categoria
 * @package Api
 * @subpackage Controller
 * @author Djonatan R. de Oliveira
 * @since 21/04/2025
 */
class ControllerCategoria extends Controller
{

    protected function setModel(): void
    {
        $this->model = new ModelCategoria();
    }

    public function create(): void
    {
        $aRequest = $this->request;

        $this->validaRequisicao($aRequest);

        if(!count($aRequest) == 0){
            if(!is_null($this->model->criaCategoria($aRequest))){
                Response::ResponseJson(["ok" => "categoria inserida com sucesso!"]);
            }
            else{
                Response::ResponseJson(['error' => $this->model->fail()->getMessage()], EnumResponse::INTERNAL_SERVER_ERROR);
            }
        }
    }

    public function find(int $id = 0, bool $all = false): void
    {
        $aRetornoPadrao = ["Categoria" => 'Categoria não encontrada'];

        if($id != 0){
            $aRetorno = $this->model->findById('id', $id);

            if(!is_null($aRetorno)){
                $aRetorno = $aRetorno->getData();
            }
        }
 
        if($all){
            $aDados = $this->model->fetchAll();

            $aCategoria = [];

            if(!is_null($aDados)){
                foreach($aDados as $oModelCategoria){
                    $data = new stdClass();
                    $data->id   = $oModelCategoria->getData()->id;
                    $data->nome = $oModelCategoria->getData()->nome;
                    $data->tipo = $oModelCategoria->getData()->tipo;
    
                    $aCategoria[] = $data;
                }
    
                $aRetorno['Categorias'] = $aCategoria;
            }
        }

        Response::ResponseJson($aRetorno ?? $aRetornoPadrao);
    }

    public function update(): void
    {

    }

    public function delete(int $id): void
    {
        if($this->model->delete('id', $id));{
            Response::ResponseJson(['ok' => 'Categoria deletada com sucesso']);
        }

        Response::ResponseJson(['error' => $this->model->fail()->getMessage()], EnumResponse::INTERNAL_SERVER_ERROR);
    }

    private function validaRequisicao(array $aRequest): void
    {
        $this->error->setErrCode(EnumResponse::BAD_REQUEST);

        if(!ArrayUtils::validaChaveExiste($aRequest, 'nome')){
            $this->error->setMessage('Campo obrigatório nome não informado ou inválido');
            $this->error->errorResponse();
        }

        if(!ArrayUtils::validaChaveExiste($aRequest, 'tipo')){
            $this->error->setMessage('Campo obrigatório tipo não informado ou inválido');
            $this->error->errorResponse();
        }

        if(!ArrayUtils::validaTipoDadoPosicaoArray($aRequest, 'nome', 'string')){
            $this->error->setMessage('Campo nome deve ser string');
            $this->error->errorResponse();
        }

        if(!ArrayUtils::validaTipoDadoPosicaoArray($aRequest, 'tipo', 'string')){
            $this->error->setMessage('Campo string deve ser string');
            $this->error->errorResponse();
        }
    }

}
<?php

namespace Api\Controller;

use Api\Model\Enum\EnumResponse;
use Api\Model\ModelUsuario;
use Api\Utils\ArrayUtils;
use Api\Utils\Response;
use stdClass;

/**
 * Controllador de usuário
 * @package Api
 * @subpackage Controller
 * @author Djonatan R de Oliveira
 * @since 18/04/2025
 */
class ControllerUsuario extends Controller
{

    protected function setModel(): void
    {
        $this->model = new ModelUsuario();
    }

    public function create(): void
    {
        $aRequest = $this->request;

        $this->validaRequisicao($aRequest);

        if(!count($aRequest) == 0){
            if(!is_null($this->model->createUser($aRequest))){
                Response::ResponseJson(["ok" => "usuário inserido com sucesso!"]);
            }
            else{
                Response::ResponseJson(['error' => $this->model->fail()->getMessage()], EnumResponse::INTERNAL_SERVER_ERROR);
            }
        }
    }

    public function find(int $id = 0, bool $all = false): void
    {
        $aRetornoPadrao = ["usuario" => 'Usuário não encontrado'];

        if($id != 0){
            $aRetorno = $this->model->findById('id', $id);

            if(!is_null($aRetorno)){
                $aRetorno = $aRetorno->getData();
            }
        }

        if($all){
            $aDados = $this->model->fetchAll();

            $aUsuarios = [];

            if(!is_null($aDados)){
                foreach($aDados as $oModelUsuario){
                    $data = new stdClass();
                    $data->id    = $oModelUsuario->getData()->id;
                    $data->nome  = $oModelUsuario->getData()->nome;
                    $data->email = $oModelUsuario->getData()->email;
    
                    $aUsuarios[] = $data;
                }
    
                $aRetorno['usuarios'] = $aUsuarios;
            }
        }

        Response::ResponseJson($aRetorno ?? $aRetornoPadrao);
    }

    public function update(int $id): void
    {
        $request          = $this->request;
        $aCamposAtualizar = [];

        if(ArrayUtils::validaChaveExiste($request, 'nome')){
            if(ArrayUtils::validaTipoDadoPosicaoArray($request, 'nome', 'string')){
                $aCamposAtualizar['nome'] = $request['nome'];
            }
        }
        
        if(ArrayUtils::validaChaveExiste($request, 'email')){
            if(ArrayUtils::validaTipoDadoPosicaoArray($request, 'email', 'string')){
                $aCamposAtualizar['email'] = $request['email'];
            }
        }

        if($this->model->findById('id', $id)){
            if($this->model->atualizaUsuario($aCamposAtualizar, $id)){
                Response::ResponseJson(['ok' => 'usuário atualizado com sucesso']);
            }
            else{
                Response::ResponseJson(['error' => $this->model->fail()->getMessage()], EnumResponse::INTERNAL_SERVER_ERROR);
            }
        }
        else{
            Response::ResponseJson(['error' => 'Usuário não encontrado'], EnumResponse::BAD_REQUEST);
        }        
    }

    public function delete(int $id): void
    {
        if($this->model->delete('id', $id));{
            Response::ResponseJson(['ok' => 'usuário deletado com sucesso']);
        }

        Response::ResponseJson(['error' => $this->model->fail()->getMessage()], EnumResponse::INTERNAL_SERVER_ERROR);
    }

    private function validaRequisicao(array $aRequest): void
    {
        $this->error->setErrCode(EnumResponse::BAD_REQUEST);

        if(ArrayUtils::validaChaveExiste($aRequest, 'nome')){
            $this->error->setMessage('Campo obrigatório nome não informado ou inválido');
            $this->error->errorResponse();
        }

        if(ArrayUtils::validaChaveExiste($aRequest, 'email')){
            $this->error->setMessage('Campo obrigatório email não informado ou inválido');
            $this->error->errorResponse();
        }

        if(ArrayUtils::validaTipoDadoPosicaoArray($aRequest, 'nome', 'string')){
            $this->error->setMessage('Campo nome deve ser string');
            $this->error->errorResponse();
        }

        if(ArrayUtils::validaTipoDadoPosicaoArray($aRequest, 'email', 'string')){
            $this->error->setMessage('Campo email deve ser string');
            $this->error->errorResponse();
        }
    }
}
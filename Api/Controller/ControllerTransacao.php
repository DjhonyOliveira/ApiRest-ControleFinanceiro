<?php

namespace Api\Controller;

use Api\Model\Enum\EnumResponse;
use Api\Model\ModelTransacao;
use Api\Utils\ArrayUtils;
use Api\Utils\Response;
use stdClass;

/**
 * Controllador de transacao
 * @package Api
 * @subpackage Controller
 * @author Djonatan R de Oliveira
 * @since 21/04/2025
 */
class ControllerTransacao extends Controller
{

    protected function setModel(): void
    {
        $this->model = new ModelTransacao();
    }

    public function create(): void
    {
        $aRequest = $this->request;

        $this->validaRequisicao($aRequest);
        $aDadosInsercao = $this->montaDadosInsercao($aRequest);

        if(!count($aRequest) == 0){
            if(!is_null($this->model->criaTransacao($aDadosInsercao))){
                Response::ResponseJson(["ok" => "transação inserida com sucesso!"]);
            }
            else{
                Response::ResponseJson(['error' => $this->model->fail()->getMessage()], EnumResponse::INTERNAL_SERVER_ERROR);
            }
        }
    }

    public function find(int $id = 0, bool $all = false): void
    {
        $aRetornoPadrao = ["Transação" => 'Transação não encontrada'];

        if($id != 0){
            $aRetorno = $this->model->findById('id', $id);

            if(!is_null($aRetorno)){
                $aRetorno = $aRetorno->getData();
            }
        }

        if($all){
            $aDados = $this->model->fetchAll();

            $aTransacao = [];

            if(!is_null($aDados)){
                foreach($aDados as $oModelTransacao){
                    $data = new stdClass();
                    $data->id        = $oModelTransacao->getData()->id;
                    $data->usuario   = $oModelTransacao->getData()->user_id;
                    $data->categoria = $oModelTransacao->getData()->categoria_id;
                    $data->valor     = $oModelTransacao->getData()->valor;
                    $data->date      = $oModelTransacao->getData()->date;
                    $data->descricao = $oModelTransacao->getData()->descricao;
    
                    $aTransacao[] = $data;
                }
    
                $aRetorno['Transações'] = $aTransacao;
            }
        }

        Response::ResponseJson($aRetorno ?? $aRetornoPadrao);
    }

    public function update(int $id): void
    {
        $aRequest        = $this->request;
        $aDadosAtualizar = [];

        if(ArrayUtils::validaChaveExiste($aRequest, 'valor')){
            if(ArrayUtils::validaTipoDadoPosicaoArray($aRequest, 'valor', 'float')){
                $aDadosAtualizar['valor'] = $aRequest['valor'];
            }
            else{
                $this->error->setMessage('Campo valor deve ser float');
                $this->error->errorResponse();
            }
        }

        if(ArrayUtils::validaChaveExiste($aRequest, 'date')){
            if(ArrayUtils::validaTipoDadoPosicaoArray($aRequest, 'date', 'date')){
                $aDadosAtualizar['date'] = $aRequest['date']; 
            }
            else{
                $this->error->setMessage('Campo date deve ser date');
                $this->error->errorResponse();
            }
        }

        if(ArrayUtils::validaChaveExiste($aRequest, 'descricao')){
            if(ArrayUtils::validaTipoDadoPosicaoArray($aRequest, 'descricao', 'string')){
                $aDadosAtualizar['descricao'] = $aRequest['descricao'];
            }
            else{
                $this->error->setMessage('Campo descricao deve ser string');
                $this->error->errorResponse();
            }
        }

        if($this->model->findById('id', $id)){
            if($this->model->atualizaTransacao($aDadosAtualizar, $id)){
                Response::ResponseJson(['ok' => 'transação atualizadoo com sucesso']);
            }
            else{
                Response::ResponseJson(['error' => $this->model->fail()->getMessage()], EnumResponse::BAD_REQUEST);
            }
        }        
    }

    public function delete(int $id): void
    {
        if($this->model->delete('id', $id));{
            Response::ResponseJson(['ok' => 'Transação deletada com sucesso']);
        }

        Response::ResponseJson(['error' => $this->model->fail()->getMessage()], EnumResponse::INTERNAL_SERVER_ERROR);
    }

    private function validaRequisicao(array $aRequest): void
    {
        $this->error->setErrCode(EnumResponse::BAD_REQUEST);

        if(!ArrayUtils::validaChaveExiste($aRequest, 'usuario')){
            $this->error->setMessage('Campo obrigatório usuario não informado ou inválido');
            $this->error->errorResponse();
        }

        if(!ArrayUtils::validaChaveExiste($aRequest, 'categoria')){
            $this->error->setMessage('Campo obrigatório categoria não informado ou inválido');
            $this->error->errorResponse();
        }

        if(!ArrayUtils::validaChaveExiste($aRequest, 'valor')){
            $this->error->setMessage('Campo obrigatório valor não informado ou inválido');
            $this->error->errorResponse();
        }

        if(!ArrayUtils::validaChaveExiste($aRequest, 'date')){
            $this->error->setMessage('Campo obrigatório date não informado ou inválido');
            $this->error->errorResponse();
        }

        if(!ArrayUtils::validaChaveExiste($aRequest, 'descricao')){
            $this->error->setMessage('Campo obrigatório descricao não informado ou inválido');
            $this->error->errorResponse();
        }

        if(!ArrayUtils::validaTipoDadoPosicaoArray($aRequest, 'usuario', 'int')){
            $this->error->setMessage('Campo usuario deve ser integer');
            $this->error->errorResponse();
        }

        if(!ArrayUtils::validaTipoDadoPosicaoArray($aRequest, 'categoria', 'int')){
            $this->error->setMessage('Campo categoria deve ser integer');
            $this->error->errorResponse();
        }

        if(!ArrayUtils::validaTipoDadoPosicaoArray($aRequest, 'valor', 'float')){
            $this->error->setMessage('Campo valor deve ser float');
            $this->error->errorResponse();
        }

        if(!ArrayUtils::validaTipoDadoPosicaoArray($aRequest, 'date', 'date')){
            $this->error->setMessage('Campo date deve ser date');
            $this->error->errorResponse();
        }

        if(!ArrayUtils::validaTipoDadoPosicaoArray($aRequest, 'descricao', 'string')){
            $this->error->setMessage('Campo descricao deve ser string');
            $this->error->errorResponse();
        }
    }

    private function montaDadosInsercao(array $aDados): array
    {
        $aDadosTratado = [];
        $aDadosTratado['user_id']      = $aDados['usuario'];
        $aDadosTratado['categoria_id'] = $aDados['categoria'];
        $aDadosTratado['valor']        = $aDados['valor'];
        $aDadosTratado['date']         = $aDados['date'];
        $aDadosTratado['descricao']    = $aDados['descricao'];

        return $aDadosTratado;
    }

}
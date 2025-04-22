<?php

namespace Api\Controller;

use Api\Model\Enum\EnumResponse;
use Api\Model\ModelMeta;
use Api\Utils\ArrayUtils;
use Api\Utils\Response;
use stdClass;

/**
 * Controllador de metas
 * @package Api
 * @subpackage Controller
 * @author Djonatan R de Oliveira
 * @since 21/04/2025
 */
class ControllerMeta extends Controller
{

    protected function setModel()
    {
        $this->model = new ModelMeta();
    }

    public function create()
    {
        $aRequest = $this->request;

        $this->validaRequisicao($aRequest);

        $aDadosInsercao = $this->montaArrayInsercao($aRequest);

        if(!count($aRequest) == 0){
            if(!is_null($this->model->criaMeta($aDadosInsercao))){
                Response::ResponseJson(["ok" => "meta inserida com sucesso!"]);
            }
            else{
                Response::ResponseJson(['error' => $this->model->fail()->getMessage()], EnumResponse::INTERNAL_SERVER_ERROR);
            }
        }
    }

    public function find(int $id = 0, bool $all = false): void
    {
        $aRetornoPadrao = ["meta" => 'Meta não encontrada'];

        if($id != 0){
            $aRetorno = $this->model->findById('id', $id);

            if(!is_null($aRetorno)){
                $aRetorno = $aRetorno->getData();
            }
        }

        if($all){
            $aDados = $this->model->fetchAll();

            $aMetas = [];

            if(!is_null($aDados)){
                foreach($aDados as $oModelCategoria){
                    $data              = new stdClass();
                    $data->id          = $oModelCategoria->getData()->id;
                    $data->usuario     = $oModelCategoria->getData()->user_id;
                    $data->nome        = $oModelCategoria->getData()->nome;
                    $data->valor_alvo  = $oModelCategoria->getData()->valor_alvo;
                    $data->data_limite = $oModelCategoria->getData()->data_limite;
    
                    $aMetas[] = $data;
                }
    
                $aRetorno['Metas'] = $aMetas;
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
            Response::ResponseJson(['ok' => 'Meta deletada com sucesso']);
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

        if(!ArrayUtils::validaChaveExiste($aRequest, 'nome')){
            $this->error->setMessage('Campo obrigatório nome não informado ou inválido');
            $this->error->errorResponse();
        }

        if(!ArrayUtils::validaChaveExiste($aRequest, 'valor_alvo')){
            $this->error->setMessage('Campo obrigatório valor_alvo não informado ou inválido');
            $this->error->errorResponse();
        }

        if(!ArrayUtils::validaChaveExiste($aRequest, 'data_limite')){
            $this->error->setMessage('Campo obrigatório data_limite não informado ou inválido');
            $this->error->errorResponse();
        }

        if(!ArrayUtils::validaTipoDadoPosicaoArray($aRequest, 'usuario', 'int')){
            $this->error->setMessage('Campo usuario deve ser integer');
            $this->error->errorResponse();
        }

        if(!ArrayUtils::validaTipoDadoPosicaoArray($aRequest, 'nome', 'string')){
            $this->error->setMessage('Campo nome deve ser string');
            $this->error->errorResponse();
        }

        if(!ArrayUtils::validaTipoDadoPosicaoArray($aRequest, 'valor_alvo', 'float')){
            $this->error->setMessage('Campo valor_alvo deve ser float');
            $this->error->errorResponse();
        }

        if(!ArrayUtils::validaTipoDadoPosicaoArray($aRequest, 'data_limite', 'date')){
            $this->error->setMessage('Campo data_limite deve ser date');
            $this->error->errorResponse();
        }
    }

    private function montaArrayInsercao(array $aDados): array
    {
        $aDadosTratados['user_id']     = $aDados['usuario'];
        $aDadosTratados['nome']        = $aDados['nome'];
        $aDadosTratados['valor_alvo']  = $aDados['valor_alvo'];
        $aDadosTratados['data_limite'] = $aDados['data_limite'];

        return $aDadosTratados;
    }

}
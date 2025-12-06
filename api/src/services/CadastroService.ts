import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import ICadastro from "../domain/cadastro";
import FamiliaEntity from "../domain/entities/familia";
import IntegranteEntity from "../domain/entities/integrante";

export default class CadastroService {

    public get integranteRepository(): Repository<IntegranteEntity> {
        return AppDataSource.getRepository(IntegranteEntity)
    }

    public get familiaRepository(): Repository<FamiliaEntity> {
        return AppDataSource.getRepository(FamiliaEntity)
    }

    async integranteExistente(email: string): Promise<boolean> {
        return this.integranteRepository.existsBy({ email: email })
    }

    async cadastrar(cadastro: ICadastro): Promise<FamiliaEntity> {
        const familia: FamiliaEntity = {
            nome: cadastro.familia,
            integrantes: [
                {
                    nome: cadastro.nome,
                    email: cadastro.email,
                    senha: cadastro.senha,
                    principal: true
                }
            ]
        }

        const familiaCadastrada = await this.familiaRepository.save(familia)
        return familiaCadastrada
    }
}

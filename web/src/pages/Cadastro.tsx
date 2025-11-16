function Cadastro() {
    return (
        <>
            <h2>Cadastro</h2>
            <form>
                <div>
                    <label>Seu Nome</label>
                    <input type="text" name="nomeIntegrante" />
                </div>
                <div>
                    <label>Nome da sua familia</label>
                    <input type="text" name="nomeFamilia" />
                </div>
                <div>
                    <label>E-Mail</label>
                    <input type="text" name="email" />
                </div>
                <div>
                    <label>Senha</label>
                    <input type="password" name="senha" />
                </div>
                <div>
                    <button type="button">Cadastrar</button>
                </div>
            </form>
        </>
    )
}

export default Cadastro
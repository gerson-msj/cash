function Home() {
    return (
        <>
            <h2>Home</h2>
            <div className="aviso">
                <div className="erro">
                    🔴 Erro
                </div>
            </div>
            <div className="aviso">
                <div className="sucesso">
                    🟢 Sucesso
                </div>
            </div>
            <div className="aviso">
                <div className="alerta">
                    🟠 Alerta
                </div>
            </div>

        </>
    )
}

export default Home
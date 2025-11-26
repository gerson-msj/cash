# cash
Aplicação teste React, redux, saga, type orm e outros.

# Para criação de secrets
``` shell
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

# Cookies

### Criação 
``` TS
app.get("/set-cookie", (req, res) => {
    res.cookie("session", JSON.stringify({ id: 123 }), {
        httpOnly: true,
        secure: false, // true em produção com HTTPS
        sameSite: "lax",
        signed: true,  // ← usa o secret do cookie-parser
        maxAge: 1000 * 60,
    });

    res.send("Cookie assinado enviado");
});
```

### Leitura
``` TS
app.get("/read-cookie", (req, res) => {
    const session = req.signedCookies.session;

    if (!session) {
        return res.status(401).send("Cookie inválido ou adulterado");
    }

    res.send("Cookie válido: " + session);
});
```

### Exclusão
``` TS
app.get("/logout", (req: Request, res: Response) => {
    res.clearCookie("session", {
        httpOnly: true,
        sameSite: "lax",
        signed: true,   // importante!!
    });

    res.send("Cookie removido");
});
```
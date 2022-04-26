## Descripción

Guia 5: Se implementaron los middleware custom, un manejador de errores,
y un middleware para aplicar autenticación por Token.
## Diagrama Middlewares

```mermaid
flowchart LR
    http_req[HTTP Request] --> express
    subgraph express[Express JS]
        ruta[Ruta \n GET/POST/PUT/DELETE]-.->cors[Cors Middleware]
        cors-->auth[Auth Middleware]
        auth-->main[Controller]
    end
    cors--403 Forbidden-->http_res[HTTP Response]
    auth--401 Unauthorized-->http_res
    main--200 OK-->http_res
```

## Diagrama de autenticación basada en token

```mermaid
sequenceDiagram
    Cliente->>Servidor: Request: POST -> /signup
    Servidor->>Cliente: Response: HTTP 200 OK

    Cliente->>Servidor: Request: GET -> /user/profile
    Servidor->>Servidor: Validar token
    Servidor->>Cliente: Response: HTTP 200 OK
```
package recursos;

import entidades.Usuario;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/auth") // Caminho separado para autenticação
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthResource {

    // DTO para login
    public record DadosLogin(String email, String senha) {}

    @POST
    @Path("/login")
    public Response login(DadosLogin dados) {
        // 1. Busca o usuário pelo e-mail
        Usuario usuarioEncontrado = Usuario.find("email", dados.email).firstResult();

        // 2. Validações
        if (usuarioEncontrado == null) {
            return Response.status(401).entity("E-mail ou senha inválidos").build();
        }

        if (!usuarioEncontrado.senha.equals(dados.senha)) {
            return Response.status(401).entity("E-mail ou senha inválidos").build();
        }

        // 3. Sucesso
        return Response.ok(usuarioEncontrado).build();
    }
}
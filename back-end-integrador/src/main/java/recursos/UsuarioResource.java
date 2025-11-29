package recursos;

import entidades.Usuario;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.net.URI;
import java.util.List;

@Path("/usuarios")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UsuarioResource {

    // 1. LISTAR TODOS
    @GET
    public List<Usuario> listarTodos() {
        return Usuario.listAll(); 
    }

    // 2. BUSCAR POR ID
    @GET
    @Path("/{id}")
    public Response buscarPorId(@PathParam("id") Long id) {
        Usuario usuario = Usuario.findById(id);
        if (usuario == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(usuario).build();
    }

    // 3. CRIAR (POST)
    @POST
    @Transactional
    public Response criarUsuario(Usuario usuario) {
        usuario.persist();
        URI createdUri = URI.create("/usuarios/" + usuario.id);
        return Response.created(createdUri).entity(usuario).build();
    }

    // 4. ATUALIZAR (PUT)
    @PUT
    @Path("/{id}")
    @Transactional
    public Response atualizar(@PathParam("id") Long id, Usuario dadosNovos) {
        Usuario usuarioAntigo = Usuario.findById(id);

        if (usuarioAntigo == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        // Atualiza os dados (Lembre-se: usamos 'nome' e não 'nomeCompleto')
        usuarioAntigo.nome = dadosNovos.nome;
        usuarioAntigo.email = dadosNovos.email;
        usuarioAntigo.senha = dadosNovos.senha;
        usuarioAntigo.telefone = dadosNovos.telefone;
        usuarioAntigo.tipoUsuario = dadosNovos.tipoUsuario;
        usuarioAntigo.dataNascimento = dadosNovos.dataNascimento;   

        return Response.ok(usuarioAntigo).build();
    }

    // 5. DELETAR (DELETE)
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deletar(@PathParam("id") Long id) {
        boolean deletou = Usuario.deleteById(id);

        if (!deletou) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.noContent().build();
    }
}
package recursos;

import entidades.Plano;
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

@Path("/planos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PlanoResource {

    // 1. LISTAR TODOS
    @GET
    public List<Plano> listarTodos() {
        return Plano.listAll();
    }

    // 2. BUSCAR POR ID (Para conferir um plano específico)
    @GET
    @Path("/{id}")
    public Response buscarPorId(@PathParam("id") Long id) {
        Plano plano = Plano.findById(id);
        if (plano == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(plano).build();
    }

    // 3. CRIAR (POST)
    @POST
    @Transactional
    public Response criarPlano(Plano plano) {
        plano.persist();
        URI createdUri = URI.create("/planos/" + plano.id);
        return Response.created(createdUri).entity(plano).build();
    }

    // 4. ATUALIZAR (PUT)
    @PUT
    @Path("/{id}")
    @Transactional
    public Response atualizar(@PathParam("id") Long id, Plano dadosNovos) {
        // Busca o plano existente
        Plano planoAntigo = Plano.findById(id);

        if (planoAntigo == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        // Atualiza os campos com os novos valores
        planoAntigo.nome = dadosNovos.nome;
        planoAntigo.descricao = dadosNovos.descricao;
        planoAntigo.precoPromocional = dadosNovos.precoPromocional;
        planoAntigo.duracao = dadosNovos.duracao;
        planoAntigo.beneficios = dadosNovos.beneficios;

        // O Hibernate salva automaticamente as alterações ao fim da transação
        return Response.ok(planoAntigo).build();
    }

    // 5. DELETAR (DELETE)
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deletar(@PathParam("id") Long id) {
        boolean deletou = Plano.deleteById(id);

        if (!deletou) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.noContent().build();
    }
}
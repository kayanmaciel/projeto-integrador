package recursos;

import entidades.Servico;
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

@Path("/servicos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ServicoResource {

   
    @GET
    public List<Servico> listarTodos() {
        return Servico.listAll(); 
    }

 
    @GET
    @Path("/{id}")
    public Response buscarPorId(@PathParam("id") Long id) {
        Servico servico = Servico.findById(id);
        if (servico == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(servico).build();
    }

   
    @POST
    @Transactional
    public Response criarServico(Servico servico) {
        servico.persist();
        URI createdUri = URI.create("/servicos/" + servico.id);
        return Response.created(createdUri).entity(servico).build();
    }

    
    @PUT
    @Path("/{id}")
    @Transactional
    public Response atualizar(@PathParam("id") Long id, Servico dadosNovos) {
        Servico servicoAntigo = Servico.findById(id);

        if (servicoAntigo == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

       
        servicoAntigo.nome = dadosNovos.nome;
        servicoAntigo.descricao = dadosNovos.descricao;
        servicoAntigo.preco = dadosNovos.preco;
        servicoAntigo.duracao = dadosNovos.duracao;
        servicoAntigo.status = dadosNovos.status;

        return Response.ok(servicoAntigo).build();
    }

 
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deletar(@PathParam("id") Long id) {
        boolean deletou = Servico.deleteById(id);

        if (!deletou) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.noContent().build();
    }
}
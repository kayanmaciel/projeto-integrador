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

    
    @GET
    public List<Plano> listarTodos() {
        return Plano.listAll();
    }

    
    @GET
    @Path("/{id}")
    public Response buscarPorId(@PathParam("id") Long id) {
        Plano plano = Plano.findById(id);
        if (plano == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(plano).build();
    }

    
    @POST
    @Transactional
    public Response criarPlano(Plano plano) {
        plano.persist();
        URI createdUri = URI.create("/planos/" + plano.id);
        return Response.created(createdUri).entity(plano).build();
    }

    
    @PUT
    @Path("/{id}")
    @Transactional
    public Response atualizar(@PathParam("id") Long id, Plano dadosNovos) {
      
        Plano planoAntigo = Plano.findById(id);

        if (planoAntigo == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        
        planoAntigo.nome = dadosNovos.nome;
        planoAntigo.descricao = dadosNovos.descricao;
        planoAntigo.precoPromocional = dadosNovos.precoPromocional;
        planoAntigo.duracao = dadosNovos.duracao;
        planoAntigo.beneficios = dadosNovos.beneficios;

       
        return Response.ok(planoAntigo).build();
    }

   
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
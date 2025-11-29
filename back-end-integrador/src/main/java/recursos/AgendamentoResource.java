package recursos;

import entidades.Agendamento;
import entidades.Servico;
import entidades.Usuario;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.net.URI;
import java.util.List;

@Path("/agendamentos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AgendamentoResource {

    @GET
    public List<Agendamento> listarTodos() {
        return Agendamento.listAll();
    }

    @GET
    @Path("/{id}")
    public Response buscarPorId(@PathParam("id") Long id) {
        Agendamento agendamento = Agendamento.findById(id);
        if (agendamento == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(agendamento).build();
    }

    @POST
    @Transactional
    public Response criarAgendamento(Agendamento agendamento) {
        // Validação simples para evitar erro 500 no POST também
        if (agendamento.usuario != null && agendamento.usuario.id != null) {
            Usuario u = Usuario.findById(agendamento.usuario.id);
            if (u == null) return Response.status(400).entity("Usuário não encontrado").build();
            agendamento.usuario = u; // Associa o objeto gerenciado
        }
        
        if (agendamento.servico != null && agendamento.servico.id != null) {
            Servico s = Servico.findById(agendamento.servico.id);
            if (s == null) return Response.status(400).entity("Serviço não encontrado").build();
            agendamento.servico = s; // Associa o objeto gerenciado
        }

        agendamento.persist();
        URI createdUri = URI.create("/agendamentos/" + agendamento.id);
        return Response.created(createdUri).entity(agendamento).build();
    }

    // --- AQUI ESTÁ A SOLUÇÃO DEFINITIVA PARA O PUT ---
    @PUT
    @Path("/{id}")
    @Transactional
    public Response atualizar(@PathParam("id") Long id, Agendamento dadosNovos) {
        
        // 1. Busca o agendamento original
        Agendamento agendamentoAntigo = Agendamento.findById(id);

        if (agendamentoAntigo == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Agendamento não existe").build();
        }

        // 2. Atualiza dados simples
        agendamentoAntigo.dataHora = dadosNovos.dataHora;
        agendamentoAntigo.status = dadosNovos.status;
        agendamentoAntigo.observacoes = dadosNovos.observacoes;

        // 3. Lógica SEGURA para atualizar o SERVIÇO
        if (dadosNovos.servico != null && dadosNovos.servico.id != null) {
            // Busca o serviço no banco para garantir que existe
            Servico servicoNoBanco = Servico.findById(dadosNovos.servico.id);
            
            if (servicoNoBanco == null) {
                // Retorna erro amigável (400) em vez de erro de servidor (500)
                return Response.status(400).entity("O Serviço informado (ID " + dadosNovos.servico.id + ") não existe.").build();
            }
            // Atualiza a referência
            agendamentoAntigo.servico = servicoNoBanco;
        }

        // 4. Lógica SEGURA para atualizar o USUÁRIO
        if (dadosNovos.usuario != null && dadosNovos.usuario.id != null) {
            Usuario usuarioNoBanco = Usuario.findById(dadosNovos.usuario.id);
            
            if (usuarioNoBanco == null) {
                return Response.status(400).entity("O Usuário informado (ID " + dadosNovos.usuario.id + ") não existe.").build();
            }
            agendamentoAntigo.usuario = usuarioNoBanco;
        }

        // O Hibernate salva automaticamente ao fim do método devido ao @Transactional
        return Response.ok(agendamentoAntigo).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deletar(@PathParam("id") Long id) {
        boolean deletou = Agendamento.deleteById(id);
        if (!deletou) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.noContent().build();
    }
}
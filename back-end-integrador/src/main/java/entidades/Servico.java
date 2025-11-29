package entidades;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "servico")
public class Servico extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ser_id")
    public Long id;

    @Column(name = "ser_nome", nullable = false, length = 100)
    public String nome;

    @Column(name = "ser_descricao", length = 255)
    public String descricao;

    @Column(name = "ser_preco", nullable = false)
    public Double preco;

    @Column(name = "ser_duracao", nullable = false)
    public Integer duracao; // em minutos

    @Column(name = "ser_status", nullable = false, length = 20)
    public String status; // ativo/inativo

    @OneToMany(mappedBy = "servico", fetch = FetchType.LAZY)
    @JsonIgnore
    public List<Agendamento> agendamentos; // Relacionamento: Serviço → Agendamento
}

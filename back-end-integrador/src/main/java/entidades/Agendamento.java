package entidades;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "agendamento")
public class Agendamento extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "age_id")
    public Long id;

    @Column(name = "age_data_hora", nullable = false)
    public LocalDateTime dataHora; // Data e hora do agendamento

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", referencedColumnName = "usu_id", nullable = false)
    public Usuario usuario; // Quem marcou o serviço

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_servico", referencedColumnName = "ser_id", nullable = false)
    public Servico servico; // Serviço escolhido

    @Column(name = "age_status", nullable = false, length = 20)
    public String status; // pendente, confirmado, concluído, cancelado

    @Column(name = "age_observacoes", length = 255)
    public String observacoes; // opcional

    @CreationTimestamp
    @Column(name = "age_data_criacao", nullable = false, updatable = false)
    public LocalDateTime dataCriacao;
}
 
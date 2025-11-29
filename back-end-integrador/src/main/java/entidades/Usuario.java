package entidades;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "usuario")
public class Usuario extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usu_id")
    public Long id;

    @Column(name = "usu_nome", nullable = false, length = 150)
    public String nome;

    @Column(name = "usu_email", nullable = false, unique = true, length = 100)
    public String email;

    @Column(name = "usu_senha", nullable = false)
    public String senha;

    @Column(name = "usu_telefone", length = 20)
    public String telefone;

    @Column(name = "usu_data_nascimento")
    public LocalDate dataNascimento;

    @Column(name = "usu_tipo", nullable = false, length = 20)
    public String tipoUsuario; // cliente, barbeiro, administrador

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_plano", referencedColumnName = "pla_id", nullable = true)
    public Plano plano; // Plano vinculado (opcional)

    @OneToMany(mappedBy = "usuario", fetch = FetchType.LAZY)
    @JsonIgnore
    public List<Agendamento> agendamentos; // Relacionamento: Usuário → Agendamento

    @CreationTimestamp
    @Column(name = "usu_data_cadastro", nullable = false, updatable = false)
    public LocalDateTime dataCadastro;

    @Transient
    public String getNomePlano() {
        return plano != null ? plano.nome : "Sem plano";
    }
}

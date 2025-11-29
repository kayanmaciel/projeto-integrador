package entidades;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "plano")
public class Plano extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pla_id")
    public Long id;

    @Column(name = "pla_nome", nullable = false, length = 100)
    public String nome; // Nome do plano

    @Column(name = "pla_descricao", length = 255)
    public String descricao;

    @Column(name = "pla_preco_promocional")
    public Double precoPromocional;

    @Column(name = "pla_duracao", nullable = false)
    public Integer duracao; // dias ou meses

    @Column(name = "pla_beneficios", length = 500)
    public String beneficios; // Benefícios inclusos

    @OneToMany(mappedBy = "plano", fetch = FetchType.LAZY)
    public List<Usuario> usuarios; // Relacionamento: Plano → Usuário
}

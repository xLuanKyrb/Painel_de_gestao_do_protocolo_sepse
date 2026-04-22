package upa.sepse.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "acao_pacote")
public class AcaoPacote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "protocolo_id", nullable = false)
    private ProtocoloSepse protocolo;

    @Column(name = "responsavel_acao", nullable = false)
    private String responsavelAcao;

    @Column(name = "tipo_acao", nullable = false)
    private String tipoAcao;

    @Column(name = "data_hora_realizacao", nullable = false)
    private LocalDateTime dataHoraRealizacao;

    @Column(length = 500)
    private String observacao;

    @PrePersist
    protected void onCreate(){
        this.dataHoraRealizacao = LocalDateTime.now();
    }

}

package upa.sepse.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "protocolo_sepse")
public class ProtocoloSepse {

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "sinais_vitais_id", referencedColumnName = "id")
    private SinaisVitais sinaisVitais;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "paciente_id", nullable = false)
    private Paciente paciente;

    @Column(name = "data_hora_abertura", nullable = false)
    private LocalDateTime dataHoraAbertura;

    @Column(nullable = false)
    private String status;

    @Column(name = "foco_infeccioso")
    private String focoInfeccioso;

    @Column(name = "justificativa_descarte", length = 500)
    private String justificativaDescarte;

    @PrePersist
    protected void onCreate(){
        this.dataHoraAbertura = LocalDateTime.now();
        if (this.status == null){
            this.status = "ANDAMENTO";
        }
    }
}

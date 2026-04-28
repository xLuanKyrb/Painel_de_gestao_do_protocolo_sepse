package upa.sepse.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "sinais_vitais")
public class SinaisVitais {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double temperatura;

    @Column(name = "freq_cardiaca")
    private Double freqCardiaca;

    private Integer pas;
    private Integer spo2;
}

package upa.sepse.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upa.sepse.model.AcaoPacote;
import upa.sepse.model.ProtocoloSepse;
import upa.sepse.repository.AcaoPacoteRepository;
import upa.sepse.repository.ProtocoloSepseRepository;

import java.util.List;

@RestController
@RequestMapping("/api/protocolos")
public class ProtocoloSepseController {
    @Autowired
    private AcaoPacoteRepository acaoRepository;

    @Autowired
    private ProtocoloSepseRepository repository;

    @PostMapping
    public ResponseEntity<ProtocoloSepse> abrirProtocolo(@RequestBody ProtocoloSepse protocolo){
        ProtocoloSepse novoProtocolo = repository.save(protocolo);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoProtocolo);
    }

    @GetMapping("/ativos")
    public List<ProtocoloSepse> listarProtocolosAtivos() {
        return repository.findByStatus("ANDAMENTO");
    }

    @GetMapping
    public List<ProtocoloSepse> listarTodos(){
        return repository.findAll();
    }

    @PostMapping("/{id}/acoes")
    public ResponseEntity<AcaoPacote> registrarAcao(
            @PathVariable Long id,
            @RequestBody AcaoPacote acao){
        ProtocoloSepse protocolo = repository.findById(id).orElseThrow(() -> new RuntimeException("Protocolo não encontrado!"));

        acao.setProtocolo(protocolo);
        AcaoPacote novaAcao = acaoRepository.save(acao);

        return ResponseEntity.status(HttpStatus.CREATED).body(novaAcao);
    }
}

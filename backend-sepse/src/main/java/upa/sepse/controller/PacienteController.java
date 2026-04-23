package upa.sepse.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upa.sepse.model.Paciente;
import upa.sepse.repository.PacienteRepository;

import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
public class PacienteController {

    @Autowired
    private PacienteRepository repository;

    @GetMapping
    public List<Paciente> listarTodos(){
        return repository.findAll();
    }

    @PostMapping
    public ResponseEntity<Paciente> criarPaciente(@RequestBody Paciente paciente){
        Paciente novoPaciente = repository.save(paciente);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoPaciente);
    }
}

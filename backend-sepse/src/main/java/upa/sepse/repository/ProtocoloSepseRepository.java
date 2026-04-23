package upa.sepse.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import upa.sepse.model.ProtocoloSepse;

import java.util.List;

public interface ProtocoloSepseRepository extends JpaRepository<ProtocoloSepse, Long> {
    List<ProtocoloSepse> findByStatus(String status);
}

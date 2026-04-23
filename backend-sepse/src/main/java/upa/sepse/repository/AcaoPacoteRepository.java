package upa.sepse.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import upa.sepse.model.AcaoPacote;

import java.util.List;

@Repository
public interface AcaoPacoteRepository extends JpaRepository<AcaoPacote, Long> {
    List<AcaoPacote> findByProtocoloId(Long protocoloId);
}

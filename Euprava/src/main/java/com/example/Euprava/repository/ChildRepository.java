    package com.example.Euprava.repository;

    import com.example.Euprava.model.Child;
    import com.example.Euprava.model.User;
    import org.springframework.data.jpa.repository.JpaRepository;
    import org.springframework.data.jpa.repository.Query;
    import org.springframework.data.repository.query.Param;

    import java.util.List;

    public interface ChildRepository extends JpaRepository<Child, Long> {

        Child findByJmbg(String jmbg);

        boolean existsByJmbg(String jmbg);

        List<Child> findByDeletedFalse();
    }

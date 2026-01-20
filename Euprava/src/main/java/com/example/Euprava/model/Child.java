package com.example.Euprava.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="CHILD")
public class Child {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jmbg", nullable = false, unique = true,length = 13)
    private String jmbg;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "surname", nullable = false)
    private String surname;

    @Column(name = "birth_date", nullable = false)
    private LocalDateTime birthDate;

    @Column(name = "parent_name", nullable = false)
    private String parentName;

    @Column(name = "parent_surname", nullable = false)
    private String parentSurname;

    @Column(name = "parent_contact", nullable = false)
    private String parentContact;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name="deleted")
    private Boolean deleted;



    public String getFullNameChiled(){
        return name + " " + surname;
    }

    public String getFullNameParent(){
        return parentName + " " + parentSurname;
    }
}

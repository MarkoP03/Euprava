SET NAMES utf8mb4;
SET character_set_client = utf8mb4;
SET collation_connection = utf8mb4_unicode_ci;


INSERT INTO USERS (name, surname, username, password, email, role, deleted)
VALUES ('Luka', 'Jovanoci', 'doktor', '$2a$10$/RSzkUJiCvjMcHpdG955buS26adG85oZEGKzo7SyjdPU2glx0GVHa', 'doktor@gmail.com', 'DOCTOR', 0);

INSERT INTO USERS (name, surname, username, password, email, role, deleted)
VALUES ('Jovana', 'Lukic', 'nurse', '$2a$10$/RSzkUJiCvjMcHpdG955buS26adG85oZEGKzo7SyjdPU2glx0GVHa', 'nurse@gmail.com', 'NURSE', 0);




-- MEDICAL_RECORD
INSERT INTO MEDICAL_RECORD (child_id, child_name, child_surname, parent_contact, last_check, can_join_collective, created_at, updated_at, deleted)
VALUES (1, 'Luka', 'Jovanovic', '+38160111222', '2024-11-15 10:30:00', true, '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);

INSERT INTO MEDICAL_RECORD (child_id, child_name, child_surname, parent_contact, last_check, can_join_collective, created_at, updated_at, deleted)
VALUES (2, 'Sara', 'Petrovic', '+38164123456', '2024-10-20 14:00:00', true, '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);

INSERT INTO MEDICAL_RECORD (child_id, child_name, child_surname, parent_contact, last_check, can_join_collective, created_at, updated_at, deleted)
VALUES (3, 'Marko', 'Nikolic', '+38163987654', '2024-12-01 09:15:00', false, '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);

INSERT INTO MEDICAL_RECORD (child_id, child_name, child_surname, parent_contact, last_check, can_join_collective, created_at, updated_at, deleted)
VALUES (4, 'Ana', 'Milosevic', '+38169555666', '2024-11-28 11:45:00', true, '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);


-- VACCINE
INSERT INTO VACCINE (medical_record_id, name, date, note, created_at, updated_at, deleted)
VALUES (1, 'BCG', '2019-06-10 10:00:00', 'Prva doza, bez komplikacija', '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);

INSERT INTO VACCINE (medical_record_id, name, date, note, created_at, updated_at, deleted)
VALUES (1, 'DTP', '2019-08-15 11:00:00', 'Prva doza, lagano crvenilo na mestu uboda', '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);

INSERT INTO VACCINE (medical_record_id, name, date, note, created_at, updated_at, deleted)
VALUES (1, 'MMR', '2020-05-20 09:30:00', 'Prva doza, bez komplikacija', '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);

INSERT INTO VACCINE (medical_record_id, name, date, note, created_at, updated_at, deleted)
VALUES (2, 'BCG', '2018-03-20 10:00:00', 'Prva doza, bez komplikacija', '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);

INSERT INTO VACCINE (medical_record_id, name, date, note, created_at, updated_at, deleted)
VALUES (2, 'DTP', '2018-05-25 11:00:00', 'Prva doza', '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);

INSERT INTO VACCINE (medical_record_id, name, date, note, created_at, updated_at, deleted)
VALUES (2, 'Polio', '2018-08-10 10:30:00', 'Druga doza', '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);

INSERT INTO VACCINE (medical_record_id, name, date, note, created_at, updated_at, deleted)
VALUES (3, 'BCG', '2020-01-15 09:00:00', 'Prva doza', '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);

INSERT INTO VACCINE (medical_record_id, name, date, note, created_at, updated_at, deleted)
VALUES (4, 'MMR', '2021-03-10 10:00:00', 'Prva doza, bez komplikacija', '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);


-- ALLERGY
INSERT INTO ALLERGY (medical_record_id, type, description, severity, created_at, updated_at, deleted)
VALUES (1, 'FOOD', 'Alergija na kikiriki', 'SEVERE', '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);

INSERT INTO ALLERGY (medical_record_id, type, description, severity, created_at, updated_at, deleted)
VALUES (2, 'ENVIRONMENTAL', 'Alergija na polen breze', 'MODERATE', '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);

INSERT INTO ALLERGY (medical_record_id, type, description, severity, created_at, updated_at, deleted)
VALUES (2, 'FOOD', 'Alergija na jagode', 'MILD', '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);

INSERT INTO ALLERGY (medical_record_id, type, description, severity, created_at, updated_at, deleted)
VALUES (3, 'MEDICATION', 'Alergija na penicilin', 'SEVERE', '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);

INSERT INTO ALLERGY (medical_record_id, type, description, severity, created_at, updated_at, deleted)
VALUES (4, 'INSECT', 'Alergija na ubode pčela', 'MODERATE', '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);


-- ENROLLMENT_CONFIRMATION
INSERT INTO ENROLLMENT_CONFIRMATION (medical_record_id, issued_at, valid_until, status, created_at, updated_at, deleted)
VALUES (1, '2024-08-01 10:00:00', '2025-08-01 10:00:00', 'ACTIVE', '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);

INSERT INTO ENROLLMENT_CONFIRMATION (medical_record_id, issued_at, valid_until, status, created_at, updated_at, deleted)
VALUES (2, '2024-07-15 09:00:00', '2025-07-15 09:00:00', 'ACTIVE', '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);

INSERT INTO ENROLLMENT_CONFIRMATION (medical_record_id, issued_at, valid_until, status, created_at, updated_at, deleted)
VALUES (3, '2024-09-01 11:00:00', '2024-12-01 11:00:00', 'EXPIRED', '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);

INSERT INTO ENROLLMENT_CONFIRMATION (medical_record_id, issued_at, valid_until, status, created_at, updated_at, deleted)
VALUES (4, '2024-11-20 10:30:00', '2025-11-20 10:30:00', 'ACTIVE', '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);


-- DOCTOR_REPORT
INSERT INTO DOCTOR_REPORT (medical_record_id, date, diagnosis, recommendation, created_at, updated_at, deleted)
VALUES (1, '2024-11-15 10:30:00', 'Zdrav, bez patoloških nalaza', 'Redovan pregled za 6 meseci', '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);

INSERT INTO DOCTOR_REPORT (medical_record_id, date, diagnosis, recommendation, created_at, updated_at, deleted)
VALUES (2, '2024-10-20 14:00:00', 'Blaga upala krajnika', 'Antibiotska terapija 7 dana, kontrola nakon nedelju dana', '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);

INSERT INTO DOCTOR_REPORT (medical_record_id, date, diagnosis, recommendation, created_at, updated_at, deleted)
VALUES (3, '2024-12-01 09:15:00', 'Prehlada sa kašljem', 'Izostanak iz vrtića 5 dana, sirupi za kašalj, toplije oblačenje', '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);

INSERT INTO DOCTOR_REPORT (medical_record_id, date, diagnosis, recommendation, created_at, updated_at, deleted)
VALUES (4, '2024-11-28 11:45:00', 'Preventivni sistematski pregled - uredan nalaz', 'Nastaviti sa redovnim vakcinacijama', '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);

INSERT INTO DOCTOR_REPORT (medical_record_id, date, diagnosis, recommendation, created_at, updated_at, deleted)
VALUES (1, '2024-09-10 13:20:00', 'Alergijska reakcija na kikiriki', 'Izbegavati kikiriki i proizvode koji ga sadrže, imati EpiPen pri ruci', '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);


-- REPORT_OF_ILLNESS
INSERT INTO REPORT_OF_ILLNESS (medical_record_id, status, problem, answer, urgent, created_at, updated_at, deleted)
VALUES (1, 'ANSWERED', 'Dete ima temperaturu 38.5°C i kašlje', 'Dijagnostikovana prehlada. Potreban izostanak 3-5 dana. Preporučena tečnost i odmor.', false, '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);

INSERT INTO REPORT_OF_ILLNESS (medical_record_id, status, problem, answer, urgent, created_at, updated_at, deleted)
VALUES (2, 'ANSWERED', 'Žali se na bol u grlu i temperatura 37.8°C', 'Upala krajnika. Propisana antibiotska terapija. Povratak u vrtić nakon 7 dana.', false, '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);

INSERT INTO REPORT_OF_ILLNESS (medical_record_id, status, problem, answer, urgent, created_at, updated_at, deleted)
VALUES (3, 'IN_PROGRESS', 'Povraćanje i dijareja, temperatura 38.2°C', NULL, true, '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);

INSERT INTO REPORT_OF_ILLNESS (medical_record_id, status, problem, answer, urgent, created_at, updated_at, deleted)
VALUES (4, 'PENDING', 'Osip po telu, svrab, bez temperature', NULL, false, '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);

INSERT INTO REPORT_OF_ILLNESS (medical_record_id, status, problem, answer, urgent, created_at, updated_at, deleted)
VALUES (1, 'CLOSED', 'Curenje nosa i kijanje', 'Alergijska reakcija na polen. Preporučeni antihistaminici. Nema potrebe za izostankom.', false, '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);

INSERT INTO REPORT_OF_ILLNESS (medical_record_id, status, problem, answer, urgent, created_at, updated_at, deleted)
VALUES (2, 'ANSWERED', 'Bol u uhu, temperatura 38.0°C', 'Upala srednjeg uha. Propisani antibiotik i kapi za uši. Kontrola za 5 dana.', false, '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);

INSERT INTO REPORT_OF_ILLNESS (medical_record_id, status, problem, answer, urgent, created_at, updated_at, deleted)
VALUES (3, 'PENDING', 'Jako zamoreno, slabiji apetit poslednja 2 dana', NULL, false, '2024-12-11 00:23:43', '2024-12-11 00:23:44', false);
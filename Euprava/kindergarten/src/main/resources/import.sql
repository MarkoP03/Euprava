SET NAMES utf8mb4;
SET character_set_client = utf8mb4;
SET collation_connection = utf8mb4_unicode_ci;

INSERT INTO CHILD (jmbg,name,surname,birth_date,parent_name,parent_surname,parent_contact,created_at,updated_at,deleted)
VALUES ('1205999789012','Luka','Jovanovic','2019-05-10 00:00:00','Milan','Jovanovic','+38160111222','2024-12-11 00:23:43','2024-12-11 00:23:44',false);

INSERT INTO CHILD (jmbg,name,surname,birth_date,parent_name,parent_surname,parent_contact,created_at,updated_at,deleted)
VALUES ('1502201876543','Sara','Petrovic','2018-02-15 00:00:00','Ivana','Petrovic','+38164123456','2024-12-11 00:23:43','2024-12-11 00:23:44',false);

INSERT INTO CHILD (jmbg,name,surname,birth_date,parent_name,parent_surname,parent_contact,created_at,updated_at,deleted)
VALUES ('1702201876123','Milica','Ancic','2017-02-15 00:00:00','Filip','Petrovic','+38164124456','2024-12-11 00:23:43','2024-12-11 00:23:44',false);



INSERT INTO ENROLLMENT (child_id, kindergarten_id, status, confirmation_health_id, created_at, updated_at, deleted)
VALUES (1, 1, 'ACCEPTED', NULL, '2024-12-11 00:23:43', '2024-12-11 00:23:44', 0);

INSERT INTO ENROLLMENT (child_id, kindergarten_id, status, confirmation_health_id, created_at, updated_at, deleted)
VALUES (2, 2, 'ACCEPTED', null, '2024-12-11 00:23:43', '2024-12-11 00:23:44', 0);


INSERT INTO USERS (name, surname, username, password, email, role, deleted)
VALUES ('Admin', 'User', 'admin', '$2a$10$/RSzkUJiCvjMcHpdG955buS26adG85oZEGKzo7SyjdPU2glx0GVHa', 'admin@gmail.com', 'ADMIN', 0);

INSERT INTO USERS (name, surname, username, password, email, role, deleted)
VALUES ('Teacher', 'User', 'teacher', '$2a$10$/RSzkUJiCvjMcHpdG955buS26adG85oZEGKzo7SyjdPU2glx0GVHa', 'teacher@gmail.com', 'TEACHER', 0);






INSERT INTO WORKS (user_id, kindergarten_id, salary, start_date, deleted)
VALUES (2, 1, 950, '2024-12-11 00:23:43', 0);


INSERT INTO KINDERGARTEN (name, address, lat, lng, created_at, updated_at, deleted)
VALUES ('Veseli Vrtic', 'Bulevar Kralja Aleksandra 1, Beograd', 44.812, 20.469, '2024-12-11 00:23:43', '2024-12-11 00:23:44', 0);

INSERT INTO KINDERGARTEN (name, address, lat, lng, created_at, updated_at, deleted)
VALUES ('Mali Genije', 'Cara Dusana 10, Novi Sad', 45.256, 19.853, '2024-12-11 00:23:43', '2024-12-11 00:23:44', 0);

INSERT INTO role (name) VALUES
('user'),
('admin');

INSERT INTO "user" (email, password, lastname, firstname, birthday, role) VALUES
('test@test.be', '$2b$10$ebHPUf4ZYHMrA/EA4IqU0ef/7iImfNvUICh.2qoqx/pJJwmKmJ/lK', 'Test', 'User', '01-01-2000', 'user'),
('admin@admin.be', '$2b$10$kHQKKMSCCo87gUgsJEHI2eSuFu1dz46PrfDiWhymsZAXsX73ssOwy', 'Admin', 'Admin', '01-01-2000', 'admin'),
('JessicaLaBg@gmail.com', '$2b$10$pIxBPKzBz6Dmea6t/miu..pbzj6/xPI6ZmDnLPw7UzElvyiy3OZWm', 'Calozzi', 'Jessica', '01-14-1996', 'user'),
('ArnaudTsamere@yahoo.fr', '$2b$10$DXHsX9BjgpG/4OclJ8oqB.lfNxGNexlRK8SjYH664QFLJnCPkiEJi', 'Tsamere', 'Arnaud', '07-22-1985', 'user'),
('Bsarteque@street.93', '$2b$10$AWj8gr6ndsb4WwaysmdRuu7DYA9hTkiGWGOAuDMxHQ8wa2X07u6WG', 'Gorachi', 'Tobias', '09-09-2009', 'user');

INSERT INTO school(name, address, phoneNumber) VALUES
('Henallux - IESN', 'Rue Joseph Calozet 19, 5000 Namur', '084/46.86.10'),
('Henallux - Département Social', 'Rue de l''Arsenal 10, 5000 Namur', '081/22.43.19'),
('Université de Namur', 'Rue de Bruxelles 61, 5000 Namur', '081/72.41.11');

INSERT INTO "option" (name, nbYears, school) VALUES
('Comptabilité (Fiscalité/Gestion)', 3, 1),
('Droit', 3, 1),
('Automatisation', 3, 1),
('Informatique de gestion', 3, 1),
('Marketing', 3, 1),
('Professeur dans l''enseignement secondaire', 3, 1),
('Technologie de l''informatique', 3, 1),
('Assistant social', 3, 2),
('Gestion des ressources humaines', 3, 2),
('Ingénierie et actions sociales', 2, 2),
('Philosophie', 3, 3),
('Sciences économiques', 3, 3),
('Médecine vétérinaire', 3, 3);

INSERT INTO publication (content, "date", "user") VALUES
('Salut tout le monde, est ce que quelqu''un aurait le livre de sciences à me prêter ?', '12-17-2020', 'JessicaLaBg@gmail.com'),
('Est ce que quelqu''un sait ce qu''il s''est passé dans l''audit cet après-midi ? ', '12-18-2019', 'Bsarteque@street.93'),
('J''hésite à faire un master en "ingénierie et action sociales", quelqu''un pour me briefer sur la section ?', '05-20-2020', 'Bsarteque@street.93');

INSERT INTO comment (content, "user", "date", publication) VALUES
('Un OVNI ? Je comprends pas mdr', 'Bsarteque@street.93', '12-18-2020', 2),
('Ma pote fait ça cette année, je peux vous mettre en contact! @léaréussite tu pourrais l''aider ?', 'JessicaLaBg@gmail.com', '12-19-2019', 3),
('Avec plaisir, quelles sont tes questions ?', 'test@test.be', '12-19-2019', 3),
('Je me demandais si tous les cours se passaient à Namur ? Ou à LLN aussi des fois ?', 'Bsarteque@street.93', '12-20-2019', 3);

INSERT INTO report(userID, publiID) VALUES
('ArnaudTsamere@yahoo.fr', 1);

INSERT INTO "like" (userID, publiID) VALUES
('ArnaudTsamere@yahoo.fr', 2);
INSERT INTO "user" (email, password, lastname, firstname, birthday, role) VALUES
('todelete@test.be', '$2b$10$ebHPUf4ZYHMrA/EA4IqU0ef/7iImfNvUICh.2qoqx/pJJwmKmJ/lK', 'User', 'To Delete', '12-20-2020', 'user');

INSERT INTO publication (content, "date", "user") VALUES
('Publication to delete', '05-12-2020', 'todelete@test.be');



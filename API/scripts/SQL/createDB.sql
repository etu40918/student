DROP TABLE IF EXISTS comment CASCADE;
DROP TABLE IF EXISTS report CASCADE;
DROP TABLE IF EXISTS "like" CASCADE;
DROP TABLE IF EXISTS publication CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "option" CASCADE;
DROP TABLE IF EXISTS role CASCADE;
DROP TABLE IF EXISTS school CASCADE;


CREATE TABLE role (
	name VARCHAR(20),
	PRIMARY KEY (name)
);

CREATE TABLE school (
	id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(50) NOT NULL,
	address VARCHAR(100) NOT NULL,
	phoneNumber VARCHAR(12) NOT NULL
);

CREATE TABLE "option" (
	name VARCHAR(50) NOT NULL,
	nbYears INT NOT NULL,
	school INT NOT NULL,

	FOREIGN KEY (school) REFERENCES school(id),
	PRIMARY KEY(name, school)
);

CREATE TABLE "user" (
	email VARCHAR(50),
	password VARCHAR(100) NOT NULL,
	lastname VARCHAR(30) NOT NULL,
	firstname VARCHAR(30) NOT NULL,
	birthday DATE NOT NULL,
	bloc INT,
	role VARCHAR(20) NOT NULL,
	optionName VARCHAR(50),
	optionSchool INT,

	FOREIGN KEY (role) REFERENCES role(name),
	FOREIGN KEY (optionName, optionSchool) REFERENCES "option"(name, school),
	PRIMARY KEY (email)
);

CREATE TABLE publication (
	id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	content VARCHAR(500),
	"date" DATE NOT NULL,
	"user" VARCHAR(50) NOT NULL,

	FOREIGN KEY ("user") REFERENCES "user"(email)
);

CREATE TABLE "like" (
	userID VARCHAR(50) NOT NULL,
	publiID INT NOT NULL,

	FOREIGN KEY (userID) REFERENCES "user"(email),
	FOREIGN KEY (publiID) REFERENCES publication(id),
	PRIMARY KEY (userID, publiID)
);

CREATE TABLE report (
	userID VARCHAR(50) NOT NULL,
	publiID INT NOT NULL,

	FOREIGN KEY (userID) REFERENCES "user"(email),
    FOREIGN KEY (publiID) REFERENCES publication(id),
    PRIMARY KEY (userID, publiID)
);

CREATE TABLE comment (
	id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	content VARCHAR(255) NOT NULL,
	"date" DATE NOT NULL,
	"user" VARCHAR(50) NOT NULL,
	publication INT NOT NULL,

	FOREIGN KEY ("user") REFERENCES "user"(email),
	FOREIGN KEY (publication) REFERENCES publication(id)
);


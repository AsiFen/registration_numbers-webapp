
CREATE TABLE town_name (
   id serial PRIMARY KEY,
   code VARCHAR(5) NOT NULL
);

CREATE TABLE registration_numbers (
    id serial PRIMARY KEY,
    car_registration VARCHAR(10) NOT NULL,
    town int NOT NULL, 
    FOREIGN KEY (town) REFERENCES town_name(id)
);


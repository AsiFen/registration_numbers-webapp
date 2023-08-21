CREATE TABLE town_name( name VARCHAR NOT NULL PRIMARY KEY );

CREATE TABLE
    registration_numbers(
        car_registration VARCHAR(10) NOT NULL );

    ALTER TABLE registration_numbers ADD COLUMN town ADD FOREIGN KEY (town) REFERENCES town_name(town);

-- Create the town_name table
CREATE TABLE town_name (
    town VARCHAR NOT NULL PRIMARY KEY
);

-- Create the registration_numbers table
CREATE TABLE registration_numbers (
    car_registration VARCHAR(10) NOT NULL,
    town VARCHAR(10) NOT NULL, 
    FOREIGN KEY (town) REFERENCES town_name(town)
);

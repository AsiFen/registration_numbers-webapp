//Test for when:
// there are no registrations in the table
// a car registration is added to the table
//an existing registration is added to the table 
// you view all the registration
//delete from the database

import assert from 'assert';
// import db from '../dabatase/db_connection.js';
import Registration from '../dabatase/registration.js';
import RegistrationListDB from '../dabatase/database_logic.js';

import pgPromise from 'pg-promise';

const connectionString = process.env.DATABASE_URL || "postgresql://asisipho:asisipho123@localhost:5432/users";

const db = pgPromise()(connectionString);

describe('Database Tests for Registration WebApp', () => {
    let registrationListDB = RegistrationListDB(db);
    let registration = Registration(registrationListDB);

    beforeEach(async () => {
        //reset db before eact test is ran 
        await registrationListDB.reset();
    })

    it('should add a registration number', async () => {
        let reg_number = 'CA 123 123';
        await registrationListDB.add(reg_number);
        const result = await registrationListDB.getAll();
        console.log(result[0].car_registration);
        assert.strictEqual(result[0].car_registration, reg_number);
    });

    // it('should not add an existing registration number', async () => {

    // })
    
    it('should view all registration numbers', async () => {
        let reg_number = 'CA 123 123';
        await registrationListDB.add(reg_number);
        const result = await registrationListDB.getAll();

        assert.strictEqual(result[0].car_registration, reg_number);
    });

    // it('should not add an existing registration number', async () => {
    //     let reg_number = 'CA 123 123';

    //     await registrationListDB.add(reg_number);

    //     try {
    //         await registrationListDB.add(reg_number);

    //         assert.fail('Expected an error');
    //     } catch (error) {
    //         assert.strictEqual(error.message, 'duplicate key value violates unique constraint');
    //     }
    // });

    after(function () {
        db.$pool.end;
    });
})


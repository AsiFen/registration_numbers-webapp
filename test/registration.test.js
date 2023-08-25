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

const connectionString = "postgresql://asisipho:asisipho123@localhost:5432/users";

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
        const result = await registrationListDB.getRegId(reg_number);
        const carReg = await registrationListDB.getCarRegistration(result)
        // assert.strictEqual(result.id, 1);
        assert.deepEqual(carReg, { car_registration: 'CA 123 123' });
    });

    it('should not add an existing registration number', async () => {

    })

    it('should view all registration numbers', async () => {
        let reg_numbers = ['CA 123 123', 'CA 123 456', 'CL 654 321', 'CT 313 14'];
    
        // Add all registration numbers
        for (let reg_number of reg_numbers) {
            await registrationListDB.add(reg_number);
        }
    
        // Get all registrations
        const result = await registrationListDB.getAll();
    
        for (let i = 0; i < result.length; i++) {
            const expected = {
                car_registration: reg_numbers[i],
                id: result[i].id,
                town: result[i].town
            };
            
            assert.deepStrictEqual(result[i], expected);
        }
    });
    

    it('should not add an existing registration number', async () => {
        let reg_number = 'CA 123 123';
        await registrationListDB.add(reg_number);
        let exists = await registrationListDB.isExisting(reg_number);
        await registrationListDB.add(reg_number);

        assert.equal(exists, true)

    });

    it('reset the database', async () => {
        registrationListDB.reset();
        let all = await registrationListDB.getAll()
        assert.deepEqual([], all)
    })

    after(function () {
        db.$pool.end;
    });
})


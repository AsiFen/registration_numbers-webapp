//Test for when:
// there are no registrations in the table
// a car registration is added to the table
//an existing registration is added to the table 
// you view all the registration
//delete from the database

import assert from 'assert';
// import db from '../dabatase/db_connection.js';
import RegistrationListDB from '../dabatase/database_logic.js';

import pgPromise from 'pg-promise';

const connectionString = process.env.DATABASE_URL || "postgresql://asisipho:asisipho123@localhost:5432/users";

const db = pgPromise()(connectionString);

describe('Database Tests for Registration WebApp', () => {
    let registrationListDB = RegistrationListDB(db);

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
                'car_registration': reg_numbers[i],
                'id': result[i].id,
                'town': result[i].town
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

    it('should retrieve the town ID for a registration number', async () => {
        await registrationListDB.add('CT 2010');
        const townId = await registrationListDB.retrieveUserTown('CT 2010');
        assert.equal(townId, 3);
    });

    it('should retrieve a car registration by townID', async () => {
        const reg_number = 'CA 123 123';
        await registrationListDB.add(reg_number);
        const regId = await registrationListDB.getRegId(reg_number);
        const carReg = await registrationListDB.getCarRegistration(regId);
        assert.equal(carReg.car_registration, reg_number);

    });

    it('should filter registration numbers by town', async () => {
        const reg_numbers = ['CA 123 123', 'CA 123 456', 'CL 654 321', 'CT 313 14'];
        for (const reg_number of reg_numbers) {
            await registrationListDB.add(reg_number);
        }

        const filteredTown = 'CA';
        const filteredRegistrations = await registrationListDB.filterReg(filteredTown);

        assert.deepEqual(filteredRegistrations, [{ 'car_registration': '123 123' }, { 'car_registration': 'CA 123 456' }])
    });

    it('should filter registration numbers by selecting All', async () => {
        const reg_numbers = ["CJ 064 628", "CA 928 456", "CL 654 321", "CT 313 14"];
        for (const reg_number of reg_numbers) {
            await registrationListDB.add(reg_number);
        }

        const allSelected = await registrationListDB.getAll();
        let element=[];
        for (let i = 0; i < allSelected.length; i++) {
            element.push(allSelected[i].car_registration);
        }
        assert.deepEqual(element, reg_numbers)
    });

    it('reset the database', async () => {
        await registrationListDB.reset();

        let all = await registrationListDB.getAll()
        assert.deepEqual([], all)
    });

    after(function () {
        registrationListDB.reset();
        db.$pool.end;

    });
})


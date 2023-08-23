export default function RegistrationListDB(db) {

    async function retrieveUserTown(registration) {
        let indicator = registration.substring(0, 2)
        const usersTown = await db.one('SELECT id FROM town_name WHERE code = $1', [indicator])
        return usersTown.id;
    }

    async function getAll() {
        const all_data = await db.any('SELECT * FROM registration_numbers')
        return all_data;
    }

    async function getCarRegistration(registration_number) {
        const registrations = await db.oneOrNone('SELECT * FROM registration_numbers WHERE name = $1', [registration_number]);
        // return registrations.map(row => row.car_registration);
    }

    async function filterReg(registration) {
        let town = await retrieveUserTown(registration);
        const townId = town.id; 
        const results = await db.any('SELECT car_registration FROM registration_numbers WHERE town = $1', [townId]);
        return results;
    }
    
    async function reset() {
        await db.none('DELETE FROM registration_numbers');
    }

    async function add(registration) {
        let the_town = await retrieveUserTown(registration)
        // let indicator = registration.substring(0, 2);
        console.log(the_town);
        await db.any('INSERT INTO registration_numbers (car_registration, town) VALUES ($1, $2)', [registration, the_town])
    }

    return {
        reset,
        getAll,
        retrieveUserTown,
        getCarRegistration,
        filterReg,
        add
    }
}

export default function RegistrationListDB(db) {

    async function isExisting(registration) {
        // Check if the registration already exists
        const existingRegistration = await db.oneOrNone('SELECT * FROM registration_numbers WHERE car_registration = $1', [registration]);
        return (existingRegistration ? true : false)
    }

    async function add(registration) {
        let the_town = await retrieveUserTown(registration)
        await db.any('INSERT INTO registration_numbers (car_registration, town) VALUES ($1, $2)', [registration, the_town])
    }

    async function filterReg(registration) {
        let town = await retrieveUserTown(registration);
        const results = await db.any('SELECT car_registration FROM registration_numbers WHERE town = $1', [town]);
        return results;
    }

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
        await db.oneOrNone('SELECT * FROM registration_numbers WHERE name = $1', [registration_number]);
    }


    async function reset() {
        await db.none('DELETE FROM registration_numbers');
    }

    return {
        add,
        reset,
        getAll,
        filterReg,
        isExisting,
        retrieveUserTown,
        getCarRegistration
    }
}

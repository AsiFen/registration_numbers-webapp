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

    async function getRegId(registration) {
        const result = await db.one('SELECT id FROM registration_numbers WHERE car_registration = $1', [registration])
        return result.id;
    }

    async function getAll() {
        const all_data = await db.any('SELECT * FROM registration_numbers')
        return all_data;
    }

    async function getCarRegistration(regId) {
       return await db.oneOrNone('SELECT car_registration FROM registration_numbers WHERE id = $1', [regId]);
    }

    async function reset() {
        const cleared = await db.none('DELETE FROM registration_numbers')
        return cleared;
    }
    return {
        add,
        reset,
        getAll,
        getRegId,
        filterReg,
        isExisting,
        retrieveUserTown,
        getCarRegistration
    }
}

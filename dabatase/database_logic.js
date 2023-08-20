export default function RegistrationListDB() {


    async function getAll() {
        const all_data = await db.any('SELECT * FROM registration_numbers')
        return all_data;
    }

    async function getCarRegistration(registration_number) {
        const result = await db.oneOrNone('SELECT * FROM registration_numbers WHERE name = $1', [registration_number]);
        return result
    }

    async function reset() {
        const cleared = await db.none('DELETE FROM greeting')
        return cleared;
    }

    async function insertRegistration(registration_number) {
        try {
            await db.none('INSERT INTO registration_numbers (car_registration)', [registration_number]);
        } catch (error) {
            console.error('Error inserting greeting data:', error);
        }
    }

    return {
        reset,
        getAll,
        getCarRegistration,
        insertRegistration
    }
}
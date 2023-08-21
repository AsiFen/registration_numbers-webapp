export default function RegistrationListDB() {
    async function retrieveUserTown(registration) {
        let indicator = registration.substring(0,2)
        const usersTown = await db.one('SELECT * FROM town_name WHERE name = $1',[indicator])
        return usersTown;
    }

    async function getAll() {
        const all_data = await db.any('SELECT * FROM registration_numbers')
        return all_data;
    }

    async function getCarRegistration(registration_number) {
        const registrations = await db.oneOrNone('SELECT * FROM registration_numbers WHERE name = $1', [registration_number]);
        return registrations.map(row => row.car_registration);
    }

    async function filterReg(registration) {
     let town =  await retrieveUserTown(registration)
        const results = await db.any('SELECT car_registration FROM registration_numbers WHERE town = $1', [town])
    }

    async function reset() {
   await db.none('DELETE FROM registration_numbers');    
    }


    async function add(registration){
    let town =  await retrieveUserTown(registration)
    await db.any('INSERT INTO registration_numbers (car_registration, town) VALUES ($1, 1)',[registration,town])
}
    
    }

    return {
        reset,
        getAll,
        retrieveUserTown,
        getCarRegistration
    }
}


export default function Registration(registrationListDB) {
    let dropdown_value;
    let selectedItem = []
    let filter = false;
    let errorMessage;

    function validRegistration(user_reg) {
        let regExpression = /^C[ALTJ][ ]\d{3}[- ]?\d{1,3}$/
        let user_registration = user_reg.toUpperCase()
        return (regExpression.test(user_registration) === true) ? true : false
    }

    async function addRegistrations(user_reg) {
        filter = false;
        if (validRegistration(user_reg)) {
            let user_registration = user_reg.toUpperCase()
            const exists = await registrationListDB.isExisting(user_registration);
            if (!exists) {
                await registrationListDB.add(user_registration);
                errorMessage = ''
            }
            else {
                errorMessage = 'Already exists!'
                return []
            }
        }
    }


    async function getRegistrations() {

        if (filter) {
            if (dropdown_value == 'all') {
                return selectedItem = await registrationListDB.getAll()
            }
            else {
                return selectedItem = await registrationListDB.filterReg(dropdown_value)
            }
        }
        else {
            return selectedItem = await registrationListDB.getAll();
        }
    }

    async function selectTown(dropdown) {
        filter = true
        dropdown_value = dropdown
    }

    function isTownSelected() {
        return 'No registrations for that town!'
    }

    async function clear() {
        await registrationListDB.reset();
    }

    function errors(reg) {
        let sub = reg.substring(3);
        let indicator = reg.charAt(1).toUpperCase()

        if (reg == '' || reg == null) {
            errorMessage = 'Please enter a vehicle registration'
            return errorMessage
        }
        else if (reg.charAt(0).toLowerCase() !== 'c') {
            errorMessage = 'Registration must start with C'
            return errorMessage
        }
        else if (['A', 'L', 'T', 'J'].includes(indicator) == false) {
            errorMessage = 'Registration must be from Cape Town(CA), Stellenbosch(CL), Ceres(CT) or Paarl(CJ)'
            return errorMessage
        }
        else if (sub.length < 4) {
            errorMessage = 'Registration is too short.'
            return errorMessage
        }
        else if (sub.length > 7) {
            errorMessage = 'Registration is too long.'
            return errorMessage
        }
        else if (!validRegistration(reg)) {
            errorMessage = 'Please enter correct registration.'
            return errorMessage
        }
        return errorMessage
    }

    return {
        addRegistrations,
        getRegistrations,
        selectTown,
        isTownSelected,
        validRegistration,
        clear,
        errors
    }

}

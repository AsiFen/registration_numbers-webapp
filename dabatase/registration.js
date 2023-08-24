
export default function Registration(registrationListDB) {
    let registration_list = []
    let selectedItem = []
    let firstTwoChars;

    function validRegistration(user_registration) {
        let regExpression = /^C[ALTJ][ ]\d{3}[- ]?\d{1,3}$/
        return (regExpression.test(user_registration) === true) ? true : false

    }

    async function addRegistrations(user_registration) {
        if (validRegistration(user_registration)) {
            user_registration.toUpperCase()
            const exists = await registrationListDB.isExisting(user_registration);
            if (!exists) {
                await registrationListDB.add(user_registration);
            }
            
        }
    }

    async function getRegistrations() {
        return registration_list = await registrationListDB.getAll();
    }

    async function selectTown(dropdown_value) {
        selectedItem = []

        if (dropdown_value == 'all') {
            return await registrationListDB.getAll()

        }
        else {
            return await registrationListDB.filterReg(dropdown_value)
        }
    }

    function getIndicator() {
        if (firstTwoChars) {
            return firstTwoChars
        }
    }

    function getSelectedTown() {
        return selectedItem
    }

    function isTownSelected() {
        return (selectedItem.length === 0) ? true : false
    }

    async function clear() {
        registration_list = []
        selectedItem = []
        firstTwoChars;
        await registrationListDB.reset();

    }

    async function errors(reg) {
        let errorMessage;
        let sub = reg.substring(3);
        let indicator = reg.charAt(1).toUpperCase()
        const exists = await registrationListDB.isExisting(reg);

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
        else if (!validRegistration()) {
            errorMessage = 'Please enter correct registration.'
            return errorMessage
        }

        else if (exists) {
            errorMessage = 'Already exists'
            return errorMessage
        }
    }

    return {
        addRegistrations,
        getRegistrations,
        getSelectedTown,
        selectTown,
        isTownSelected,
        getIndicator,
        validRegistration,
        clear,
        errors
    }

}
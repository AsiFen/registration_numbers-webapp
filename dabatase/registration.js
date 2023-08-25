
export default function Registration(registrationListDB) {
    let registration_list = []
    let selectedItem = []
    let firstTwoChars;
    let errorMessage;

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
            else {
                errorMessage = 'Already exists!'
                return false
            }
        }
    }

    async function getRegistrations() {
        return registration_list = await registrationListDB.getAll();
    }

    async function selectTown(dropdown_value) {
        if (dropdown_value == 'all') {
            return selectedItem = await registrationListDB.getAll()

        }
        else {
            return selectedItem = await registrationListDB.filterReg(dropdown_value)
        }
    }

    function getIndicator() {
        if (firstTwoChars) {
            return firstTwoChars
        }
    }

     function getSelectedTown() {
        return  selectedItem
    }

    function isTownSelected() {
        return (selectedItem.length === 0) ? true : false
    }

    async function clear(RegistrationListDB) {
        await registrationListDB.reset();
        registration_list = []
        selectedItem = []
        firstTwoChars;
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
        getSelectedTown,
        selectTown,
        isTownSelected,
        getIndicator,
        validRegistration,
        clear,
        errors
    }

}
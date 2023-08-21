export default function Registration() {
    let registration_list = []
    let selectedItem = []
    let firstTwoChars;

    function validRegistration(user_registration) {
        let regExpression = /^C[ALTJ][ ]\d{3}[- ]?\d{1,3}$/
        return (regExpression.test(user_registration) === true) ? true : false

    }

    function addRegistrations(user_registration) {
        if (validRegistration(user_registration)) {
            if (registration_list[user_registration] == undefined) {
                registration_list.push(user_registration)
                registration_list[user_registration] = 0

            }
        }
    }

    function getRegistrations() {
        return registration_list
    }

    function selectTown(dropdown_value) {
        selectedItem = []
        for (let i = 0; i < registration_list.length; i++) {
            firstTwoChars = registration_list[i].charAt(0) + registration_list[i].charAt(1)
            if (dropdown_value == firstTwoChars || dropdown_value == 'all') {
                selectedItem.push(registration_list[i])
            }
        }
    }
    
    function getIndicator() {
        if (firstTwoChars) {
            return firstTwoChars
        }
    }

    function getSelectedTown() {
        //   if  (isTownSelected()){
        return selectedItem
        // }
    }

    function isTownSelected() {
        return (selectedItem.length === 0) ? true : false
    }

    function clear() {
        if (confirm('Are you sure you want to clear all registrations?')) {
            localStorage.clear();
        }
    }

    function errors(reg) {
        let errorMessage;
        let sub = reg.substring(3);
        let indicator = reg.charAt(1).toUpperCase()
        if (reg == '' || reg == null) {
            errorMessage = 'Please enter a vehicle registration'
            return errorMessage
        } else
            if (reg.charAt(0).toLowerCase() !== 'c') {
                errorMessage = 'Registration must start with C'
                return errorMessage
            } else
                if (['A', 'L', 'T', 'J'].includes(indicator) == false) {
                    errorMessage = 'Registration must be from Cape Town(CA), Stellenbosch(CL), Ceres(CT) or Paarl(CJ)'
                    return errorMessage
                } else
                    if (sub.length < 4) {
                        errorMessage = 'Registration is too short.'
                        return errorMessage
                    } else
                        if (sub.length > 7) {
                            errorMessage = 'Registration is too long.'
                            return errorMessage
                        }
                        else
                            if (!validRegistration()) {

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
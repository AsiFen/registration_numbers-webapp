export default function RegistrationRoute() {
    async function show_registration(req, res) {
        let registration_no = req.params.registration_no;
        console.log(registration_no);
        res.render('registration', {
            showReg: registration_no
        })
    }
    return {
        show_registration
    }
}
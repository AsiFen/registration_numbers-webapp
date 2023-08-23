export default function Example() {
    async function asiphe(req, res) {
        let registration_no = req.params.registration_no;
        res.render('registration', {
            showReg: registration_no
        })
    }
    return {
        asiphe
    }
}
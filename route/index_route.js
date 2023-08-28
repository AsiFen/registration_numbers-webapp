export default function IndexRoute(registration) {
    async function show(req, res) {

        let userReg = await registration.getRegistrations();

        let errorMessage = req.flash('errors')[0];
        let resetMessage = req.flash('reset')[0];
        let filter = req.flash('filter')[0];

        res.render('index', {
            car_registration: userReg,
            select_messages: userReg.length == 0 ? filter : '',
            error_message: errorMessage,
            reset_message: resetMessage
        })
    }

    async function getSelection(req, res) {
        let town = req.body.towns;
        await registration.selectTown(town);
        req.flash('filter', registration.isTownSelected())
        res.redirect('/')
    }

    async function reset(req, res) {
        registration.clear();
        req.flash('reset', 'Successfully cleared!')
        res.redirect('/')
    }

    async function addRegistration(req, res) {
        let car_reg = req.body.car_reg;

        registration.validRegistration(car_reg.toUpperCase());
        await registration.addRegistrations(car_reg.toUpperCase());

        req.flash('errors', registration.errors(car_reg.toUpperCase()));
        req.flash('addPressed', )

        res.redirect('/');
    }

    return {
        show,
        reset,
        getSelection,
        addRegistration
    }

}

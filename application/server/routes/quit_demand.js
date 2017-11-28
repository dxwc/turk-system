const quit_model = require('../models/quit');

const quit_demand = (app) =>
{
    app.post('/quit_demand', (req, resp) =>
    {
        new quit_model
        (
            {
                user_id : req.body.user_id,
                demand_text : req.body.demand_text
            }
        )
        .save()
        .then((result) =>
        {
            resp.json({ sent_successful : true });
        })
        .catch((err) =>
        {
            resp.status(500).end();
        });
    });

    return app;
}

module.exports = quit_demand;
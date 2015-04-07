module.exports = function (app) {

    // Very simple REST API without validation, for advanced REST APIs use connect-rest
    app.get('/api/:name', function(req, res) {

        res.json({
           givenName: req.params.name,
            length: req.params.name.length
        });
    });
};
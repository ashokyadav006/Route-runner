var rr = rr || {};

rr.LoginView = Backbone.View.extend({
    
    
    initialize: function (options) {
        if (options && options.user) {
            this.user = option.user;
        } else {
            this.user = null;
        }
    },
    
    render: function () {
        var loginButton = $("#loginButton");
        loginButton.removeClass("hidden");
        if (!this.user) {
            loginButton.text("Log In");
        } else {
            loginButton.text("Log Out");
        }
    }
});
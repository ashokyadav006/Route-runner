'use strict';

var rr = rr || {};

var User = Backbone.Model.extend({
    
    defaults: {
        id : null,
        name: "",
        email: ""
    }
});
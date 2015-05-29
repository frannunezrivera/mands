var Q2 = {
    validate: (function() {
        'use strict';

        var PRIVATE = {
            isFunction: function(functionToCheck) {
                var getType = {};
                return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
            },

            showErrorMsg: function(validationObj) {
                var msg = this.errorMessages[validationObj.validation] || this.errorMessages['default'];
                var field = validationObj.el;

                field.classList.add('error');
                field.nextElementSibling.innerHTML = msg;
                field.nextElementSibling.style.display = '';
                //validationForm.find('.btn-success').attr('disabled', 'disabled');

            },

            hideErrorMsg: function(validationObj) {
                var field = validationObj.el;

                field.classList.remove('error');
                field.nextElementSibling.innerHTML = '';
                field.nextElementSibling.style.display = 'none';
            },

            // The error messages for the validation should have the same name as the validation functions
            errorMessages: {
                email: 'You introduced a incorrect email',
                empty: 'Please complete this field',
                textDate: 'The date is incorrect',
                number: 'This field can only contain numbers',
                default: 'The value for this field is incorrect'
            },

            // The validation functions will use the error messages if the msg can't be found it will use the default one
            validations: {
                email: function(email) {
                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(email.value);
                },

                empty: function(field) {
                    return field.value !== '';
                },

                number: function(number) {
                    var re = /^\d+$/;
                    return re.test(number.value);
                },

                result: function(field, result) {
                    return parseInt(field.value) === result;
                },

                inArray: function(field, result) {
                    return result.indexOf(field.value) === -1;
                }
            },

            // This function uses the array argument to show the validations
            // validationsArray format: [{validation: 'validation-function-name',el: HTML Element to be validated}]
            // validationsArray example: this.validate([{ validation: 'empty', el: el }]);
            // You can add multiple validations but it will stop in and show the first error

            validate: function(validationsArray) {
                var me = this;
                var validate = true;
                validationsArray.forEach(function(validationObject, index) {
                    var validationFunction = me.validations[validationObject.validation];

                    if (me.isFunction(validationFunction)) {
                        // if (!validationFunction(validationObject.el)) {
                        if (!validationFunction.call(null, validationObject.el, validationObject.result)) {
                            me.showErrorMsg(validationObject);
                            validate = false;
                            return false;
                        } else {
                            me.hideErrorMsg(validationObject);
                        }
                    }
                });

                return validate;
            }
        };

        return {
            validateEmpty: function(el) {

                return PRIVATE.validate([{
                    validation: 'empty',
                    el: el
                }]);
            },

            validateEmail: function(el, result) {

                return PRIVATE.validate([{
                    validation: 'empty',
                    el: el
                }, {
                    validation: 'email',
                    el: el
                }, {
                    validation: 'inArray',
                    el: el,
                    result: result
                }]);
            },

            validateNumber: function(el) {

                return PRIVATE.validate([{
                    validation: 'empty',
                    el: el
                }, {
                    validation: 'number',
                    el: el
                }]);
            },

            validateResult: function(el, result) {

                return PRIVATE.validate([{
                    validation: 'empty',
                    el: el
                }, {
                    validation: 'result',
                    el: el,
                    result: result
                }]);
            }
        };
    }()),
    init: function() {
        'use strict';
        //var users = ['test@test.com', 'fran@ma'];
        var nameField = document.querySelector('#name');
        var emailField = document.querySelector('#email');
        var ccField = document.querySelector('#creditCard');
        var snField = document.querySelector('#securityNumber');
        var captchaField = document.querySelector('#captcha');
        var questionField = document.querySelector('#question');

        var randomA = Math.floor((Math.random() * 10) + 1);
        var randomB = Math.floor((Math.random() * 10) + 1);
        questionField.innerHTML = randomA + ' + ' + randomB + ' ? ';

        nameField.addEventListener('blur', function() {
            Q2.validate.validateEmpty(nameField);
        });
        emailField.addEventListener('blur', function() {
            Q2.validate.validateEmail(emailField);
        });
        ccField.addEventListener('blur', function() {
            Q2.validate.validateNumber(ccField);
        });
        snField.addEventListener('blur', function() {
            Q2.validate.validateNumber(snField);
        });

        captchaField.addEventListener('blur', function() {
            Q2.validate.validateResult(captchaField, (randomA + randomB));
        });

    }

};

(function() {
    'use strict';
    Q2.init();
})();
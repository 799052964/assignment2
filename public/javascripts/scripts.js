$('.comfirmation').on('click', function(){
    return confirm('Are you sure you want to delete this?');
});

// password equals confirm check
var validator = $('#registerForm').validate({
   rules:{
       confirm:{
           required: true,
           equalTo: '#password'
       }
   },
   messages:{
        confirm:{
            equalTo:'Your Passwords do not Match.'
        }
   }
});
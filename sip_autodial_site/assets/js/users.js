(function ($) {
    
    $('.navbar .menu-users').addClass('active');
    
    $('#user-modal').on('show.bs.modal', function (event) {
        let $button, $modal;
        
        $button = $(event.relatedTarget);
        $modal = $(this);
        
        if($button.attr('data-action') === 'create') {
            $modal.find('.modal-title').text('Create User');
            $modal.find('#login').val('');
            $modal.find('#password').val('');
            $modal.find('#email').val('');
            $modal.find('#numbers').val('');
            $modal.find('#price-per-channel').val('');
            $modal.find('#balance').val('');
            $modal.find('#access').val('');
            tmp.action = 'create';
        } else {
            
            tmp.userId = $button.parents('tr.user-data').attr('data-id');            
            $modal.find('.modal-title').text('Edit User');
            tmp.action = 'edit';
            $.get(`/user?_id=${tmp.userId}`)
                .done((res) => {
                    if(!res.error) {
                        $modal.find('#login').val(res.data[0].login);
                        $modal.find('#password').val(res.data[0].password);
                        $modal.find('#email').val(res.data[0].email || '');
                        $modal.find('#numbers').val(res.data[0].numbers || '');
                        $modal.find('#price-per-channel').val(res.data[0].pricePerChannel || '');
                        $modal.find('#balance').val(res.data[0].balance || '');
                        $modal.find('#access').val(res.data[0].access || '');
                    }
                });
        }
        
    });
    
    $('#user-modal').on('hide.bs.modal', function (event) {
        tmp.clear();
    });
    
    $('#btn-user-save').on('click', function () {
        
        let userData;
        
        userData = {
            login: $('#login').val() || undefined,
            password: $('#password').val() || undefined,
            email: $('#email').val() || undefined,
            numbers: $('#numbers').val() || undefined,
            pricePerChannel: $('#price-per-channel').val() || undefined,
            balance: $('#balance').val() || undefined,
            access: $('#access').val() || undefined,
        };
        
        if(tmp.action === 'create') {
            $.post('/user', userData)
                .done((res) => {
                    if(!res.error) {
                        window.location = '/users';
                    }
                });
        } else {
            $.ajax({
                url: `/user?_id=${tmp.userId}`,
                type: 'PUT',
                data: userData
            }).done((res) => {
                    if(!res.error) {
                        window.location = '/users';
                    }
            });
        }
        
    });
    
    $('.btn-user-remove').on('click', function () {
        
        let $userData;
        
        $userData = $(this).parents('tr.user-data');
        if(confirm('Do you really want to remove user ' + $userData.attr('data-login') + '?')){
            
            $.ajax({
                type: 'DELETE',
                url: '/user?_id=' + $userData.attr('data-id') 
            }).done((res) => {
                
                if(!res.error) {
                    window.location = '/users';
                }
                
            });
            
        }
        
    });
    
})(jQuery);
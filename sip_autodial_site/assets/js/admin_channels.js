(function ($) {
    
    $('.navbar .menu-channels').addClass('active');
    
    $('#channel-modal').on('show.bs.modal', function (event) {
        let $button, $modal;
        
        $button = $(event.relatedTarget);
        $modal = $(this);
        
        if($button.attr('data-action') === 'create') {
            $modal.find('.modal-title').text('Add Channel');
            $modal.find('#name').val('');
            $modal.find('#owner').val('');
            $modal.find('#provider').val('');
            $modal.find('#sip-login').val('');
            $modal.find('#sip-password').val('');
            $modal.find('#number').val('');
            tmp.action = 'create';
        } else {
            tmp.channelId = $button.parents('tr.channel-data').attr('data-id');            
            $modal.find('.modal-title').text('Edit Channel');
            tmp.action = 'edit';
            $.get(`/channel?_id=${tmp.channelId}`)
                .done((res) => {
                    if(!res.error) {
                        $modal.find('#name').val(res.data[0].name || '');
                        $modal.find('#owner').val(res.data[0].owner);
                        $modal.find('#provider').val(res.data[0].provider);
                        $modal.find('#sip-login').val(res.data[0].sipLogin);
                        $modal.find('#sip-password').val(res.data[0].sipPassword);
                        $modal.find('#number').val(res.data[0].number || '');
                    }
                });
        }
        
    });
    
    $('#channel-modal').on('hide.bs.modal', function (event) {
        tmp.rm('action');
    });
    
    $('#btn-channel-save').on('click', function () {
        
        let channelData;
        
        channelData = {
            name: $('#name').val() || undefined,
            owner: $('#owner').val(),
            ownerName: $('#owner option:selected').attr('data-login') || '',
            provider: $('#provider').val() || undefined,
            sipLogin: $('#sip-login').val() || undefined,
            sipPassword: $('#sip-password').val() || undefined,
            number: $('#number').val() || undefined,                                    
        };
        
        if(tmp.action === 'create') {
            $.post('/channel', channelData)
                .done((res) => {
                    if(!res.error) {
                        addChannelRow(res.data || channelData);
                    }
                });
        } else {
            $.ajax({
                url: `/channel?_id=${tmp.channelId}`,
                type: 'PUT',
                data: channelData
            }).done((res) => {
                    if(!res.error && res.data) {
                        let attrs = {};
                        
                        attrs['data-siplogin'] = channelData.sipLogin;
                        $(`tr.channel-data[data-id=${tmp.channelId}]`)
                            .attr(attrs)
                            .find('.channel-name')
                                .text(channelData.name).end()
                            .find('.channel-provider')
                                .text(channelData.provider).end()
                            .find('.channel-siplogin')
                                .text(channelData.sipLogin).end()
                            .find('.channel-sippassword')
                                .text(channelData.sipPassword).end()
                            .find('.channel-owner')
                                .text(channelData.ownerName).end();
                        tmp.rm('channelId');
                    }
            });
        }
        
    });
    
    $(document).on('click', '.btn-channel-remove', function () {
        
        let $channelData;
        
        $channelData = $(this).parents('tr.channel-data');
        if(confirm('Do you really want to remove channel ' + $channelData.attr('data-siplogin') + '?')){
            
            $.ajax({
                type: 'DELETE',
                url: '/channel?_id=' + $channelData.attr('data-id') 
            }).done((res) => {
                
                if(!res.error && res.data) {
                    $channelData.remove();
                }
                
            });
            
        }
        
    });
    
    /**
     * Select functionality
     **/
    
    $('.btn-select-all').on('click', () => {
        
        checkAllCheckboxes('#channel-table');
        _selectChannelsSwitch();
        
    });
    
    $('.btn-select-none').on('click', () => {
        
        uncheckAllCheckboxes('#channel-table');
        _selectChannelsSwitch();
        
    });
    
    $(document).on('click', '.channel-data', function () {
                
        $(this).find('.channel-checkbox input').click();
        
    });
    
    $(document).on('change', '.channel-checkbox input', function () {
        
        _selectChannelsSwitch();
        
    });
    
    function addChannelRow(channel) {
        
        let row = `
        <tr data-id="${channel._id}" data-siplogin="${channel.sipLogin}" class="channel-data">
            <th class="channel-checkbox">
                <input type="checkbox"/>
            </th>
            <th class="channel-name">${channel.name}</th>
            <th class="channel-provider">${channel.provider}</th>
            <th class="channel-siplogin">${channel.sipLogin}</th>
            <th class="channel-sippassword">${channel.sipPassword}</th>
            <th class="channel-status"><span class="label label-success">idle</span></th>
            <th class="channel-owner">${channel.ownerName}</th>
            <th>
                <div class="btn-group btn-group-sm">
                <button title="Pause" class="btn btn-warning btn-channel-ctrl"><span class="glyphicon glyphicon-pause"></span></button>
                <button title="Edit" data-toggle="modal" data-target="#channel-modal" data-action="edit" class="btn btn-primary btn-channel-edit"><span class="glyphicon glyphicon-pencil"></span></button>
                <button title="Remove" class="btn btn-danger btn-channel-remove"><span class="glyphicon glyphicon-remove"></span></button>
                </div>
            </th>
        </tr>
        `;
        
        $('table#channel-table tbody').append(row);
        
    }
    
})(jQuery);

function _selectChannelsSwitch() {
   
    if([].every.call($('.channel-checkbox input'), el => !el.checked)) {
        $('.btn-select').addClass('disabled');
    } else {
        $('.btn-select').removeClass('disabled');
    }
    
}
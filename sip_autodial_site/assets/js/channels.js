(function ($) {
    
    $('.navbar .menu-channels').addClass('active');
    
    
    /**
     * Modal functionality
     **/
    $('#channel-modal').on('show.bs.modal', function (event) {
        let $button, $modal;
        
        $button = $(event.relatedTarget);
        $modal = $(this);
        tmp.channelId = $button.parents('tr.channel-data').attr('data-id');            
        $modal.find('.modal-title').text('Edit Channel');
        tmp.action = 'edit';
        $.get(`/channel?_id=${tmp.channelId}`)
            .done((res) => {
                if(!res.error) {
                    $modal.find('#number').val(res.data[0].number || '');
                }
            });
        
    });
    
    $('#channel-modal').on('hide.bs.modal', () => {
        tmp.rm('action');
    });
    
    $('#btn-channel-save').on('click', () => {
        
        let channelData;
        
        channelData = {
            number: $('#number').val() || undefined
        };

        $.ajax({
            url: `/channel?_id=${tmp.channelId}`,
            type: 'PUT',
            data: channelData
        }).done((res) => {
                if(!res.error && res.data) {
                    $(`tr.channel-data[data-id=${tmp.channelId}]`)
                        .find('.channel-number')
                            .text(channelData.number).end();
                    tmp.rm('channelId');
                }
        });
        
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
    
})(jQuery);

function _selectChannelsSwitch() {
   
    if([].every.call($('.channel-checkbox input'), el => !el.checked)) {
        $('.btn-select').addClass('disabled');
    } else {
        $('.btn-select').removeClass('disabled');
    }
    
}
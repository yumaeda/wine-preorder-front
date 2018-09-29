$(document).ready(function()
{
    $('div.contents').on('click', 'a.link--action-addtocart', function()
    {
        var $parentTd = $(this).closest('td'),
            strId     = $(this).attr('id'),
            intQty    = 1;

        $parentTd.html('<img src="../wholesale/load_ajax_post.gif" style="width:15px;height:15px;" />');

        $.post('../cart.php', { pid: strId, action: 'add', qty: intQty, cart_type: 2 })
            .done(function(data)
            {
                $parentTd.html('<img src="../wholesale/success.png" style="width:15px;height:15px;" />');
            });

        return false;
    });
});

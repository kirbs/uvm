YUI().use('transition', 'panel', function (Y) {

    var openBtn = Y.one('#openButton'),
        panel, bb;

    function showPanel() {
        panel.show();
        bb.transition({
            duration: 0.5,
            top     : '80px'
        });
    }

    function hidePanel() {
        bb.transition({
            duration: 0.5,
            top     : '-300px'
        }, function () {
            panel.hide();
        });
    }

    panel = new Y.Panel({
        srcNode: '#panelContent',
        width  : 330,
        xy     : [300, -300],
        zIndex : 5,
        modal  : true,
        visible: false,
        render : true,
        buttons: [
            {
                value  : 'Close the panel',
                section: 'footer',
                action : function (e) {
                    e.preventDefault();
                    hidePanel();
                }
            }
        ]
    });

    bb = panel.get('boundingBox');

    openBtn.on('click', function (e) {
        showPanel();
    });

});
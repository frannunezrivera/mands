(function() {
    'use strict';

    var dataImg = [{
        thumb: 'http://placehold.it/140x100&text=Image+One',
        large: 'http://placehold.it/350x150&text=Image+One+Large'
    }, {
        thumb: 'http://placehold.it/140x100&text=Image+Two',
        large: 'http://placehold.it/350x150&text=Image+Two+Large'
    }, {
        thumb: 'http://placehold.it/140x100&text=Image+Three',
        large: 'http://placehold.it/350x150&text=Image+Three+Large'
    }];

    var template = function(tpl, data) {
        var re = /{{([^}}]+)?}}/g,
            match = re.exec(tpl);

        while (match !== null) {
            tpl = tpl.replace(new RegExp(match[0], 'g'), data[match[1]]);
            match = re.exec(tpl);
        }
        return tpl;
    };

    function showBig(e) {
        e.preventDefault();
        largeImg.src = e.currentTarget.href;
        largeImg.dataset.index = e.currentTarget.dataset.index;
    }

    function addThumbs() {
        var tpl = '<a href="{{large}}" title="Image {{index}}" data-index="{{index}}"><img src="{{thumb}}" /></a> ';
        var html = '';

        dataImg.forEach(function(obj, index) {
            obj.index = index + 1;
            html += template(tpl, obj);
        });
        galleryThumbs.innerHTML = html;

        var thumbs = galleryThumbs.querySelectorAll('a');
        for (var i = 0; i < thumbs.length; i++) {
            thumbs[i].onclick = showBig;
        }

        return thumbs;
    }

    function navigate(e) {
        e.preventDefault();
        var index;
        if (e.target.dataset.navigate === 'prev') {
            index = parseInt(largeImg.dataset.index) - 1;
            if (index < 1) {
                return;
            } else {
                thumbs.item(index - 1).click();
            }
        } else {
            index = parseInt(largeImg.dataset.index) + 1;
            if (index > thumbs.length) {
                return;
            } else {
                thumbs.item(index - 1).click();
            }
        }
    }

    var largeImgContainer = document.querySelector('#largeImg');
    var largeImg = largeImgContainer.querySelector('img');
    var galleryThumbs = document.querySelector('.thumbs');
    var navigatorLinks = largeImgContainer.querySelectorAll('a');
    var thumbs = addThumbs();

    for (var i = 0; i < navigatorLinks.length; i++) {
        navigatorLinks[i].onclick = navigate;
    }
})();
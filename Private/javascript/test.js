/**
 * Created by ry57 on 04.06.16.
 */

// external js: isotope.pkgd.js
function startIsotope() {
    // init Isotopevar
    $grid = $('.grid').isotope({
        itemSelector: '.task',
        layoutMode: 'fitRows'
    });
    // filter functions
    var filterFns = {
        // show if number is greater than 50
        //numberGreaterThan50: function() {
        //    var number = $(this).find('.number').text();
        //    return parseInt( number, 10 ) > 50;
        //},
        // show if name ends with -ium
        categoryMarketing: function() {
            var name = $(this).find('.category-marketing').get(0)
            return name;
        },
        categoryDesign: function() {
            var name = $(this).find('.category-design').get(0)
            return name;
        },
        categoryText: function() {
            var name = $(this).find('.category-text').get(0)
            return name;
        },
        categoryTranslation: function() {
            var name = $(this).find('.category-translation').get(0)
            return name;
        },
        categoryDevelopment: function() {
            var name = $(this).find('.category-development').get(0)
            return name;
        }
    };
    // bind filter button click
    $('.filters-button-group').on( 'click', '.btn', function() {
        var filterValue = $( this ).attr('data-filter');
        // use filterFn if matches value
        filterValue = filterFns[ filterValue ] || filterValue;
        $grid.isotope({ filter: filterValue });
    });
    // change is-checked class on buttons
    $('.btn-group').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', '.btn', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
        });
    });
}
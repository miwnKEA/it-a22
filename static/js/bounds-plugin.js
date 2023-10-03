/* jQuery plugin to do bounds checking, as a debugging aid for programming
using jQuery. It's easy to make a mistake in a selector, so that it
doesn't match anything in the document, or matches too many things or some
such.

This plugin allows you insert a method into the chain to check how many
items are in the collection at that point. For example, to ensure that
you're removing exactly one element from the document, you can do:

   $(sel).bounds(1,1).remove();

   The general syntax is .bound(min,max).  The method will complain if the
   length of the collection is less than min or greater than max.
   Equality yields no complaint.

   If max is omitted, there's no maximum, so if you want to ensure that you
   are removing at least one element from the document, you do:

   $(sel).bounds(1).remove();

   Because this is intended to be a debugging aid, the plugin throws a
   RangeError if the bounds-check doesn't match.

   As a shorthand for two common cases:
        .one() is the same as .bounds(1,1)
        .some() is the same as .bounds(1)

   Written by Scott D. Anderson
   scott.anderson@wellesley.edu
   Nov 22, 2013

Feb 2020, added the .some() method.

Creative Commons license

TODO:

Allow it to use console.log instead?

*/


(function ( $ ) {
    $.fn.bounds = function(min,max) {
        var len = this.length;
        if(len < min) {
            var only = 'jQuery collection has only '+len+' elements, ';
            throw new RangeError(only+" but specified minimum is "+min);
        } else if( max && len > max ) {
            var msg = 'jQuery collection has '+len+' elements, ';
            throw new RangeError(msg+" but specified maximum is "+max);
        }
        return this;
    };

    $.fn.one = function() {
        var len = this.length;
        if(len!=1) 
            throw new RangeError('jQuery collection has '+len+' elements, '
                                 + ' it should have exactly one');
        return this;
    };
        
    $.fn.some = function() {
        var len = this.length;
        if(len==0) 
            throw new RangeError('jQuery collection has zero elements, '
                                 + ' it should have some');
        return this;
    };
        
}( jQuery ));
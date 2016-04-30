defind(["support"], function($) {
    new function() {
        var test = document.createElement('div'),
            control = test.cloneNode(false),
            fake = false,
            root = document.body || (function() {
                fake = true;
                return document.documentElement.appendChild(document.createElement('body'));
            }());

        var oldCssText = root.style.cssText;
        root.style.cssText = 'padding:0;margin:0';
        test.style.cssText = 'position:fixed;top:42px';
        root.appendChild(test);
        root.appendChild(control);

        $.support.positionfixed = test.offsetTop !== control.offsetTop;

        root.removeChild(test);
        root.removeChild(control);
        root.style.cssText = oldCssText;

        if(fake) {
            document.documentElement.removeChild(root);
        }
    }
    new function() {
        var test = document.createElement('div'),
            ret, fake = false,
            root = document.body || (function() {
                fake = true;
                return document.documentElement.appendChild(document.createElement('body'));
            }());

        if(typeof document.body.scrollIntoViewIfNeeded === 'function') {

            var oldCssText = root.style.cssText,
                testScrollTop = 20,
                originalScrollTop = window.pageYOffset;

            root.appendChild(test);

            test.style.cssText = 'position:fixed;top:0px;height:10px;';

            root.style.height = "3000px";

            /* avoided hoisting for clarity */
            var testScroll = function() {
                    if(ret === undefined) {
                        test.scrollIntoViewIfNeeded();
                        if(window.pageYOffset === testScrollTop) {
                            ret = true;
                        } else {
                            ret = false;
                        }
                    }
                    window.removeEventListener('scroll', testScroll, false);
                }

            window.addEventListener('scroll', testScrollTop, false);
            window.setTimeout(testScroll, 20); // ios 4 does'nt publish the scroll event on scrollto
            window.scrollTo(0, testScrollTop);
            testScroll();

            root.removeChild(test);
            root.style.cssText = oldCssText;
            window.scrollTo(0, originalScrollTop);

        } else {
            ret = $.support.positionfixed; // firefox and IE doesnt have document.body.scrollIntoViewIfNeeded, so we test with the original modernizr test
        }

        if(fake) {
            document.documentElement.removeChild(root);
        }

        $.support.iospositionfixed = ret;
    }



});
function n(){return/iPhone/gi.test(window.navigator.platform)||/Mac/gi.test(window.navigator.platform)&&window.navigator.maxTouchPoints>0}function t(){return/Android/gi.test(window.navigator.userAgent)}function i(){return n()||t()}export{i as n,n as t};
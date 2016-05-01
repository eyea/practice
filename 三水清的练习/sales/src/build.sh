rm -rf output
mkdir -p output

cp -r css font img js sound *.html *.json *.png background.js output

cd output
fe js background.js -o background.js

fe js js/options.js -o js/options.js
fe js js/query.js -o js/query.js
fe js js/popup.js -o js/popup.js


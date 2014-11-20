
DEPS=Makefile build.js require.js nocms.user.js

all: jquery.js jquery.min.js aloha.js aloha.min.js nocms.deps.js nocms.deps.min.js

jquery.js: jquery-2.1.1.js
	: >$@
	echo 'define([], function() { var module = { exports: {} };' >>$@
	cat $< >>$@
	echo 'return module.exports; });' >>$@

jquery.min.js: jquery-2.1.1.min.js
	: >$@
	echo 'define([], function() { var module = { exports: {} };' >>$@
	cat $< >>$@
	echo 'return module.exports; });' >>$@

aloha.js:
	node r.js -o build-aloha.js out=$@ optimize=none

aloha.min.js:
	node r.js -o build-aloha.js out=$@ optimize=uglify2

nocms.deps.js: $(DEPS)
	node r.js -o build.js out=$@ optimize=none

nocms.deps.min.js: $(DEPS)
	node r.js -o build.js out=$@

.PHONY: all jquery.js jquery.min.js aloha.js aloha.min.js nocms.deps.js nocms.deps.min.js


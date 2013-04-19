ALL_TESTS = $(shell find tests/ -name '*.test.js')
ALL_QA = $(shell find tests/ -name '*.qa.js')
REPORTER = spec
UI = bdd

test:
	@$(MAKE) TESTS="$(ALL_TESTS)" run-tests

run-tests:
	@./node_modules/.bin/mocha \
		--require should \
		--reporter $(REPORTER) \
		--ui $(UI) \
		--growl \
		$(TESTS)

update:
	node ./bin/update.js

qa:
	@$(MAKE) TESTS="$(ALL_QA)" UI=exports run-tests

.PHONY: test qa run-tests


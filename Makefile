ALL_TESTS = $(shell find tests/ -name '*.test.js')
ALL_QA = $(shell find tests/ -name '*.qa.js')
REPORTER = spec
UI = bdd

run-tests:
	@./node_modules/.bin/mocha \
		--require should \
		--reporter $(REPORTER) \
		--ui $(UI) \
		--growl \
		$(TESTS)

test:
	@$(MAKE) TESTS="$(ALL_TESTS)" run-tests

qa:
	@$(MAKE) TESTS="$(ALL_QA)" UI=exports run-tests

.PHONY: test

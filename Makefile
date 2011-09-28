ALL_TESTS = $(shell find tests/ -name '*.test.js')
ALL_QA = $(shell find tests/ -name '*.qa.js')

run-tests:
	@./node_modules/.bin/expresso \
		-t 4000 \
		-I support \
		-I lib \
		$(TESTFLAGS) \
		$(TESTS)

test:
	@$(MAKE) TESTS="$(ALL_TESTS)" run-tests

qa:
	@$(MAKE) TESTS="$(ALL_QA)" run-tests

test-cov:
	@TESTFLAGS=--cov $(MAKE) test

.PHONY: test

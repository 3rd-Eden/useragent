ALL_TESTS = $(shell find tests/ -name '*.test.js')

run-tests:
	@./node_modules/.bin/expresso \
		-t 4000 \
		-I support \
		-I lib \
		--serial \
		$(TESTFLAGS) \
		$(TESTS)

test:
	@$(MAKE) TESTS="$(ALL_TESTS)" run-tests

test-cov:
	@TESTFLAGS=--cov $(MAKE) test

.PHONY: test

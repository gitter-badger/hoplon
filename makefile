SRC_NAME = $(shell ls src)

TEST_NAME = $(shell ls test | grep ".ls")

SRC_FILES = ${SRC_NAME:%=--watch src/%}

TEST_FILES = ${TEST_NAME:%=--watch test/%}

MAKEFLAGS += --no-print-directory

file = dist/main.js

pkg:
	yaml2json src/package.yaml > package.json

compile:
	make pkg
	lsc -bco dist src
	lsc -bc test
	node ${file}

compile.time:
	make pkg
	lsc -co dist src
	lsc -c test
	time node ${file}

w.compile:
	make pkg
	nodemon  --exec "make compile || exit 1" ${SRC_FILES} ${TEST_FILES}


.ONESHELL:
SHELL = /bin/bash
.SHELLFLAGS = -ec

travis:
	@for i in test/*.js
	do
		node $$i
	done

testy:
	lsc -bco dist src
	lsc -bc test/*.ls
	make pkg
	make travis

w.testy:
	nodemon --exec "make testy" ${TEST_FILES} ${SRC_FILES}

w.compile.time:
	make pkg
	nodemon  --exec "make compile.time || exit 1" ${SRC_FILES} ${TEST_FILES}

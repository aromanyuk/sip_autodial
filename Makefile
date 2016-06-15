#Makefile for building and running project

all: build
    
build: build_site build_realtime_service build_worker

build_site:
	cd sip_autodial_site; \
	npm install; \
	npm run build

build_realtime_service:
	cd sip_realtime_service; \
	npm install

build_worker:
	cd socket_worker; \
	rm -rf bin; \
	mkdir bin; \
	go build -o bin/main main.go
    
run: run_realtime_service run_worker run_site

run_site:
	cd sip_realtime_service; \
	npm start

run_realtime_service:
	cd socket_worker; \
	npm start
    
run_worker:
	cd socket_worker/bin; \
	./main

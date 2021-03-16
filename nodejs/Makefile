IMG_NAME := jilsx/dd-trace
IMG_VERSION := nodejs

.PHONY: build
build:
	@echo 'build $(VERSION) to $(IMG_NAME)'
	docker build -t $(IMG_NAME):$(IMG_VERSION) -f Dockerfile .

.PHONY: run
run:
	docker run  --env-file .env $(IMG_NAME):$(IMG_VERSION)

.PHONY: run-local
run-local:
	docker run  -d -p 3000:3000 --env-file .env $(IMG_NAME):$(IMG_VERSION)

.PHONY: run-in
run-in:
	docker run -it --env-file .env $(IMG_NAME):$(IMG_VERSION) /bin/bash

.PHONY: push
push:
	@echo 'push $(VERSION) to $(IMG_NAME)'
	docker push $(IMG_NAME):$(IMG_VERSION)

.PHONY: release
release: build push

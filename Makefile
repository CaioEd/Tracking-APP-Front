# ANSI color codes
COLOR_RESET=\033[0m
COLOR_BOLD=\033[1m
COLOR_GREEN=\033[32m
COLOR_YELLOW=\033[33m

help:
	@echo ""
	@echo "  $(COLOR_YELLOW)Available targets:$(COLOR_RESET)"
	@echo ""
	@echo "  $(COLOR_GREEN)install$(COLOR_RESET)		- Install Dependencies"
	@echo "  $(COLOR_GREEN)run$(COLOR_RESET)			- Run Local Machine"
	@echo "  $(COLOR_GREEN)build$(COLOR_RESET)			- Build Image"
	@echo "  $(COLOR_GREEN)production$(COLOR_RESET)		- Run Built Image"
	@echo ""
	@echo "  $(COLOR_YELLOW)Note:$(COLOR_RESET) Use 'make <target>' to execute a specific target."
	@echo ""

install:
	npm install

run:
	npm run dev

build:
	docker build --no-cache -t front .

production:
	docker run --name front -p 80:80 -d front

.PHONY: install run

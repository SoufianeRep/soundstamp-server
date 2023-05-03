init-container:
	docker run --name sspg15 -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres:15-alpine

start-container:
	docker start sspg15

psql-soundstamp:
	docker exec -it sspg15 psql -U root soundstamp

migrate:
	prisma migrate dev --name init

migrate-reset:
	prisma migrate reset

.PHONY: migrate migrate-reset init-database start-container psql-soundstamp

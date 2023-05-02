migrate:
	prisma migrate dev --name init

migrate-reset:
	prisma migrate reset

.PHONY: migrate migrate-reset

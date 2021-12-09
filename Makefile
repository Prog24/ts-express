DBNAME:=sample_db
DOCKER_DNS:=mysql

DB_SERVICE:=mysql
mysql/client:
	docker compose exec $(DB_SERVICE) mysql -uroot -hlocalhost -p

APP_SERVICE:=app
migration/up:
	docker compose exec $(APP_SERVICE) yarn ts-node ./node_modules/.bin/typeorm migration:run

migration/generate:
	docker compose exec $(APP_SERVICE) yarn ts-node ./node_modules/.bin/typeorm migration:generate -n $(name)

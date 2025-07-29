run_back:
	@npm run dev

run_front:
	@cd frontend
	@http-server

# Correr y detener la base de datos
run_db:
	@cd ./backend && sudo docker compose up -d
	@docker ps
	@echo "Base de datos iniciada con exito"

stop_db:
	@cd ./backend && sudo docker compose down
	@docker ps
	@echo "Base de datos detenida con exito"

# Cuando ya tengas la base de datos corriendo, ejecuta este para crear todas las tablas
crear_db:
	@docker exec -i librillo_db psql -U postgres -c "CREATE DATABASE librillo" 

crear_tablas_db:
	@docker exec -i librillo_db psql -U postgres -d librillo < ./backend/scripts/tablas.sql
	@echo "Tablas de Base de datos creadas con exito"

llenar_tablas_db:
	@docker exec -i librillo_db psql -U postgres -d librillo < ./backend/scripts/inserts.sql
	@echo "Base de datos llenada con exito"

# Para acceder a hacer consultas (tiene que estar corriendo la base de datos)
acceder_db:
	@docker exec -it librillo_db psql -U postgres -d librillo
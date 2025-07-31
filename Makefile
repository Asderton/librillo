app: back front
	@echo "App funcionando:"
	@echo "API puerto: 3000"
	@echo "Frontend puerto: 8080"

stop_app: stop_back stop_front
	@echo "App detenida"

back: 
	@gnome-terminal --title="API" -- bash -c "docker compose up backend"
	@echo "--Backend corriendo"

front:
	@gnome-terminal --title="FRONTEND" -- bash -c "docker compose up frontend"
	@echo "--Frontend corriendo"

stop_back: 
	@docker compose down backend
	@echo "Backend detenido con exito"

stop_front:
	@docker compose down frontend
	@echo "Frontend detenido con exito"

app_d: back_d front_d
	@echo "App funcionando:"
	@echo "Backend puerto: 3000"
	@echo "Frontend puerto : 8080"

back_d:
	@docker compose up -d backend
	@echo "--Backend corriendo"

front_d:
	@docker compose up -d frontend
	@echo "--Frontend corriendo"



delete_db:
	@docker compose down --volumes
	@echo "Base de datos eliminada"

# Para acceder a hacer consultas (tiene que estar corriendo la base de datos)
acceder_db:
	@docker exec -it librillo_db psql -U postgres -d librillo
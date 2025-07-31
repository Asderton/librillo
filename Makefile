sudo_app: sudo_back sudo_front
	@echo "App funcionando:"
	@echo "API puerto: 3000"
	@echo "Frontend puerto: 8080"

app: back front
	@echo "App funcionando:"
	@echo "API puerto: 3000"
	@echo "Frontend puerto: 8080"

sudo_stop_app: sudo_stop_back sudo_stop_front
	@echo "App detenida"

stop_app: stop_back stop_front
	@echo "App detenida"


sudo_back: 
	@gnome-terminal --title="API" -- bash -c "sudo docker compose up backend"
	@echo "--Backend corriendo"
back: 
	@gnome-terminal --title="API" -- bash -c "docker compose up backend"
	@echo "--Backend corriendo"


sudo_front:
	@gnome-terminal --title="FRONTEND" -- bash -c "sudo docker compose up frontend"
	@echo "--Frontend corriendo"

front:
	@gnome-terminal --title="FRONTEND" -- bash -c "docker compose up frontend"
	@echo "--Frontend corriendo"


sudo_stop_back: 
	@sudo docker compose down backend
	@echo "Backend detenido con exito"

stop_back: 
	@docker compose down backend
	@echo "Backend detenido con exito"


sudo_stop_front:
	@sudo docker compose down frontend
	@echo "Frontend detenido con exito"

stop_front:
	@docker compose down frontend
	@echo "Frontend detenido con exito"


delete_db:
	@docker compose down --volumes
	@echo "Base de datos eliminada"

# Para acceder a hacer consultas (tiene que estar corriendo la base de datos)
acceder_db:
	@docker exec -it librillo_db psql -U postgres -d librillo
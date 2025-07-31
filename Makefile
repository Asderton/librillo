sudo_app: back front
	@echo "App funcionando:"
	@echo "API puerto: 3000"
	@echo "Frontend puerto: 8080"


sudo_back: 
	@gnome-terminal --title="API" -- bash -c "sudo docker compose up backend; exec bash"
	@echo "--Backend corriendo"

sudo_front:
	@gnome-terminal --title="FRONTEND" -- bash -c "sudo docker compose up frontend"
	@echo "--Frontend corriendo"


app: back front
	@echo "App funcionando:"
	@echo "API puerto: 3000"
	@echo "Frontend puerto: 8080"


back: 
	@gnome-terminal --title="API" -- bash -c "docker compose up backend; exec bash"
	@echo "--Backend corriendo"

front:
	@gnome-terminal --title="FRONTEND" -- bash -c "docker compose up frontend"
	@echo "--Frontend corriendo"


# Para acceder a hacer consultas (tiene que estar corriendo la base de datos)
acceder_db:
	@docker exec -it librillo_db psql -U postgres -d librillo
.PHONY: dev backend frontend

dev:
	@echo "Starting backend and frontend..."
	@(cd backend && uvicorn app.main:app --reload) &
	@cd frontend && npm run dev

backend:
	cd backend && uvicorn app.main:app --reload

frontend:
	cd frontend && npm run dev

from app.database import SessionLocal, Base, engine
from app import crud, models

# 1️⃣ Make tables if they don’t exist
Base.metadata.create_all(bind=engine)

# 2️⃣ Path to your JSON
json_file_path = "data/recipes.json"

# 3️⃣ Open DB session and load JSON
db = SessionLocal()
try:
    crud.load_json_to_db(db, json_file_path)
    print("✅ Recipes loaded successfully!")
finally:
    db.close()

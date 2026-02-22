from sqlalchemy.orm import Session
from . import models, utils
import json

def load_json_to_db(db: Session, file_path: str):
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)  # This will be a dict like {"0": {...}, "1": {...}}

    for key in data:
        item = data[key]  # actual recipe dict
        recipe = models.Recipe(
            cuisine=item.get("cuisine"),
            title=item.get("title"),
            rating=utils.parse_number(item.get("rating")),
            prep_time=utils.parse_number(item.get("prep_time")),
            cook_time=utils.parse_number(item.get("cook_time")),
            total_time=utils.parse_number(item.get("total_time")),
            description=item.get("description"),
            nutrients=item.get("nutrients"),
            serves=item.get("serves")
        )
        db.add(recipe)
    db.commit()

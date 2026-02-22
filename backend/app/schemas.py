# app/schemas.py
from pydantic import BaseModel
from typing import Optional, Dict, List

class RecipeResponse(BaseModel):
    id: int
    cuisine: Optional[str] = None
    title: Optional[str] = None
    rating: Optional[float] = None
    prep_time: Optional[int] = None
    cook_time: Optional[int] = None
    total_time: Optional[int] = None
    description: Optional[str] = None
    nutrients: Optional[Dict[str, str]] = None
    serves: Optional[str] = None
    url: Optional[str] = None  # make optional so backend validation passes

    class Config:
        from_attributes = True  # replacement for orm_mode in Pydantic v2
        json_schema_extra = {   # updated for Pydantic v2 warning
            "example": {
                "id": 1,
                "cuisine": "Southern Recipes",
                "title": "Sweet Potato Pie",
                "rating": 4.8,
                "prep_time": 15,
                "cook_time": 100,
                "total_time": 115,
                "description": "Easy Southern sweet potato pie...",
                "nutrients": {"Calories": "389 kcal", "Carbs": "48 g", "Protein": "5 g"},
                "serves": "8 servings",
                "url": "https://www.allrecipes.com/recipe/12142/sweet-potato-pie-i/"
            }
        }

class RecipeListResponse(BaseModel):
    status: str
    message: str
    total: int
    skip: int
    limit: int
    next: Optional[str] = None
    previous: Optional[str] = None
    recipes: List[RecipeResponse] = []

    class Config:
        from_attributes = True

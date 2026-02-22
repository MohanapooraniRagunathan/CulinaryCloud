# app/routers/recipes.py
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import asc, desc
from typing import Optional
from ..database import get_db
from .. import models, schemas

router = APIRouter()

@router.get("/", response_model=schemas.RecipeListResponse)
def get_recipes(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 10,
    sort_by: str = Query("rating", enum=["rating", "total_time", "prep_time", "cook_time"]),
    sort_order: str = Query("desc", enum=["asc", "desc"]),
    cuisine: Optional[str] = None,
    title: Optional[str] = None
):
    query = db.query(models.Recipe)

    # Filters
    if cuisine:
        query = query.filter(models.Recipe.cuisine.ilike(f"%{cuisine}%"))
    if title:
        query = query.filter(models.Recipe.title.ilike(f"%{title}%"))

    total = query.count()  # total records after filter

    # Sorting
    sort_column = getattr(models.Recipe, sort_by, models.Recipe.rating)  # default to rating
    if sort_order == "asc":
        query = query.order_by(asc(sort_column))
    else:
        query = query.order_by(desc(sort_column))

    # Pagination
    recipes = query.offset(skip).limit(limit).all()

    # Next/Previous links
    next_url = f"/api/recipes/?skip={skip+limit}&limit={limit}" if skip + limit < total else None
    prev_url = f"/api/recipes/?skip={max(skip-limit,0)}&limit={limit}" if skip > 0 else None

    return schemas.RecipeListResponse(
        status="success",
        message="Recipes fetched successfully!",
        total=total,
        skip=skip,
        limit=limit,
        next=next_url,
        previous=prev_url,
        recipes=recipes
    )

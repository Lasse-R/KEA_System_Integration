from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class Spacecraft(BaseModel):
    id: int
    name: str

class SpacecraftRequestModel(BaseModel):
    name: str

Spacecrafts = [
    Spacecraft(id=1, name="Apollo 13"),
    Spacecraft(id=2, name="Challenger"),
    Spacecraft(id=3, name="Enterprise")

]

@router.get("/api/spacecrafts", tags=["spacecraft"], response_model=list[Spacecraft])
def get_spacecrafts():
    return Spacecrafts


@router.get("/api/spacecrafts/{spacecraft_id}", response_model=Spacecraft)
def get_spacecraft_id(spacecraft_id: int):
    for spacecraft in Spacecrafts:
        if spacecraft.id == spacecraft_id:
            return spacecraft
    raise HTTPException(status_code=404, detail="Spacecraft not found")

@router.post("/api/spacecrafts", response_model=Spacecraft)
def create_spacecraft(spacecraft: Spacecraft):
    Spacecrafts.append(spacecraft)
    return spacecraft
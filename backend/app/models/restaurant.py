import uuid

from sqlalchemy import UUID, Column, Enum, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.classes.enums.theme_mode import ThemeMode
from app.models.base import Base


class Restaurant(Base):
    __tablename__ = "restaurant"

    # Columns
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    code = Column(UUID(as_uuid=True), nullable=False, default=uuid.uuid4, unique=True)
    name = Column(String(255), nullable=False)
    description = Column(String, nullable=True)
    addressLine1 = Column(String(600), nullable=False)
    addressLine2 = Column(String(600), nullable=True)
    city = Column(String(20), nullable=False)
    postCode = Column(String(10), nullable=True)
    phone = Column(String(20), nullable=False)

    # Foreign Keys
    user_id = Column(UUID(as_uuid=True), ForeignKey("user.id"), nullable=False)
    country_id = Column(Integer, ForeignKey("country.id"), nullable=False)

    # Relationships
    user = relationship("User", back_populates="restaurant")
    country = relationship("Country", back_populates="restaurant")

    def __repr__(self) -> str:
        return f"<Restaurant(id={self.id}, name={self.name})>"

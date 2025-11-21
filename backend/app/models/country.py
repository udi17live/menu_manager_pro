from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.models.base import Base


class Country(Base):
    __tablename__ = "country"

    # Columns
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    name = Column(String(255), nullable=False)
    code = Column(String(11), nullable=False, unique=True)
    currency_code = Column(String(11), nullable=False)
    currency_symbol = Column(String(20), nullable=False)
    currency_name = Column(String(255), nullable=False)
    phone_code = Column(String(20), nullable=False)

    # Relationships
    setting = relationship("Setting", back_populates="country")
    restaurant = relationship("Restaurant", back_populates="country")

    def __repr__(self) -> str:
        return f"<Country(id={self.id}, email={self.name})>"

from sqlalchemy import UUID, Column, Enum, ForeignKey, Integer
from sqlalchemy.orm import relationship

from app.classes.enums.theme_mode import ThemeMode
from app.models.base import Base


class Setting(Base):
    __tablename__ = "setting"

    # Columns
    id = Column(Integer, primary_key=True, autoincrement=True, index=True)
    theme_mode = Column(Enum(ThemeMode), nullable=False, default=ThemeMode.LIGHT)

    # Foreign Keys
    user_id = Column(
        UUID(as_uuid=True), ForeignKey("user.id"), nullable=False, unique=True
    )
    country_id = Column(Integer, ForeignKey("country.id"), nullable=False)

    # Relationships
    user = relationship("User", back_populates="setting")
    country = relationship("Country", back_populates="setting")

    def __repr__(self) -> str:
        return f"<Setting(id={self.id}, email={self.user_id})>"

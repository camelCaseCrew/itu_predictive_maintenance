from sqlmodel import Field, SQLModel, MetaData

class Logs(SQLModel, table=True):
    metadata = MetaData(schema="public")
    id: int = Field(default=None, primary_key=True)
    log_time: str = Field(default=None)
    log_message: str = Field(default=None)
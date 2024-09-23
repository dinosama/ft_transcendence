from enum import Enum
import logging

class LogLevel(Enum):
    INFO = "info"
    DEBUG = "debug"
    WARNING = "warning"
    ERROR = "error"
    FATAL = "fatal"

class Logger:
    LOG_LEVEL_MAP = {
        LogLevel.INFO: logging.INFO,
        LogLevel.DEBUG: logging.DEBUG,
        LogLevel.WARNING: logging.WARNING,
        LogLevel.ERROR: logging.ERROR,
        LogLevel.FATAL: logging.CRITICAL,
    }

    def __init__(self, name: str, level: LogLevel = LogLevel.INFO):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(self._map_log_level(level))

        formatter = logging.Formatter(
            fmt="{levelname}: {name}: {message}",
            style="{"
        )

        console_handler = logging.StreamHandler()
        console_handler.setFormatter(formatter)
        self.logger.addHandler(console_handler)

    @staticmethod
    def _map_log_level(level: LogLevel) -> int:
        return Logger.LOG_LEVEL_MAP.get(level, logging.INFO)

    def log(self, level: LogLevel, message: str) -> None:
        self.logger.log(Logger.LOG_LEVEL_MAP.get(level, logging.INFO), message)
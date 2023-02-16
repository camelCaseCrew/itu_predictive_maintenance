import sys
import loguru
from distutils.util import strtobool

class Logger():
    def __init__(self, save_log: bool = False):
        self._logger = loguru.logger
        log_location = './logs'
        log_name = "data_generator"
        try:
            if save_log:
                sink = f'{log_location}/{log_name}.log'
            elif not save_log:
                sink = sys.stdout
        except ValueError:
            raise ValueError(f'Invalid value for save_log_to_file "{save_log}", please provide a Boolean value')
        self._set_logger(sink)
        
    def get_logger(self):
        return self._logger
    
    def _set_logger(self, sink):
        self._logger.remove()
        if sink == sys.stdout:
            self._logger.add(sink,
                            enqueue=True,
                            colorize=None,
                            backtrace=True,
                            diagnose=False,
                            catch=True,
                            level='DEBUG')
        elif isinstance(sink, str):
            self._logger.add(sink,
                            rotation='500 MB',
                            retention="30 days",
                            compression="zip",
                            enqueue=True,
                            colorize=None,
                            backtrace=True,
                            diagnose=False,
                            catch=True,
                            level='DEBUG')
   
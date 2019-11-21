import configparser
import io


def get_global_config():
    config = configparser.ConfigParser()
    config.read('config.ini')
    return config
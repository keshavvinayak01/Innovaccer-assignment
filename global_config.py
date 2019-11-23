import configparser
import io


def get_global_config():
    config = configparser.ConfigParser()
    config.read('config_prod.ini')
    return config
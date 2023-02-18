import os
import sys
import shutil
import platform

from setuptools import find_packages, setup

VERSION = '0.1.0'
NAME = 'anomaly_detector'
DESCRIPTION = ''
AUTHORS = "Mico Bøje"

python_min_version = (3, 9, 0)

python_min_version_str = '.'.join(map(str, python_min_version))
if sys.version_info < python_min_version:
    print(f"Python {platform.python_version()} detected. Python {python_min_version_str} or newer required.")
    sys.exit(-1)

# requirements groups - you can install these using pip install -e .[<requirements_group>]
REQUIREMENTS_GROUPS = ['full', 'install', 'inference', 'test']  # you can add more here

# this is a mapping just to make it easier for you to define which requirements groups a package should belong to
CORE = "full, install"
TEST = "test, full"
INFERENCE = "inference, full"

dependent_packages = {
    #For shared libraries
    "loguru": ("0.6.0", CORE),
    "python-dotenv": ("0.21.0", CORE),
    "sqlmodel": ("0.0.8", CORE),
    #"psycopg2": ("2.9.5", CORE),
    "psycopg2-binary": ("2.9.5", CORE),
    "fastapi": ("0.92.0", CORE),
    "uvicorn": ("0.20.0", CORE),
    "torch": ("1.13.0", CORE),
    "sentence-transformers": ("2.2.2", CORE),
    
    # For tests
    "pytest": ("7.1.3", TEST),

    # For inference
    "onnx": ("1.11.0", INFERENCE),
}

tag_to_packages: dict = {
    extra: []
    for extra in REQUIREMENTS_GROUPS
}
for package, (min_version, extras) in dependent_packages.items():
    for extra in REQUIREMENTS_GROUPS:
        if extra in extras:
            tag_to_packages[extra].append("{}>={}".format(package, min_version))

SETUPTOOLS_COMMANDS = {
    "develop",
    "release",
    "bdist_egg",
    "bdist_rpm",
    "bdist_wininst",
    "install_egg_info",
    "build_sphinx",
    "egg_info",
    "easy_install",
    "upload",
    "bdist_wheel",
    "--single-version-externally-managed",
}

if SETUPTOOLS_COMMANDS.intersection(sys.argv):
    extra_setuptools_args = dict(
        extras_require={
            key: tag_to_packages[key]
            for key in REQUIREMENTS_GROUPS
        },
    )
else:
    extra_setuptools_args = dict()

setup(
    name=NAME,
    packages=find_packages(),
    version=VERSION,
    description=DESCRIPTION,
    author=AUTHORS,
    python_requires=f">={python_min_version_str}",
    install_requires=tag_to_packages["install"],
    **extra_setuptools_args
)

# post install script

# Create the .env file
if os.path.exists('templates/.env.template') and not os.path.exists('.env'):
    shutil.copyfile('templates/.env.template', '.env')

# Create the config.ini file
if os.path.exists('templates/config.ini.template') and not os.path.exists('config.ini'):
    shutil.copyfile('templates/config.ini.template', 'config.ini')
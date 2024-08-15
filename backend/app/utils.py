from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt_identity
from flask import jsonify
from . import bcrypt, db
from .models import User

def generate_tokens(identity):
    access_token = create_access_token(identity=identity)
    refresh_token = create_refresh_token(identity=identity)
    return access_token, refresh_token

def hash_password(password):
    return bcrypt.generate_password_hash(password).decode('utf-8')

def check_password(hashed_password, plain_password):
    return bcrypt.check_password_hash(hashed_password, plain_password)

def error_response(message, status_code=400):
    return jsonify({'error': message}), status_code

def is_admin():
    current_user = get_jwt_identity()
    user = User.query.get(current_user['id'])
    return user.is_admin

def commit_changes():
    try:
        db.session.commit()
        return True
    except Exception as e:
        db.session.rollback()
        return False, str(e)

from flask import Blueprint, request, jsonify,make_response
from . import db, bcrypt
from .models import User
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity
from .utils import hash_password, error_response


main = Blueprint('main', __name__)

@main.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    # Validate the input data
    if not data or not data.get('email') or not data.get('password'):
        return error_response('Missing email or password.', 400)
    
    # Check if email already exists
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return error_response('User with this email already exists.', 400)

    # Set the user role, default to 'user' if not provided
    role = data.get('role', 'user')
    if role not in ['user', 'admin']:
        return error_response('Invalid role specified.', 400)

    # Create a new user
    hashed_password = hash_password(data['password'])
    new_user = User(email=data['email'], password=hashed_password, role=role)

    # Add the user to the database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": f"User {new_user.email} registered successfully as {new_user.role}!"}), 201


@main.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or 'email' not in data or 'password' not in data:
        return make_response(jsonify({'message': 'Email and password are required'}))

    user = User.query.filter_by(email=data['email']).first()
    if not user or not bcrypt.check_password_hash(user.password, data['password']):
        return make_response(jsonify({'message': 'Invalid email or password'}), 401)

    access_token = create_access_token(identity={'id': user.id, 'role': user.role}) 
    return make_response(jsonify(access_token=access_token, user=user.to_dict()), 200)



@main.route('/admin/product', methods=['POST'])
#@jwt_required()
def add_product():
    # current_user = get_jwt_identity()
    # if current_user['role'] != 'user':
    #     return error_response('Admin access required.', 403)

    data = request.get_json()
    # Assume Product is a model you've defined
    new_product = Product(name=data['name'], price=data['price'], description=data['description'])

    db.session.add(new_product)
    db.session.commit()

    return jsonify({"message": "Product added successfully!"}), 201


@main.route('/cart', methods=['POST'])
@jwt_required()
def add_to_cart():
    current_user = get_jwt_identity()
    data = request.get_json()
    product = Product.query.get(data['product_id'])
    if product:
        cart = Cart.query.filter_by(user_id=current_user['id']).first()
        if not cart:
            cart = Cart(user_id=current_user['id'])
            db.session.add(cart)
            db.session.commit()
        cart_item = CartItem(cart_id=cart.id, product_id=product.id, quantity=data.get('quantity', 1))
        db.session.add(cart_item)
        db.session.commit()
        return jsonify(message="Product added to cart"), 201
    return jsonify(message="Product not found"), 404

@main.route('/cart/<int:item_id>', methods=['DELETE'])
@jwt_required()
def delete_from_cart(item_id):
    current_user = get_jwt_identity()
    cart_item = CartItem.query.join(Cart).filter(Cart.user_id == current_user['id'], CartItem.id == item_id).first()
    if cart_item:
        db.session.delete(cart_item)
        db.session.commit()
        return jsonify(message="Item removed from cart"), 200
    return jsonify(message="Item not found in cart"), 404


@main.route('/checkout', methods=['POST'])
@jwt_required()
def checkout():
    current_user = get_jwt_identity()
    cart = Cart.query.filter_by(user_id=current_user['id']).first()
    if cart and cart.items:
        db.session.delete(cart)
        db.session.commit()
        return jsonify(message="Payment successful, order completed"), 200
    return jsonify(message="Cart is empty"), 400

@main.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    current_user = get_jwt_identity()
    # if not User.query.get(current_user['id']).is_admin:
    #     return jsonify(message="Admin access required"), 403

    users = User.query.all()
    return jsonify([{'id': user.id, 'email': user.email} for user in users])

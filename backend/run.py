from app import create_app
from flask_cors import CORS

app = create_app()
CORS(app, resources={r"/*": {
    "origins": "*",
    "methods": ["GET", "POST", "PUT", "DELETE"],
    "allow_headers": ["Content-Type", "Authorization"]
}})
if __name__ == '__main__':
    app.run(debug=True)

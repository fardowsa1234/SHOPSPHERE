# from faker import Faker
# from config import app, db, bcrypt
# from models import User

# fake = Faker()

# def seed_data():
#     with app.app_context():
#         print("Deleting all records...")
#         db.session.query(User).delete()

#         print("Creating users...")
#         users = []
#         names = []

        
#         email = fake.email()

#         user = User(
                
#                 email=email,
               
#             )

#         password = "newpass"
#         user.password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

#         db.session.add(user)
#         db.session.commit()

#         users.append(user)

#         print("Complete.")

# if __name__ == "__main__":
#     seed_data()

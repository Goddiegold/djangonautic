from api.models import CustomUser

def seed_data():
        print('started admin user')
        user = CustomUser(username="Godwin",
        email="admin@gmail.com",
        is_staff=True,
        is_superuser=True)

        user.set_password("12345")
        user.save()
        print('stopped admin user')


#seed_data()
import requests
import uuid

API_URL = "http://localhost:8000/api/auth"

def test_auth_flow():
    # 1. Signup
    print("Testing Signup...")
    test_email = f"test_{uuid.uuid4()}@example.com"
    signup_data = {
        "email": test_email,
        "password": "strongpassword123",
        "fullName": "API Test User",
        "companyName": "API Test Corp"
    }
    
    res = requests.post(f"{API_URL}/signup", json=signup_data)
    if res.status_code == 201:
        print("Signup successful")
    else:
        print(f"Signup failed: {res.status_code} - {res.text}")
        return False
        
    # 2. Login
    print("Testing Login...")
    login_data = {
        "email": test_email,
        "password": "strongpassword123"
    }
    
    session = requests.Session()
    res = session.post(f"{API_URL}/login", json=login_data)
    if res.status_code == 200:
        print("Login successful")
        print(f"Response: {res.json()}")
        # Check cookies
        cookies = session.cookies.get_dict()
        if "access_token" in cookies:
            print("access_token cookie is present")
        else:
            print("access_token cookie missing")
    else:
        print(f"Login failed: {res.status_code} - {res.text}")
        return False
        
    # 3. Logout
    print("Testing Logout...")
    res = session.post(f"{API_URL}/logout")
    if res.status_code == 200:
        print("Logout successful")
    else:
        print(f"Logout failed: {res.status_code} - {res.text}")
        
if __name__ == "__main__":
    test_auth_flow()

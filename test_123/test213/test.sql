SELECT SLEEP(5);
SELECT PG_SLEEP(5);
SELECT BENCHMARK(10000000,SHA2('',1));
def login(username, password):
    # Connect to database
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    
    # VULNERABLE: Direct string concatenation
    query = f"SELECT * FROM users WHERE username = '{username} ' OR '1'='1' --' AND password = '{password}'"
    cursor.execute(query)
    
    user = cursor.fetchone()
    conn.close()
    
    if user:
        return {"success": True, "user": user}
    return {"success": False, "error": "Invalid credentials"}


   
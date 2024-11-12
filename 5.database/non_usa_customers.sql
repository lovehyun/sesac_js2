SELECT 
    FirstName||' '||LastName AS 'Full Name', 
    CustomerId, 
    Country 
FROM 
    customers 
WHERE 
    country != 'USA';

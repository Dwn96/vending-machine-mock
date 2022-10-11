# Vending Machine Mock

# Getting started

1. Install node modules:

        npm install  

2. Configure the following variables in .env to match the following sample config

        APP_PORT = 3000
        MAX_SLOTS = 30
        MAX_ITEMS_PER_SLOT = 15
        ALLOWED_DENOMS = PENNY,NICKEL,DIME,QUARTER,HALFDOLLAR,DOLLAR

3. Run the application in development mode via:

        npm run start:dev


# Using the application

1. Add items to a slot via POST /items with the following payload

        {
            "name": "Vegemite",
            "unitPrice": 12,
            "quantity": 100
        }

2. Fetch the list of slots and the items located therein via GET /slots

3. Update the items within a slot via PATCH /slots with the following optional body params

        {
            "quantity": 39,
            "unitPrice": 3
        }
        
4. Fetch the various denominations available in the vending machine coffer via GET /coins
5. Update the denominations available in the coffer via PATCH /coins and the following optional body params:

        {
            "dollarCount": 3,
            "halfDollarCount": 320,
            "quarterCount": 5,
            "dimeCount": 34,
            "nickelCount": 4,
            "pennyCount": 2
            
        }

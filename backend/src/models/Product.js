const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createProductTable = async () => {
    try {
        // Create showrooms table
        await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS showrooms (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            location TEXT NOT NULL,
            contact_number VARCHAR(15) NOT NULL,
            car_price NUMERIC(10,2) NOT NULL
        );`;
        console.log("✅ Table showrooms has been created successfully!");

        // Create main car catalog table
        await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS car_catalog (
            id SERIAL PRIMARY KEY,
            vin VARCHAR(17) UNIQUE NOT NULL,  
            name VARCHAR(100) NOT NULL,
            brand VARCHAR(100) NOT NULL,
            model_year INT CHECK (model_year BETWEEN 1900 AND EXTRACT(YEAR FROM CURRENT_DATE)),
            category VARCHAR(50) NOT NULL CHECK (category IN ('hatchback', 'SUV', 'sedan', 'coupe', 'convertible', 'pickup', 'van', 'wagon')),
            fuel_type VARCHAR(20) NOT NULL CHECK (fuel_type IN ('petrol', 'diesel', 'electric', 'hybrid', 'CNG', 'LPG')),
            transmission VARCHAR(20) NOT NULL CHECK (transmission IN ('manual', 'automatic', 'CVT', 'semi-automatic')),
            engine_capacity INT NOT NULL,  
            horsepower INT NOT NULL,
            torque VARCHAR(50),
            mileage NUMERIC(5,2) NOT NULL,
            seating_capacity INT NOT NULL CHECK (seating_capacity BETWEEN 1 AND 9),
            color VARCHAR(20) NOT NULL,
            showroom_price NUMERIC(10,2) NOT NULL,
            car_price NUMERIC(10,2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`;
        console.log("✅ Shared Table of cars has been created successfully!");

        // Create update timestamp trigger function
        await prisma.$executeRaw`CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;`;

        // Create trigger for car_catalog
        await prisma.$executeRaw`CREATE TRIGGER set_timestamp
        BEFORE UPDATE ON car_catalog
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();`;

        // Create new_cars table
        await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS new_cars (
            id SERIAL PRIMARY KEY,
            car_id INT UNIQUE REFERENCES car_catalog(id) ON DELETE CASCADE,
            showroom_id INT REFERENCES showrooms(id) ON DELETE SET NULL,
            on_road_price NUMERIC(10,2) NOT NULL,
            insurance_price NUMERIC(10,2) NOT NULL,
            discount NUMERIC(10,2) DEFAULT 0,
            warranty_period VARCHAR(20),
            is_available BOOLEAN DEFAULT TRUE,
            car_price NUMERIC(10,2) NOT NULL
        );`;
        console.log("✅ Table new_cars has been created successfully!");

        // Create used_cars table
        await prisma.$executeRaw`CREATE TABLE IF NOT EXISTS used_cars (
            id SERIAL PRIMARY KEY,
            car_id INT UNIQUE REFERENCES car_catalog(id) ON DELETE CASCADE,
            previous_owners INT CHECK (previous_owners >= 0) DEFAULT 1,
            km_driven INT NOT NULL CHECK (km_driven >= 0),
            service_history TEXT,  
            accident_history BOOLEAN DEFAULT FALSE,
            resale_price NUMERIC(10,2) NOT NULL,
            last_service_date DATE,
            is_certified BOOLEAN DEFAULT FALSE,
            car_price NUMERIC(10,2) NOT NULL
        );`;
        console.log("✅ Table used_cars has been created successfully!");

    } catch (error) {
        console.error("❌ Error creating Cars table:", error);
    } finally {
        await prisma.$disconnect();
    }
};

createProductTable();

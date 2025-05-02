const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


//For Adding Car Data To Database
const addUsedCarDetails = async (req, res) => {
    const [formData, type] = req.body
    if (type === 'ownerData') {
        const { firstName, middleName, lastName, mobileNumber, altMobileNumber, dateOfBirth, address } = formData;
        const fullName = [firstName, middleName, lastName]
            .filter(name => name && name.trim())
            .map(name => name.trim())
            .join(' ');
        const dob = new Date(dateOfBirth)
        if (isNaN(dob.getTime())) {
            return res.status(400).json({ error: 'Invalid date of birth format' });
        }
        try {
            const ownerData = await prisma.seller_Profile.create({
                data: {
                    Full_Name: fullName,
                    Primary_Mobile_Number: mobileNumber,
                    Alternative_Mobile_Number: altMobileNumber,
                    DOB: dob,
                    Permanent_Address: address
                }
            });
            res.status(200).json({ message: 'Owner data added successfully' });
        } catch (error) {
            console.error("❌ Error adding owner data:", error);
            res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }

    } else if (type === 'vehicleHistory') {
        const {
            previousOwners,
            distanceDriven,
            serviceHistory,
            lastServiceDate,
            accidentHistory
        } = formData;

        try {
            const serviceDate = new Date(lastServiceDate);
            if (isNaN(serviceDate.getTime())) {
                return res.status(400).json({ error: 'Invalid last service date format' });
            }

            const vehicleHistory = await prisma.used_cars.create({
                data: {
                    previous_owners: Number(previousOwners),
                    km_driven: parseInt(distanceDriven.replace(/\D/g, '')),
                    service_history: serviceHistory.trim(),
                    last_service_date: serviceDate,
                    accident_history: accidentHistory.trim(),
                    resale_price: 0
                }
            });

            res.status(200).json({
                message: 'Vehicle history added successfully',
                data: vehicleHistory
            });

        } catch (error) {
            console.error("❌ Error adding vehicle history:", error);
            res.status(500).json({
                error: 'Internal Server Error',
                details: error.message
            });
        }
    } else if (type === 'vehicleDetails') {
        const {
            vin,
            producer,
            modelName,
            makeYear,
            category,
            fuelType,
            transmission,
            engineDisplacement,
            torque,
            horsepower,
            mileage,
            color,
            seatingCapacity,
            noOfCylinders,
            rtoLocation,
            topSpeed,
            driveType,
            maxPower,
            maxTorque,
            valvesPerCylinder,
            valveConfiguration,
            fuelSupplySystem,
            turboCharger,
            gearbox,
            fuelTankCapacity,
            emissionNormCompliance,
        } = req.body;
        try {
            const vehicleDetailsInsertQuery = await prisma.car_catalog.create({
                data: {
                    vin: vin,
                    name: modelName,
                    brand: producer,
                    model_year: makeYear,
                    category: category,
                    fuel_type: fuelType,
                    transmission: transmission,
                    engine_capacity: engineDisplacement,
                    horsepower: horsepower,
                    torque: torque,
                    mileage: mileage,
                    seating_capacity: seatingCapacity,
                    color: color,

                }

            })
            res.status(200).json({
                message: 'Vehicle details added successfully',
                data: vehicleDetailsInsertQuery
            });

        } catch (error) {
            console.error("❌ Error adding vehicle details:", error);
            res.status(500).json({
                error: 'Internal Server Error',
                details: error.message
            });
        }
    }
}



//For posting data from database to frontend
const handleSearchQuery = async (req, res) => {
    const { producer, category, car_type, budgetRange } = req.body;

    if (!producer || !category) {
        return res.status(400).json({ error: 'Empty Fields Received From Frontend!' });
    }

    if (car_type === undefined || car_type === null) {
        return res.status(400).json({ error: 'car_type field is required.' });
    }

    try {
        let cars;

        if (car_type === 'first') {
            cars = await prisma.new_cars.findMany({
                where: {
                    car_catalog: {
                        brand: producer,
                        category: category,
                    },
                    on_road_price: {
                        lte: budgetRange
                    },
                },
                include: {
                    car_catalog: true,
                    showrooms: true,
                },
            });
        } else {
            cars = await prisma.used_cars.findMany({
                where: {
                    car_catalog: {
                        brand: producer,
                        category: category,
                    },
                    resale_price: {
                        lte: budgetRange
                    },
                },
                include: {
                    car_catalog: true,
                },
            });
        }

        res.status(200).json({ message: 'Query handled successfully', data: cars });
    } catch (error) {
        console.error("❌ Prisma query error:", error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};
const handleCarQuery = async (_, res) => {
    try {
        const brands = await prisma.car_catalog.findMany({
            select: { brand: true },
            distinct: ['brand'],
        });

        const categories = await prisma.car_catalog.findMany({
            select: { category: true },
            distinct: ['category'],
        });

        const brandList = brands.map(item => item.brand);
        const categoryList = categories.map(item => item.category);

        res.status(200).json({
            message: 'Fetched all brands and categories',
            brands: brandList,
            categories: categoryList
        });
    } catch (error) {
        console.error("❌ Error fetching brands and categories:", error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
module.exports = {
    handleSearchQuery, handleCarQuery, addUsedCarDetails
};

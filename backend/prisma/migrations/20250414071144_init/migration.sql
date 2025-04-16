-- CreateTable
CREATE TABLE "car_catalog" (
    "id" SERIAL NOT NULL,
    "vin" VARCHAR(17) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "brand" VARCHAR(100) NOT NULL,
    "model_year" INTEGER,
    "category" VARCHAR(50) NOT NULL,
    "fuel_type" VARCHAR(20) NOT NULL,
    "transmission" VARCHAR(20) NOT NULL,
    "engine_capacity" INTEGER NOT NULL,
    "horsepower" INTEGER NOT NULL,
    "torque" VARCHAR(50),
    "mileage" DECIMAL(5,2) NOT NULL,
    "seating_capacity" INTEGER NOT NULL,
    "color" VARCHAR(20) NOT NULL,
    "showroom_price" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "car_catalog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "new_cars" (
    "id" SERIAL NOT NULL,
    "car_id" INTEGER,
    "showroom_id" INTEGER,
    "on_road_price" DECIMAL(10,2) NOT NULL,
    "insurance_price" DECIMAL(10,2) NOT NULL,
    "discount" DECIMAL(10,2) DEFAULT 0,
    "warranty_period" VARCHAR(20),
    "is_available" BOOLEAN DEFAULT true,

    CONSTRAINT "new_cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "showrooms" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "location" TEXT NOT NULL,
    "contact_number" VARCHAR(15) NOT NULL,

    CONSTRAINT "showrooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "used_cars" (
    "id" SERIAL NOT NULL,
    "car_id" INTEGER,
    "previous_owners" INTEGER DEFAULT 1,
    "km_driven" INTEGER NOT NULL,
    "service_history" TEXT,
    "accident_history" BOOLEAN DEFAULT false,
    "resale_price" DECIMAL(10,2) NOT NULL,
    "last_service_date" DATE,
    "is_certified" BOOLEAN DEFAULT false,

    CONSTRAINT "used_cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "role" VARCHAR(50) NOT NULL DEFAULT 'customer',
    "mobile" VARCHAR(15) DEFAULT 'Not Provided',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "car_catalog_vin_key" ON "car_catalog"("vin");

-- CreateIndex
CREATE UNIQUE INDEX "new_cars_car_id_key" ON "new_cars"("car_id");

-- CreateIndex
CREATE UNIQUE INDEX "used_cars_car_id_key" ON "used_cars"("car_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "new_cars" ADD CONSTRAINT "new_cars_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car_catalog"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "new_cars" ADD CONSTRAINT "new_cars_showroom_id_fkey" FOREIGN KEY ("showroom_id") REFERENCES "showrooms"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "used_cars" ADD CONSTRAINT "used_cars_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "car_catalog"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

import React from 'react';
import Button from '../../components/UI/atoms/Button';
import styles from '../../assets/styles/Components/ProductPage.module.scss'
import { useColorContext } from '../../context/ColorContext';
import CancelIcon from '@mui/icons-material/Cancel';
interface ProductPageProps {
  cars: any[];
  onClose: () => void;
}
const Product: React.FC<ProductPageProps> = ({ cars, onClose }) => {
  const { colors } = useColorContext();
  const { warningRed } = colors.variants;
  return (
    <div className={`rounded-lg absolute w-[98%] h-[95%] bg-gray-300 grid ${styles.PRODUCT_CONTAINER}`}>
      <div className='grid grid-cols-[5fr,1fr]'>
        <header className='text-2xl font-bold'>Your Search Results...</header>
        <Button onClick={(e) => onClose()} colors={warningRed}>{<CancelIcon />}</Button>
      </div>
      <div className="grid grid-rows-[auto_auto_1fr] gap-2 space-y-[6rem] max-h-[calc(100vh-100px)] overflow-y-auto p-2">
        {cars.map((car) => {
          const isSecondHand = !!car.previous_owners;
          const catalog = car.car_catalog;
          const showroom = car.showrooms;

          return (
            <div key={car.id} className="m shadow-md rounded-lg p-4 bg-white">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">
                  {catalog.brand} {catalog.name} ({catalog.model_year})
                </h2>
                <span className="text-sm text-green-600 font-medium">
                  {isSecondHand ? (car.is_certified ? "Certified Used" : "Used") : (car.is_available ? "Available" : "Not Available")}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                <p><strong>Fuel:</strong> {catalog.fuel_type}</p>
                <p><strong>Transmission:</strong> {catalog.transmission}</p>
                <p><strong>Mileage:</strong> {catalog.mileage} km/l</p>
                <p><strong>Seating:</strong> {catalog.seating_capacity}</p>
                <p><strong>Engine:</strong> {catalog.engine_capacity} cc</p>
                <p><strong>Torque:</strong> {catalog.torque}</p>
                <p><strong>Horsepower:</strong> {catalog.horsepower} HP</p>
                <p><strong>Color:</strong> {catalog.color}</p>
              </div>

              <hr className="my-2" />

              {isSecondHand ? (
                <>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p><strong>KM Driven:</strong> {car.km_driven.toLocaleString()} km</p>
                    <p><strong>Resale Price:</strong> ₹{Number(car.resale_price).toLocaleString()}</p>
                    <p><strong>Owners:</strong> {car.previous_owners}</p>
                    <p><strong>Service History:</strong> {car.service_history}</p>
                    <p><strong>Last Serviced:</strong> {new Date(car.last_service_date).toLocaleDateString()}</p>
                    <p><strong>Accidents:</strong> {car.accident_history ? "Yes" : "No"}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <p><strong>Showroom Price:</strong> ₹{Number(catalog.showroom_price).toLocaleString()}</p>
                    <p><strong>On-Road Price:</strong> ₹{Number(car.on_road_price).toLocaleString()}</p>
                    <p><strong>Discount:</strong> ₹{Number(car.discount).toLocaleString()}</p>
                    <p><strong>Insurance:</strong> ₹{Number(car.insurance_price).toLocaleString()}</p>
                    <p><strong>Warranty:</strong> {car.warranty_period}</p>
                  </div>

                  <hr className="my-2" />

                  <div className="text-sm text-gray-600">
                    <p><strong>Showroom:</strong> {showroom.name}</p>
                    <p><strong>Location:</strong> {showroom.location}</p>
                    <p><strong>Contact:</strong> {showroom.contact_number}</p>
                  </div>
                </>
              )}
            </div>
          );
        })}



      </div>
      {/* <div className='m'></div> */}
    </div>
  );
};

export default Product; 

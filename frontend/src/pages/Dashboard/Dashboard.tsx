import React from "react";
import styles from '../../assets/styles/Components/Dashboard.module.scss';
import { useAuth } from "../../context/AuthContext";
import { useColorContext } from "../../context/ColorContext";
import Button from "../../components/UI/atoms/Button";
import SettingsIcon from '@mui/icons-material/Settings';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import LogoutIcon from '@mui/icons-material/Logout';
const Dashboard: React.FC = () => {
  const { user } = useAuth()
  const { colors } = useColorContext()
  const { warningRed, secondary, darkSecondary } = colors.variants
  const { logout } = useAuth()
  return (
    <div className={`${styles.DASHBOARD_CONTAINER}`}>
      <section className="p-10">
        <div className="h-full">
          <section className="montserrat-ff">
            <div>
              <header className="font-bold text-2xl">Hey {user?.name} ,</header>
              <header className="text-base space-x-2">
                <span className="uppercase">{user?.role}</span>
                <span>|</span>
                <span className="">{user?.email}</span>
                <span>|</span>
                <span className="">{user?.mobile}</span>
              </header>
            </div>
            <div className="flex items-center justify-evenly">
              <Button colors={darkSecondary} text="Edit Profile">{<ModeEditIcon />}</Button>

              <Button
                onClick={logout}
                title="Logout"
                colors={warningRed}
                text="Logout"
              >
                <LogoutIcon />
              </Button>
              <Button colors={secondary}>{<SettingsIcon />}</Button>
            </div>
          </section>
          <section>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </section>
        </div>
      </section>
    </div>

  );
};

export default Dashboard;

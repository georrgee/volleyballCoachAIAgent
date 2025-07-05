import { Drawer } from 'expo-router/drawer';
import { SideMenu } from '@/components/SideMenu';

export default function DrawerLayout() {
  return <Drawer drawerContent={(props) => <SideMenu {...props} />} />;
}

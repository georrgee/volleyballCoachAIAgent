
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export function SideMenu(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
